import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { generateFortunePrompt, generateFollowUpPrompt, SYSTEM_PROMPT } from '@/lib/prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { portfolioSummary, userQuestion, isFollowUp } = await request.json()

    if (!portfolioSummary) {
      return NextResponse.json({ error: 'Portfolio summary is required' }, { status: 400 })
    }

    const prompt = isFollowUp 
      ? generateFollowUpPrompt(portfolioSummary, userQuestion)
      : generateFortunePrompt(portfolioSummary)

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.8,
    })

    const encoder = new TextEncoder()
    
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
