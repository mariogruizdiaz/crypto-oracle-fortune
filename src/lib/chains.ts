import { defineChain } from 'viem'

export const zetaTestnet = defineChain({
  id: 7001,
  name: 'ZetaChain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ZETA',
    symbol: 'ZETA',
  },
  rpcUrls: {
    default: {
      http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
    },
  },
  blockExplorers: {
    default: { name: 'ZetaChain Explorer', url: 'https://explorer.zetachain.com' },
  },
  contracts: {
    multicall3: {
      address: '0x0000000000000000000000000000000000000000', // Disabled
    },
  },
  testnet: true,
})

export const sepolia = defineChain({
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [
        'https://ethereum-sepolia.publicnode.com',
        'https://sepolia.gateway.tenderly.co',
        'https://rpc.sepolia.org'
      ],
    },
  },
  blockExplorers: {
    default: { name: 'Sepolia Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
})

export const supportedChains = [zetaTestnet, sepolia] as const
