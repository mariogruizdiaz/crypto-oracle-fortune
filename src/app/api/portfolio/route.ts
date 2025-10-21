import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, Address } from 'viem'
import { zetaTestnet, sepolia } from '@/lib/chains'
import { getTokenList } from '@/lib/tokens'
import { getTokenPrices } from '@/lib/prices'
import { formatTokenBalance, calculatePortfolioMetrics } from '@/lib/portfolio'

const clients = {
  7001: createPublicClient({
    chain: zetaTestnet,
    transport: http(),
  }),
  11155111: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
}

export async function GET(request: NextRequest) {
  // Set a global timeout for the entire operation
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), 15000) // 15 seconds
  })

  try {
    const operationPromise = (async () => {
      const { searchParams } = new URL(request.url)
      const address = searchParams.get('address') as Address
      const chainId = parseInt(searchParams.get('chainId') || '7001')

      if (!address) {
        return NextResponse.json({ error: 'Address is required' }, { status: 400 })
      }

      const client = clients[chainId as keyof typeof clients]
      if (!client) {
        return NextResponse.json({ error: 'Unsupported chain' }, { status: 400 })
      }

      // Get token list for the chain
      const tokens = await getTokenList(chainId)
      
      // Get native balance with timeout handling
      let nativeBalance = BigInt(0)
      try {
        nativeBalance = await client.getBalance({ address })
      } catch (error) {
        console.warn('Failed to get native balance:', error)
        // Continue with 0 balance instead of failing completely
      }
      
      // Get token balances - use individual calls for ZetaChain
      const tokenAddresses = tokens.filter(token => token.address !== '0x0000000000000000000000000000000000000000')
      const balances = []
      
      for (const token of tokenAddresses) {
        try {
          // Validate address format (40 hex characters) and checksum
          if (!/^0x[a-fA-F0-9]{40}$/.test(token.address)) {
            console.warn(`Invalid address format for ${token.symbol}: ${token.address}`)
            balances.push({ result: BigInt(0) })
            continue
          }
          
          // Additional validation: check if address is not all zeros
          if (token.address === '0x0000000000000000000000000000000000000000') {
            console.warn(`Skipping zero address for ${token.symbol}`)
            balances.push({ result: BigInt(0) })
            continue
          }

          const balance = await client.readContract({
            address: token.address as Address,
            abi: [
              {
                name: 'balanceOf',
                type: 'function' as const,
                stateMutability: 'view' as const,
                inputs: [{ name: 'account', type: 'address' }],
                outputs: [{ name: '', type: 'uint256' }],
              },
            ] as const,
            functionName: 'balanceOf' as const,
            args: [address] as const,
          })
          balances.push({ result: balance })
        } catch (error) {
          // Silently handle contract errors (contract doesn't exist, no balanceOf function, etc.)
          console.log(`Skipping ${token.symbol} - contract not available on this network`)
          balances.push({ result: BigInt(0) })
        }
      }

      // Get token prices
      const symbols = tokens.map(token => token.symbol)
      const prices = await getTokenPrices(symbols)

      // Format balances
      const tokenBalances = []
      
      // Add native token balance
      if (nativeBalance > BigInt(0)) {
        const nativeToken = tokens.find(token => token.address === '0x0000000000000000000000000000000000000000')
        if (nativeToken) {
          const balanceFormatted = formatTokenBalance(nativeBalance.toString(), nativeToken.decimals)
          const usdValue = parseFloat(balanceFormatted) * (prices[nativeToken.symbol] || 0)
          
          tokenBalances.push({
            token: nativeToken,
            balance: nativeBalance.toString(),
            balanceFormatted,
            usdValue,
            percentage: 0
          })
        }
      }
      
      // Add token balances
      for (let i = 0; i < tokenAddresses.length; i++) {
        const token = tokenAddresses[i]
        const balance = balances[i].result as bigint
        
        if (balance > BigInt(0)) {
          const balanceFormatted = formatTokenBalance(balance.toString(), token.decimals)
          const usdValue = parseFloat(balanceFormatted) * (prices[token.symbol] || 0)
          
          tokenBalances.push({
            token,
            balance: balance.toString(),
            balanceFormatted,
            usdValue,
            percentage: 0
          })
        }
      }

      // Calculate portfolio metrics
      const portfolio = calculatePortfolioMetrics(tokenBalances)

      return NextResponse.json({
        portfolio,
        tokenBalances,
      })
    })()

    // Race between operation and timeout
    const result = await Promise.race([operationPromise, timeoutPromise])
    return result as Response
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}