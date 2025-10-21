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

// Hardcoded token lists to avoid import issues
const ZETA_TOKENS: Token[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ZETA",
    name: "ZetaChain Native Token",
    decimals: 18,
    chainId: 7001
  }
]

const SEPOLIA_TOKENS: Token[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    name: "Ethereum Native Token",
    decimals: 18,
    chainId: 11155111
  }
]

export const getTokenList = async (chainId: number): Promise<Token[]> => {
  try {
    // Return hardcoded token lists
    if (chainId === 7001) {
      return ZETA_TOKENS
    } else {
      return SEPOLIA_TOKENS
    }
  } catch (error) {
    console.error('Error fetching token list:', error)
    return []
  }
}

export const getTokenByAddress = (tokens: Token[], address: string): Token | undefined => {
  return tokens.find(token => token.address.toLowerCase() === address.toLowerCase())
}
