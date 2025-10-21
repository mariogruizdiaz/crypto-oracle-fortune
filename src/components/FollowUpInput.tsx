'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

interface FollowUpInputProps {
  onSendMessage: (message: string) => void
}

export default function FollowUpInput({ onSendMessage }: FollowUpInputProps) {
  const [message, setMessage] = useState('')
  const { isGeneratingResponse } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isGeneratingResponse) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 card-hover"
      style={{ padding: '2rem' }}
    >
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask the oracle a clarifying question..."
            disabled={isGeneratingResponse}
            className="w-full px-8 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isGeneratingResponse}
          className="px-16 py-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl hover:from-violet-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3 font-semibold shadow-lg min-w-[180px]"
          style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
        >
          {isGeneratingResponse ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <span>Ask Oracle</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-slate-500 text-center">
        Press Enter to send, Shift+Enter for new line
      </div>
    </motion.div>
  )
}
