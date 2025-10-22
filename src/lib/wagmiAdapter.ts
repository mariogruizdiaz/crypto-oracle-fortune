import { Address } from 'viem'
import { TokenBalance } from './portfolio'
import { getTokenList } from './tokens'
import { getTokenPrices } from './prices'
import { formatTokenBalance } from './portfolio'

export interface IBlockchainProvider {
  connectWallet(): Promise<Address | null>
  getBalances(address: Address, chainId: number): Promise<TokenBalance[]>
  switchNetwork(chainId: number): Promise<boolean>
}

export class WagmiAdapter implements IBlockchainProvider {
  private wagmiClient: WagmiClientLike
  private publicClient: PublicClientLike

  constructor(wagmiClient: WagmiClientLike, publicClient: PublicClientLike) {
    this.wagmiClient = wagmiClient
    this.publicClient = publicClient
  }

  async connectWallet(): Promise<Address | null> {
    try {
      const account = await this.wagmiClient.getAccount()
      return (account.address as Address | null) || null
    } catch (error) {
      console.error('Error connecting wallet:', error)
      return null
    }
  }

  async getBalances(address: Address, chainId: number): Promise<TokenBalance[]> {
    try {
      // Get token list for the chain
      const tokens = await getTokenList(chainId)
      
      // Get token balances using multicall
      const tokenAddresses = tokens.map(token => token.address)
      const balanceCalls: ReadonlyArray<{
        address: Address
        abi: ReadonlyArray<{
          name: 'balanceOf'
          type: 'function'
          stateMutability: 'view'
          inputs: ReadonlyArray<{ name: string; type: 'address' }>
          outputs: ReadonlyArray<{ name: string; type: 'uint256' }>
        }>
        functionName: 'balanceOf'
        args: ReadonlyArray<Address>
      }> = tokenAddresses.map(tokenAddress => ({
        address: tokenAddress as Address,
        abi: [
          {
            name: 'balanceOf',
            type: 'function',
            stateMutability: 'view',
            inputs: [{ name: 'account', type: 'address' }],
            outputs: [{ name: '', type: 'uint256' }],
          },
        ] as const,
        functionName: 'balanceOf',
        args: [address] as const,
      }))

      const balances = await this.publicClient.multicall({
        contracts: balanceCalls,
      })

      // Get token prices
      const symbols = tokens.map(token => token.symbol)
      const prices = await getTokenPrices(symbols)

      // Format balances
      const tokenBalances: TokenBalance[] = []
      
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        const balance = (balances[i]?.result ?? BigInt(0)) as bigint
        
        if (balance > BigInt(0)) {
          const balanceFormatted = formatTokenBalance(balance.toString(), token.decimals)
          const usdValue = parseFloat(balanceFormatted) * (prices[token.symbol] || 0)
          
          tokenBalances.push({
            token,
            balance: balance.toString(),
            balanceFormatted,
            usdValue,
            percentage: 0 // Will be calculated later
          })
        }
      }

      return tokenBalances
    } catch (error) {
      console.error('Error fetching balances:', error)
      return []
    }
  }

  async switchNetwork(chainId: number): Promise<boolean> {
    try {
      await this.wagmiClient.switchChain({ chainId })
      return true
    } catch (error) {
      console.error('Error switching network:', error)
      return false
    }
  }
}

// Minimal client types to avoid using any
type WagmiClientLike = {
  getAccount: () => Promise<{ address?: Address | null }>
  switchChain: (args: { chainId: number }) => Promise<void>
}

type PublicClientLike = {
  getBalance: (args: { address: Address }) => Promise<bigint>
  multicall: (args: {
    contracts: ReadonlyArray<{
      address: Address
      abi: ReadonlyArray<{
        name: 'balanceOf'
        type: 'function'
        stateMutability: 'view'
        inputs: ReadonlyArray<{ name: string; type: 'address' }>
        outputs: ReadonlyArray<{ name: string; type: 'uint256' }>
      }>
      functionName: 'balanceOf'
      args: ReadonlyArray<Address>
    }>
  }) => Promise<Array<{ result?: bigint }>>
}
