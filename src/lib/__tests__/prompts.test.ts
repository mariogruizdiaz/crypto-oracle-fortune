import { describe, it, expect } from 'vitest'
import { generateFortunePrompt, generateFollowUpPrompt } from '../prompts'
import { PortfolioSummary, TokenBalance } from '../portfolio'
import { Token } from '../tokens'

describe('AI Prompts', () => {
  const ethToken: Token = {
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    chainId: 1,
  }

  const usdcToken: Token = {
    address: '0x0000000000000000000000000000000000000001',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    chainId: 1,
  }

  const daiToken: Token = {
    address: '0x0000000000000000000000000000000000000002',
    symbol: 'DAI',
    name: 'Dai',
    decimals: 18,
    chainId: 1,
  }

  const mockTopTokens: TokenBalance[] = [
    { token: ethToken, balance: '1000000000000000000', balanceFormatted: '1', usdValue: 2000, percentage: 80 },
    { token: usdcToken, balance: '400000000', balanceFormatted: '400', usdValue: 400, percentage: 16 },
    { token: daiToken, balance: '100000000000000000000', balanceFormatted: '100', usdValue: 100, percentage: 4 },
  ]

  const mockPortfolio: PortfolioSummary = {
    totalValue: 2500,
    tokenCount: 3,
    topTokens: mockTopTokens,
    riskLevel: 'high',
    concentration: 0.85,
  }

  it('should generate fortune prompt with portfolio data', () => {
    const prompt = generateFortunePrompt(mockPortfolio)
    
    expect(prompt).toContain('Analyze this portfolio')
    expect(prompt).toContain('diversification')
    expect(prompt).toContain('concentration')
    expect(prompt).toContain('volatility')
    expect(prompt).toContain('risks')
    expect(prompt).toContain('opportunities')
    expect(prompt).toContain('educational next steps')
  })

  it('should generate follow-up prompt with user question', () => {
    const userQuestion = 'Should I diversify my portfolio?'
    const prompt = generateFollowUpPrompt(mockPortfolio, userQuestion)
    
    expect(prompt).toContain('Should I diversify my portfolio?')
    expect(prompt).toContain('portfolio context')
    expect(prompt).toContain('avoid financial predictions')
  })

  it('should include portfolio data in JSON format', () => {
    const prompt = generateFortunePrompt(mockPortfolio)
    // The prompt includes JSON.stringify output with formatting (spaces)
    expect(prompt).toContain('"totalValue": 2500')
    expect(prompt).toContain('"tokenCount": 3')
    expect(prompt).toContain('"riskLevel": "high"')
    expect(prompt).toContain('"concentration": 0.85')
  })
})
