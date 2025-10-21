'use client'

import { useAccount, useChainId } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import Header from '@/components/Header'
import TokenTable from '@/components/TokenTable'
import RiskMeter from '@/components/RiskMeter'
import FortuneBox from '@/components/FortuneBox'
import FollowUpInput from '@/components/FollowUpInput'

export default function OraclePage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    portfolio,
    tokenBalances,
    isLoadingPortfolio,
    setPortfolio,
    setTokenBalances,
    setLoadingPortfolio,
    addChatMessage,
    setGeneratingFortune,
    setGeneratingResponse,
    clearChat,
  } = useAppStore()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  useEffect(() => {
    if (address && chainId) {
      // Reset chat and portfolio when chain changes
      useAppStore.getState().clearChat()
      setPortfolio(null) // Reset portfolio to show button
      fetchPortfolio()
    }
  }, [address, chainId])

  const fetchPortfolio = async () => {
    if (!address || !chainId) return

    setLoadingPortfolio(true)
    setError(null)

    try {
      const response = await fetch(`/api/portfolio?address=${address}&chainId=${chainId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch portfolio')
      }

      setPortfolio(data.portfolio)
      setTokenBalances(data.tokenBalances)
    } catch (err) {
      console.error('Portfolio fetch error:', err)
      setError('Unable to fetch portfolio. Please check your wallet connection and try again.')
    } finally {
      setLoadingPortfolio(false)
    }
  }

  const generateFortune = async () => {
    if (!portfolio) return

    setGeneratingFortune(true)
    addChatMessage({
      id: Date.now().toString(),
      type: 'oracle',
      content: '',
      timestamp: new Date(),
    })

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioSummary: portfolio }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate fortune')
      }

      const reader = response.body?.getReader()
      if (!reader) return

      let content = ''
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.content) {
                content += data.content
                // Update the latest oracle message
                const messages = useAppStore.getState().chatMessages
                const oracleMessages = messages.filter(msg => msg.type === 'oracle')
                const latestMessage = oracleMessages[oracleMessages.length - 1]
                if (latestMessage) {
                  latestMessage.content = content
                }
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (err) {
      console.error('Error generating fortune:', err)
    } finally {
      setGeneratingFortune(false)
    }
  }

  const sendFollowUp = async (message: string) => {
    if (!portfolio) return

    // Add user message to chat history
    addChatMessage({
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    })

    // Add a new oracle message for the response
    const responseMessageId = Date.now().toString() + '_response'
    addChatMessage({
      id: responseMessageId,
      type: 'oracle',
      content: '',
      timestamp: new Date(),
    })

    setGeneratingResponse(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          portfolioSummary: portfolio, 
          userQuestion: message,
          isFollowUp: true 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) return

      let content = ''
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.content) {
                content += data.content
                // Update the specific response message
                const messages = useAppStore.getState().chatMessages
                const messageIndex = messages.findIndex(msg => msg.id === responseMessageId)
                if (messageIndex !== -1) {
                  messages[messageIndex].content = content
                  useAppStore.setState({ chatMessages: [...messages] })
                }
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (err) {
      console.error('Error getting response:', err)
    } finally {
      setGeneratingResponse(false)
    }
  }

  const handleClearChat = () => {
    clearChat()
  }

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-6xl space-y-6 sm:space-y-8">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 flex">
              <TokenTable 
                balances={tokenBalances} 
                isLoading={isLoadingPortfolio} 
              />
            </div>
            <div className="lg:col-span-1 flex">
              {portfolio && <RiskMeter portfolio={portfolio} />}
            </div>
          </div>

          {/* Fortune Section */}
          <div className="space-y-6 sm:space-y-8">
            <FortuneBox 
              onGenerateFortune={generateFortune} 
              onClearChat={handleClearChat}
            />
            <FollowUpInput onSendMessage={sendFollowUp} />
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 glass">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <div>
                  <div className="text-red-400 font-semibold text-lg">Error</div>
                  <div className="text-red-300">{error}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
