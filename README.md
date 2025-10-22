# Crypto Oracle Fortune

> **A Next.js 14 Web3 + AI application that generates personalized crypto fortunes based on wallet holdings using advanced portfolio analysis and AI-powered insights.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-v2-orange?style=flat-square)](https://wagmi.sh/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-green?style=flat-square)](https://openai.com/)

## 🎯 Project Overview

This project demonstrates advanced Web3 integration, AI-powered user experiences, and modern React architecture. Built for the ZetaChain team, it showcases real-world blockchain data analysis combined with conversational AI to create an engaging user experience.

### Key Features
- **Multi-chain Portfolio Analysis**: Real-time balance fetching across ZetaChain Testnet and Sepolia
- **AI-Powered Insights**: Contextual fortune generation using OpenAI GPT-4o-mini
- **Modern Web3 Stack**: Wagmi + RainbowKit + Viem for optimal developer experience
- **Streaming AI Responses**: Real-time message generation for enhanced UX
- **Responsive Design**: Mobile-first approach with glass morphism aesthetics

## 🚀 Live Demo

**[View Live Application](https://crypto-oracle-fortune.vercel.app)**

## 🏗️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS with glass morphism design
- **Web3**: Wagmi v2 + RainbowKit + Viem
- **AI**: OpenAI GPT-4o-mini with streaming responses
- **State**: Zustand for lightweight state management
- **Deployment**: Vercel with automatic CI/CD

## 🎯 Core Features

### 1. **Multi-Chain Portfolio Analysis**
- Real-time balance fetching across ZetaChain Testnet and Sepolia
- Native token support (ETH, ZETA) and ERC-20 tokens
- Multicall optimization for efficient data retrieval
- Risk assessment using Herfindahl concentration index

### 2. **AI-Powered Fortune Generation**
- Contextual fortune generation based on actual portfolio data
- BaZi-inspired mystical yet educational fortune style
- Streaming responses for real-time user experience
- Follow-up chat for contextual conversations

### 3. **Modern Web3 Integration**
- Wagmi v2 for type-safe blockchain interactions
- RainbowKit for beautiful wallet connection UI
- Mobile support with WalletConnect
- Chain switching and network detection

## 📁 Project Structure

```
crypto-oracle-fortune/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   ├── portfolio/route.ts    # Multi-chain portfolio API
│   │   │   └── ai/route.ts          # OpenAI streaming API
│   │   ├── oracle/page.tsx          # Main dashboard
│   │   ├── history/page.tsx         # Fortune history
│   │   └── page.tsx                 # Landing page
│   ├── components/                  # Reusable UI components
│   │   ├── Header.tsx              # Responsive navigation
│   │   ├── TokenTable.tsx          # Portfolio display
│   │   ├── RiskMeter.tsx           # Risk visualization
│   │   ├── FortuneBox.tsx          # AI chat interface
│   │   └── FollowUpInput.tsx       # Chat input
│   └── lib/                         # Core business logic
│       ├── chains.ts               # Blockchain configurations
│       ├── portfolio.ts            # Portfolio calculations
│       ├── prompts.ts              # AI prompt engineering
│       └── store.ts                # Zustand state management
└── .github/workflows/              # CI/CD pipeline
    └── ci.yml                      # Automated testing
```

### Key Files

| File | Purpose |
|------|---------|
| `app/api/portfolio/route.ts` | Multi-chain portfolio fetching with multicall optimization |
| `app/api/ai/route.ts` | AI fortune generation with streaming responses |
| `lib/portfolio.ts` | Portfolio calculations and risk assessment |
| `lib/store.ts` | State management for chat history and portfolio data |

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **MetaMask** browser extension
- **OpenAI API key** for AI features

### Installation

1. **Clone and install**
```bash
git clone https://github.com/marioruizdiaz/crypto-oracle-fortune.git
cd crypto-oracle-fortune
npm install
```

2. **Configure environment variables**
```bash
# Create .env.local file
echo "OPENAI_API_KEY=sk-your-openai-api-key-here" > .env.local
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Setup

1. **Connect wallet** using MetaMask
2. **Switch to testnet** (ZetaChain Testnet or Sepolia)
3. **Get testnet tokens** from faucets:
   - [ZetaChain Faucet](https://cloud.google.com/application/web3/faucet/zetachain/testnet)
   - [Sepolia Faucet](https://faucet.circle.com/)
4. **Generate fortune** by clicking "Get My Fortune"

## ⚙️ Configuration

### Supported Networks
- **ZetaChain Testnet** (Chain ID: 7001)
- **Sepolia Testnet** (Chain ID: 11155111)

### Environment Variables
```env
# Required
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional (for mobile support)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

## 🚀 Deployment

### Vercel Deployment
1. **Connect GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (optional)
3. **Deploy automatically** on every push to main

### Manual Deployment
```bash
npm run build
npm run start
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Wallet not connecting** | Check MetaMask installation and network |
| **AI not responding** | Verify OpenAI API key and quota |
| **No tokens showing** | Ensure testnet tokens and correct network |
| **Build errors** | Check Node.js version (18+ required) |

## 📄 License

**MIT License** - See [LICENSE](LICENSE) file for details

---

## 👨‍💻 About the Author

<div align="center">

**Mario Ruiz Diaz**  
*Senior Full Stack Developer | Hands-On Software Architect | CTO/Tech Lead | AI & Cloud-Native Expert | Principal Engineer*

**Tech Architect | Hands-On CTO | Cloud-Native & AI Strategist**

I lead the design and delivery of scalable, cloud-native platforms that power AI, automation, and growth. With 20+ years of experience, I architect robust software systems—300+ microservices, resilient DevOps, and AI-driven pipelines—across AWS, Azure, and GCP.

I specialize in building cost-effective, multi-cloud architectures using Docker, Kubernetes, Terraform, and low-code automation (Make, n8n). My solutions boost reliability, reduce time-to-market, and unlock business agility for startups and enterprises alike.

I enjoy connecting with builders and thinkers who share a passion for systems, strategy, and technology that makes a real impact.

**📧 Contact:** [mariogrd@gmail.com](mailto:mariogrd@gmail.com)  
**💼 LinkedIn:** [linkedin.com/in/marioruizdiaz](https://www.linkedin.com/in/marioruizdiaz/)

---

**Built with ❤️ by Mario Ruiz Diaz**

*Demonstrating modern Web3 development with AI integration*

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=flat-square&logo=github)](https://github.com/marioruizdiaz/crypto-oracle-fortune)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://crypto-oracle-fortune.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/marioruizdiaz)

</div>