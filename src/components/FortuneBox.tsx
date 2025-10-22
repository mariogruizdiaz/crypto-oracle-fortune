'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

interface FortuneBoxProps {
  onGenerateFortune: () => void
  onClearChat: () => void
}

export default function FortuneBox({ onGenerateFortune, onClearChat }: FortuneBoxProps) {
  const { 
    chatMessages, 
    isGeneratingFortune, 
    portfolio 
  } = useAppStore()

  const oracleMessages = chatMessages.filter(msg => msg.type === 'oracle')
  // const userMessages = chatMessages.filter(msg => msg.type === 'user')
  
  // Show button if no fortune yet OR if we have a new portfolio (chain change)
  const shouldShowButton = oracleMessages.length === 0 || !portfolio

  return (
    <div className="glass rounded-2xl p-8 card-hover" style={{ padding: '2rem' }}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold gradient-text mb-2">The Oracle Speaks</h3>
            <p className="text-slate-400">AI-powered insights into your crypto destiny</p>
          </div>
          <div className="flex items-center gap-4">
            {shouldShowButton && (
              <button
                onClick={onGenerateFortune}
                disabled={isGeneratingFortune}
                className="px-16 py-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl hover:from-violet-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg min-w-[200px]"
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                {isGeneratingFortune ? 'Consulting...' : 'Get My Fortune'}
              </button>
            )}
            {chatMessages.length > 0 && (
              <>
                <button
                  onClick={onGenerateFortune}
                  disabled={isGeneratingFortune}
                  className="px-12 py-3 bg-emerald-600/80 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                  style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                >
                  🔮 New Fortune
                </button>
                <button
                  onClick={onClearChat}
                  className="px-12 py-3 bg-slate-600/80 text-white rounded-xl hover:bg-slate-600 transition-all text-sm font-medium"
                  style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                >
                  🗑️ Clear Chat
                </button>
              </>
            )}
          </div>
        </div>

        {isGeneratingFortune && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3 text-purple-400"
          >
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-400 border-t-transparent"></div>
            <span>The oracle is reading the cosmic patterns...</span>
          </motion.div>
        )}

        {chatMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Show all chat messages */}
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'oracle' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-lg">🔮</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] ${
                  message.type === 'user' 
                    ? 'bg-slate-700/50 border-slate-600/50' 
                    : 'bg-gradient-to-br from-violet-500/10 to-blue-500/10 border-violet-500/30'
                } rounded-2xl p-8 border shadow-lg`}
                style={{ padding: '2rem' }}
              >
                  <div className="text-xs text-slate-400 mb-4 font-medium">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  <div className="text-slate-100 whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-10 h-10 bg-slate-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-lg">👤</span>
                  </div>
                )}
              </div>
            ))}
            
            <div className="text-sm text-slate-500 italic text-center pt-4 border-t border-slate-700/30">
              * This fortune is for entertainment purposes only and should not be considered financial advice.
            </div>
          </motion.div>
        )}

        {chatMessages.length === 0 && !isGeneratingFortune && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl">🔮</span>
            </div>
            <h4 className="text-2xl font-bold text-slate-100 mb-3">Ready to Reveal Your Destiny</h4>
            <p className="text-slate-400 text-lg">
              Click &quot;Get My Fortune&quot; to receive your personalized crypto prophecy
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
