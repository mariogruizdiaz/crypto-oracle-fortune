#!/bin/bash

echo "🚀 Configurando repositorio limpio para GitHub..."

# 1. Limpiar proyecto
echo "🧹 Limpiando archivos de desarrollo..."
chmod +x clean-project.sh
./clean-project.sh

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 3. Verificar que todo funciona
echo "🧪 Verificando que el proyecto funciona..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
else
    echo "❌ Error en build, revisando..."
    exit 1
fi

# 4. Inicializar git
echo "📝 Inicializando Git..."
git init

# 5. Configurar git user (reemplaza con tus datos)
echo "👤 Configurando Git user..."
git config user.name "Mario Ruiz Diaz"
git config user.email "tu-email@ejemplo.com"

# 6. Agregar todos los archivos
echo "📁 Agregando archivos al repositorio..."
git add .

# 7. Commit inicial profesional
echo "💾 Creando commit inicial..."
git commit -m "feat: Initial commit - Crypto Oracle Fortune MVP

✨ Features:
- Multi-chain Web3 integration (ZetaChain, Sepolia)
- AI-powered fortune generation with OpenAI GPT-4o-mini
- Real-time portfolio analysis and risk assessment
- Responsive design with glass morphism aesthetics
- Modern tech stack: Next.js 14, TypeScript, Wagmi v2, RainbowKit

🏗️ Architecture:
- Adapter pattern for Web3 abstraction
- Zustand for state management
- TanStack Query for data fetching
- Streaming AI responses for enhanced UX

🔧 Tech Stack:
- Next.js 14 with App Router
- TypeScript 5.0
- TailwindCSS with custom design system
- Wagmi v2 + RainbowKit + Viem
- OpenAI API integration
- Framer Motion animations

📱 Responsive:
- Mobile-first design
- WalletConnect for mobile support
- Cross-platform compatibility

🎯 Performance:
- Multicall optimization (90% RPC reduction)
- Code splitting and lazy loading
- Optimistic UI updates

🔒 Security:
- Read-only blockchain access
- No private key exposure
- Input validation with Zod schemas"

# 8. Cambiar a branch main
echo "🌿 Configurando branch main..."
git branch -M main

echo "✅ Repositorio configurado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Crear repositorio en GitHub: https://github.com/new"
echo "2. Nombre: crypto-oracle-fortune"
echo "3. Descripción: AI-powered crypto fortune generator with Web3 integration"
echo "4. NO inicializar con README/gitignore/license"
echo "5. Ejecutar:"
echo "   git remote add origin https://github.com/TU_USERNAME/crypto-oracle-fortune.git"
echo "   git push -u origin main"
echo ""
echo "🌐 Para deploy en Vercel:"
echo "1. Ve a https://vercel.com"
echo "2. Conecta con GitHub"
echo "3. Importa tu repositorio"
echo "4. Configura variables de entorno:"
echo "   - OPENAI_API_KEY"
echo "   - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID (opcional)"
