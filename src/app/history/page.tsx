'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'

// Mock data for cosmic history
const mockHistory = [
  {
    id: '1',
    question: 'What does the future hold for my investments?',
    address: '0x123...abc',
    dateAsked: 'Asked on May 20, 2024 at 10:30 PM',
    oracleResponse: 'The stars align in your favor. Expect a significant surge in your crypto assets within the next lunar cycle. However, be wary of a volatile market on the ides of March. The celestial bodies suggest diversification into promising altcoins, as a meteor shower of opportunity is forecasted.',
  },
  {
    id: '2',
    question: 'Will my new crypto project succeed?',
    address: '0x456...def',
    dateAsked: 'Asked on May 18, 2024 at 02:15 PM',
    oracleResponse: 'The digital winds are at your back. Your project shows great promise and innovation. Collaborate with a partner whose sign is in the house of Gemini for optimal results. The cosmos foretells a successful launch, but warns against ignoring community feedback during the waxing moon.',
  },
  {
    id: '3',
    question: 'Is it a good time to invest in Ethereum?',
    address: '0x789...ghi',
    dateAsked: 'Asked on May 15, 2024 at 11:11 AM',
    oracleResponse: 'The oracle sees a path of steady growth for Ethereum. Patience will be your greatest asset. The cosmos advises a long-term strategy for this particular endeavor. Mercury\'s retrograde may cause short-term fluctuations, but Jupiter\'s influence promises long-term prosperity.',
  },
]

export default function HistoryPage() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Your Cosmic History</h1>
            <p className="text-gray-300">Past consultations with the oracle</p>
          </div>

          <div className="space-y-6">
            {mockHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-purple-400 mb-2">
                        {item.question}
                      </h3>
                      <div className="text-sm text-gray-400 mb-2">
                        {item.address} • {item.dateAsked}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🔮</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="text-white whitespace-pre-wrap">
                      {item.oracleResponse}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push('/oracle')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Ask a New Fortune
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
