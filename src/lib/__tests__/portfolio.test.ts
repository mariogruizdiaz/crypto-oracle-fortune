import { describe, it, expect } from 'vitest'
import { calculatePortfolioMetrics, formatTokenBalance } from '../portfolio'
import { TokenBalance } from '../portfolio'

describe('Portfolio Calculations', () => {
  const mockBalances: TokenBalance[] = [
    {
      token: {
        address: '0x123',
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        chainId: 1,
      },
      balance: '1000000000000000000', // 1 ETH
      balanceFormatted: '1.0',
      usdValue: 2500,
      percentage: 0,
    },
    {
      token: {
        address: '0x456',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        chainId: 1,
      },
      balance: '1000000', // 1 USDC
      balanceFormatted: '1.0',
      usdValue: 1,
      percentage: 0,
    },
  ]

  it('should calculate portfolio metrics correctly', () => {
    const metrics = calculatePortfolioMetrics(mockBalances)
    
    expect(metrics.totalValue).toBe(2501)
    expect(metrics.tokenCount).toBe(2)
    expect(metrics.topTokens).toHaveLength(2)
    expect(metrics.riskLevel).toBe('high') // High concentration in ETH
    expect(metrics.concentration).toBeGreaterThan(0.9)
  })

  it('should format token balance correctly', () => {
    expect(formatTokenBalance('1000000000000000000', 18)).toBe('1')
    expect(formatTokenBalance('1500000000000000000', 18)).toBe('1.5')
    expect(formatTokenBalance('1000000', 6)).toBe('1')
    expect(formatTokenBalance('1500000', 6)).toBe('1.5')
  })

  it('should handle zero balance', () => {
    expect(formatTokenBalance('0', 18)).toBe('0')
  })

  it('should handle large numbers', () => {
    const largeBalance = '123456789012345678901234567890'
    const formatted = formatTokenBalance(largeBalance, 18)
    expect(formatted).toBe('123456789012345678901234567890')
  })
})
