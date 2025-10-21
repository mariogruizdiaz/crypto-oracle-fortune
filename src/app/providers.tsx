'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/wagmi'
import { useState, useEffect } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

// Suppress WalletConnect errors in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // More aggressive suppression for mobile
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Skip suppression entirely on mobile to avoid errors
  if (!isMobile) {
    let originalError: typeof console.error
    let originalWarn: typeof console.warn
    
    try {
      originalError = console.error
      originalWarn = console.warn
    } catch (e) {
      // If we can't get original functions, skip suppression
      originalError = () => {}
      originalWarn = () => {}
    }
  
  console.error = (...args) => {
    try {
      const errorMessage = args[0]?.toString() || ''
      if (
        errorMessage.includes('WalletConnect Core is already initialized') ||
        errorMessage.includes('Multiple versions of Lit loaded') ||
        errorMessage.includes('emitting session_request') ||
        errorMessage.includes('without any listeners') ||
        errorMessage.includes('session_request:') ||
        errorMessage.includes('WalletConnect') ||
        (isMobile && (
          errorMessage.includes('Core is already initialized') ||
          errorMessage.includes('session_request') ||
          errorMessage.includes('listeners')
        ))
      ) {
        return
      }
      // Only call originalError for non-WalletConnect errors
      try {
        originalError(...args)
      } catch (originalError) {
        // Silent fail if originalError fails
      }
    } catch (e) {
      // Silent fail if error handling fails
    }
  }
  
  console.warn = (...args) => {
    try {
      const warnMessage = args[0]?.toString() || ''
      if (
        warnMessage.includes('MaxListenersExceededWarning') ||
        warnMessage.includes('EventEmitter memory leak') ||
        warnMessage.includes('WalletConnect') ||
        warnMessage.includes('session_request') ||
        warnMessage.includes('emitting session_request') ||
        (isMobile && (
          warnMessage.includes('MaxListenersExceededWarning') ||
          warnMessage.includes('EventEmitter') ||
          warnMessage.includes('session_request')
        ))
      ) {
        return
      }
      // Only call originalWarn for non-WalletConnect warnings
      try {
        originalWarn(...args)
      } catch (originalWarn) {
        // Silent fail if originalWarn fails
      }
    } catch (e) {
      // Silent fail if warn handling fails
    }
  }
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  }))

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'Crypto Oracle Fortune',
            learnMoreUrl: 'https://rainbowkit.com',
          }}
          initialChain={config.chains[0]}
          modalSize="compact"
          showRecentTransactions={false}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
