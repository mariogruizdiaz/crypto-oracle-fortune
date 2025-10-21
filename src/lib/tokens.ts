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

// Import token lists statically
import zetaTokens from '../../public/tokenlist.zeta.json'
import sepoliaTokens from '../../public/tokenlist.sepolia.json'

export const getTokenList = async (chainId: number): Promise<Token[]> => {
  try {
    // Return static token lists
    if (chainId === 7001) {
      return (zetaTokens as TokenList).tokens
    } else {
      return (sepoliaTokens as TokenList).tokens
    }
  } catch (error) {
    console.error('Error fetching token list:', error)
    return []
  }
}

export const getTokenByAddress = (tokens: Token[], address: string): Token | undefined => {
  return tokens.find(token => token.address.toLowerCase() === address.toLowerCase())
}
