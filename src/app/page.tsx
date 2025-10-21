'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import WalletConnect from '@/components/WalletConnect'

export default function Home() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/oracle')
    }
  }, [isConnected, router])

  return <WalletConnect />
}