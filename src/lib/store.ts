import { create } from 'zustand'
import { TokenBalance, PortfolioSummary } from './portfolio'

interface ChatMessage {
  id: string
  type: 'user' | 'oracle'
  content: string
  timestamp: Date
}

interface AppState {
  // Portfolio state
  portfolio: PortfolioSummary | null
  tokenBalances: TokenBalance[]
  isLoadingPortfolio: boolean
  
  // Chat state
  chatMessages: ChatMessage[]
  isGeneratingFortune: boolean
  isGeneratingResponse: boolean
  
  // UI state
  selectedChainId: number
  isWalletConnected: boolean
  
  // Actions
  setPortfolio: (portfolio: PortfolioSummary | null) => void
  setTokenBalances: (balances: TokenBalance[]) => void
  setLoadingPortfolio: (loading: boolean) => void
  
  addChatMessage: (message: ChatMessage) => void
  clearChat: () => void
  setGeneratingFortune: (generating: boolean) => void
  setGeneratingResponse: (generating: boolean) => void
  
  setSelectedChainId: (chainId: number) => void
  setWalletConnected: (connected: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  portfolio: null,
  tokenBalances: [],
  isLoadingPortfolio: false,
  chatMessages: [],
  isGeneratingFortune: false,
  isGeneratingResponse: false,
  selectedChainId: 7001, // Default to ZetaChain
  isWalletConnected: false,
  
  // Actions
  setPortfolio: (portfolio) => set({ portfolio }),
  setTokenBalances: (balances) => set({ tokenBalances: balances }),
  setLoadingPortfolio: (loading) => set({ isLoadingPortfolio: loading }),
  
  addChatMessage: (message) => set((state) => ({ 
    chatMessages: [...state.chatMessages, message] 
  })),
  clearChat: () => set({ chatMessages: [] }),
  setGeneratingFortune: (generating) => set({ isGeneratingFortune: generating }),
  setGeneratingResponse: (generating) => set({ isGeneratingResponse: generating }),
  
  setSelectedChainId: (chainId) => set({ selectedChainId: chainId }),
  setWalletConnected: (connected) => set({ isWalletConnected: connected }),
}))
