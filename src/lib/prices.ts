// Mock price data for demo purposes
// In a real app, this would fetch from CoinGecko, CoinMarketCap, or similar APIs

export interface PriceData {
  [symbol: string]: number
}

export const mockPrices: PriceData = {
  'ETH': 2500.00,
  'ZETA': 0.85,
  'USDC': 1.00,
  'USDT': 1.00,
  'DAI': 1.00,
  'WETH': 2500.00,
  'tBTC': 45000.00,
  'tUSDC': 1.00,
  'tETH': 2500.00,
}

export const getTokenPrice = async (symbol: string): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockPrices[symbol] || 0
}

export const getTokenPrices = async (symbols: string[]): Promise<PriceData> => {
  const prices: PriceData = {}
  
  for (const symbol of symbols) {
    prices[symbol] = await getTokenPrice(symbol)
  }
  
  return prices
}
