#!/bin/bash

# Script para configurar el repositorio limpio
echo "🚀 Configurando repositorio limpio..."

# 1. Inicializar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Commit inicial
git commit -m "Initial commit: Crypto Oracle Fortune MVP

- Next.js 14 with App Router
- Wagmi v2 + RainbowKit for Web3
- OpenAI GPT-4o-mini integration
- Multi-chain support (ZetaChain, Sepolia)
- AI-powered fortune generation
- Responsive design with glass morphism
- TypeScript + TailwindCSS
- Zustand state management
- TanStack Query for data fetching"

# 4. Cambiar a branch main
git branch -M main

# 5. Agregar remote (reemplaza con tu URL)
echo "📝 Agrega tu remote con:"
echo "git remote add origin https://github.com/TU_USERNAME/crypto-oracle-fortune.git"
echo "git push -u origin main"

echo "✅ Repositorio configurado!"
echo "🔗 Recuerda crear el repo en GitHub primero"
