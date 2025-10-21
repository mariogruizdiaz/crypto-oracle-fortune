import { Token } from './tokens'

export interface TokenBalance {
  token: Token
  balance: string
  balanceFormatted: string
  usdValue: number
  percentage: number
}

export interface PortfolioSummary {
  totalValue: number
  tokenCount: number
  topTokens: TokenBalance[]
  riskLevel: 'low' | 'medium' | 'high'
  concentration: number
}

export const calculatePortfolioMetrics = (balances: TokenBalance[]): PortfolioSummary => {
  const totalValue = balances.reduce((sum, balance) => sum + balance.usdValue, 0)
  
  // Calculate percentages
  const balancesWithPercentages = balances.map(balance => ({
    ...balance,
    percentage: totalValue > 0 ? (balance.usdValue / totalValue) * 100 : 0
  }))

  // Sort by USD value and get top tokens
  const topTokens = balancesWithPercentages
    .sort((a, b) => b.usdValue - a.usdValue)
    .slice(0, 5)

  // Calculate concentration (Herfindahl index)
  const concentration = balancesWithPercentages.reduce(
    (sum, balance) => sum + Math.pow(balance.percentage / 100, 2),
    0
  )

  // Determine risk level based on concentration
  let riskLevel: 'low' | 'medium' | 'high' = 'low'
  if (concentration > 0.5) riskLevel = 'high'
  else if (concentration > 0.3) riskLevel = 'medium'

  return {
    totalValue,
    tokenCount: balances.length,
    topTokens,
    riskLevel,
    concentration
  }
}

export const formatTokenBalance = (balance: string, decimals: number): string => {
  const divisor = BigInt(10 ** decimals)
  const balanceBigInt = BigInt(balance)
  const integerPart = balanceBigInt / divisor
  const fractionalPart = balanceBigInt % divisor;

  // Use Number instead of BigInt literal for compatibility
  if (fractionalPart === BigInt(0)) {
    return integerPart.toString();
  }

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '')
  
  if (trimmedFractional === '') {
    return integerPart.toString()
  }
  
  return `${integerPart}.${trimmedFractional}`
}
