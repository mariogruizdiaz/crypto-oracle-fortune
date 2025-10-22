import { describe, it, expect } from 'vitest'
import { generateFortunePrompt, generateFollowUpPrompt } from '../prompts'

describe('AI Prompts', () => {
  const mockPortfolio = {
    totalValue: 2500,
    tokenCount: 3,
    topTokens: [
      { token: { symbol: 'ETH' }, usdValue: 2000, percentage: 80 },
      { token: { symbol: 'USDC' }, usdValue: 400, percentage: 16 },
      { token: { symbol: 'DAI' }, usdValue: 100, percentage: 4 },
    ],
    riskLevel: 'high' as const,
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
