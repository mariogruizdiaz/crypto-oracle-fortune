'use client'

import { PortfolioSummary } from '@/lib/portfolio'
import { motion } from 'framer-motion'

interface RiskMeterProps {
  portfolio: PortfolioSummary
}

export default function RiskMeter({ portfolio }: RiskMeterProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'from-green-500 to-emerald-500'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'high': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Low Risk'
      case 'medium': return 'Medium Risk'
      case 'high': return 'High Risk'
      default: return 'Unknown'
    }
  }

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'low': return 'Well diversified portfolio'
      case 'medium': return 'Moderate concentration risk'
      case 'high': return 'High concentration in few assets'
      default: return 'Risk level unknown'
    }
  }

  return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 card-hover w-full h-full flex flex-col"
          style={{ padding: '2rem' }}
        >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-100">Portfolio Risk</h3>
          <span 
            className={`px-10 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r ${getRiskColor(portfolio.riskLevel)} text-white shadow-lg`}
            style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          >
            {getRiskLabel(portfolio.riskLevel)}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-slate-300">
            <span className="font-medium">Concentration</span>
            <span className="font-bold">{(portfolio.concentration * 100).toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-slate-700/50 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${portfolio.concentration * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-3 rounded-full bg-gradient-to-r ${getRiskColor(portfolio.riskLevel)} shadow-lg`}
            />
          </div>
        </div>
        
        <p className="text-slate-400 leading-relaxed">
          {getRiskDescription(portfolio.riskLevel)}
        </p>
        
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-100">{portfolio.tokenCount}</div>
            <div className="text-sm text-slate-400 font-medium">Tokens</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-100">${portfolio.totalValue.toFixed(0)}</div>
            <div className="text-sm text-slate-400 font-medium">Total Value</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
