import { Address } from 'viem'
import { Token } from './tokens'
import { TokenBalance } from './portfolio'
import { getTokenList, getTokenByAddress } from './tokens'
import { getTokenPrices } from './prices'
import { formatTokenBalance } from './portfolio'

export interface IBlockchainProvider {
  connectWallet(): Promise<Address | null>
  getBalances(address: Address, chainId: number): Promise<TokenBalance[]>
  switchNetwork(chainId: number): Promise<boolean>
}

export class WagmiAdapter implements IBlockchainProvider {
  private wagmiClient: unknown
  private publicClient: unknown

  constructor(wagmiClient: unknown, publicClient: unknown) {
    this.wagmiClient = wagmiClient
    this.publicClient = publicClient
  }

  async connectWallet(): Promise<Address | null> {
    try {
      const accounts = await (this.wagmiClient as any).getAccount()
      return accounts.address || null
    } catch (error) {
      console.error('Error connecting wallet:', error)
      return null
    }
  }

  async getBalances(address: Address, chainId: number): Promise<TokenBalance[]> {
    try {
      // Get token list for the chain
      const tokens = await getTokenList(chainId)
      
      // Get native balance
      const nativeBalance = await (this.publicClient as any).getBalance({ address })
      
      // Get token balances using multicall
      const tokenAddresses = tokens.map(token => token.address)
      const balanceCalls = tokenAddresses.map(address => ({
        address: address as Address,
        abi: [
          {
            name: 'balanceOf',
            type: 'function',
            stateMutability: 'view',
            inputs: [{ name: 'account', type: 'address' }],
            outputs: [{ name: '', type: 'uint256' }],
          },
        ],
        functionName: 'balanceOf',
        args: [address],
      }))

      const balances = await (this.publicClient as any).multicall({
        contracts: balanceCalls,
      })

      // Get token prices
      const symbols = tokens.map(token => token.symbol)
      const prices = await getTokenPrices(symbols)

      // Format balances
      const tokenBalances: TokenBalance[] = []
      
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        const balance = balances[i].result as bigint
        
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
      await (this.wagmiClient as any).switchChain({ chainId })
      return true
    } catch (error) {
      console.error('Error switching network:', error)
      return false
    }
  }
}
