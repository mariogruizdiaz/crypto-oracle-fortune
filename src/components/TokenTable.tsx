'use client'

import { TokenBalance } from '@/lib/portfolio'
import { motion } from 'framer-motion'

interface TokenTableProps {
  balances: TokenBalance[]
  isLoading: boolean
}

export default function TokenTable({ balances, isLoading }: TokenTableProps) {
  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-8 card-hover" style={{ padding: '2rem' }}>
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-slate-700/50 rounded-lg w-1/3"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-700/50 rounded-xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-slate-700/50 rounded w-1/3"></div>
                <div className="h-4 bg-slate-700/30 rounded w-1/4"></div>
              </div>
              <div className="h-6 bg-slate-700/50 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (balances.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center card-hover" style={{ padding: '3rem' }}>
        <div className="text-slate-400 mb-6">
          <svg className="w-16 h-16 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-200 mb-3">No tokens found</h3>
        <p className="text-slate-400">Try switching networks or check if you have tokens in this wallet.</p>
      </div>
    )
  }

  return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl overflow-hidden card-hover w-full h-full flex flex-col"
          style={{ padding: '2rem' }}
        >
      <div className="px-8 py-6 border-b border-slate-700/50">
        <h3 className="text-2xl font-bold text-slate-100 mb-2">Your Holdings</h3>
        <p className="text-slate-400">Top tokens in your portfolio</p>
      </div>
      
      <div className="divide-y divide-slate-700/30">
        {balances.map((balance, index) => (
          <motion.div
            key={balance.token.address}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="px-8 py-6 hover:bg-slate-800/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {balance.token.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-100">{balance.token.symbol}</div>
                  <div className="text-slate-400">{balance.token.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-slate-100">
                  {parseFloat(balance.balanceFormatted).toFixed(4)}
                </div>
                <div className="text-slate-400">
                  ${balance.usdValue.toFixed(2)}
                </div>
                <div className="text-sm text-violet-400 font-medium">
                  {balance.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
