export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

export interface TokenList {
  name: string
  tokens: Token[]
}

export const getTokenList = async (chainId: number): Promise<Token[]> => {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : ''
    const response = await fetch(`${baseUrl}/tokenlist.${chainId === 7001 ? 'zeta' : 'sepolia'}.json`)
    const data: TokenList = await response.json()
    return data.tokens
  } catch (error) {
    console.error('Error fetching token list:', error)
    return []
  }
}

export const getTokenByAddress = (tokens: Token[], address: string): Token | undefined => {
  return tokens.find(token => token.address.toLowerCase() === address.toLowerCase())
}
