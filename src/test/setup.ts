import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useAccount: () => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true,
  }),
  useChainId: () => 7001,
  useConnect: () => ({
    connect: vi.fn(),
  }),
  useDisconnect: () => ({
    disconnect: vi.fn(),
  }),
}))

// Mock RainbowKit
vi.mock('@rainbow-me/rainbowkit', () => {
  return {
    ConnectButton: () => 'div',
    RainbowKitProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock framer-motion
vi.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }: Record<string, unknown>) => 'div',
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})
