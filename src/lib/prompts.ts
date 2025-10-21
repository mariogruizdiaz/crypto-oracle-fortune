import { PortfolioSummary } from './portfolio'

export const SYSTEM_PROMPT = `You are a pragmatic crypto oracle who interprets portfolios through the style of BaZi metaphors. 
Be insightful, educational, and creative, but never give financial advice. 
Keep responses concise, structured, and capped at 200 words. Include a friendly disclaimer.`

export const generateFortunePrompt = (portfolioSummary: PortfolioSummary): string => {
  return `Analyze this portfolio (JSON):
${JSON.stringify(portfolioSummary, null, 2)}

Tasks:
1. Describe diversification, concentration, and volatility in 4–5 bullet points.
2. List 2 potential risks and 2 opportunities.
3. Suggest 3 educational next steps.
4. Keep tone mystical yet responsible.`
}

export const generateFollowUpPrompt = (portfolioSummary: PortfolioSummary, userQuestion: string): string => {
  return `Using the previous portfolio context, answer the user's follow-up question:
"${userQuestion}"

Portfolio context:
${JSON.stringify(portfolioSummary, null, 2)}

Keep the tone consistent and avoid financial predictions.`
}
