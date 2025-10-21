import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { zetaTestnet, sepolia } from './chains'

export const config = getDefaultConfig({
  appName: 'Crypto Oracle Fortune',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [zetaTestnet, sepolia],
  ssr: true,
  batch: {
    multicall: {
      wait: 16,
    },
  },
})
