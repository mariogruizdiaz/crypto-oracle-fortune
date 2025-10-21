'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { useAppStore } from '@/lib/store'
import { useEffect } from 'react'

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { setWalletConnected, setSelectedChainId } = useAppStore()

  useEffect(() => {
    setWalletConnected(isConnected)
    if (chainId) {
      setSelectedChainId(chainId)
    }
  }, [isConnected, chainId, setWalletConnected, setSelectedChainId])

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center space-y-8 p-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white">
              Unlock Your Crypto Destiny
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              What does your wallet say about your future? Connect your crypto wallet to reveal your financial fate. 
              Our secure and private platform analyzes your holdings to provide insights into your financial future.
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <ConnectButton />
            <p className="text-sm text-gray-400">
              Connect your wallet to get started
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
