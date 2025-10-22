'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { useAppStore } from '@/lib/store'
// import { zetaTestnet, sepolia } from '@/lib/chains'

export default function Header() {
  const { address } = useAccount()
  const chainId = useChainId()
  const { selectedChainId } = useAppStore()

  const getChainName = (chainId: number) => {
    if (chainId === 7001) return 'ZetaChain Testnet'
    if (chainId === 11155111) return 'Sepolia'
    return 'Unknown Network'
  }

  const getChainColor = (chainId: number) => {
    if (chainId === 7001) return 'text-purple-400'
    if (chainId === 11155111) return 'text-blue-400'
    return 'text-gray-400'
  }

  return (
    <header className="glass border-b border-slate-700/50 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile: Two-line layout */}
        <div className="sm:hidden">
          {/* First line: Logo + Title + Avatar + Address */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">Crypto Oracle</h1>
              </div>
            </div>
            
            {address && (
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-300 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 text-xs">👤</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Second line: Only ConnectButton */}
          <div className="flex items-center justify-center py-2 border-t border-slate-700/30">
            <ConnectButton />
          </div>
        </div>

        {/* Desktop/Tablet: Single line layout */}
        <div className="hidden sm:flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm lg:text-lg">⚡</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold gradient-text">Crypto Oracle</h1>
                <p className="text-slate-400 text-sm hidden lg:block">AI-Powered Portfolio Insights</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 lg:gap-4">
            {address && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-slate-300 font-medium">
                    {getChainName(chainId || selectedChainId)}
                  </div>
                  <div className={`text-xs font-mono ${getChainColor(chainId || selectedChainId)}`}>
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-300 text-sm">👤</span>
                </div>
              </div>
            )}
            
            <div className="flex-shrink-0">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
