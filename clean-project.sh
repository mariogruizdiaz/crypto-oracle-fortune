#!/bin/bash

echo "🧹 Limpiando proyecto para repositorio público..."

# 1. Eliminar archivos de desarrollo
echo "📁 Eliminando archivos de desarrollo..."
rm -rf .next/
rm -rf node_modules/
rm -rf .vercel/
rm -rf coverage/
rm -rf dist/
rm -rf build/

# 2. Eliminar archivos de entorno local
echo "🔐 Eliminando archivos de entorno..."
rm -f .env.local
rm -f .env.development.local
rm -f .env.test.local
rm -f .env.production.local

# 3. Eliminar archivos de logs
echo "📝 Eliminando logs..."
rm -f *.log
rm -f npm-debug.log*
rm -f yarn-debug.log*
rm -f yarn-error.log*

# 4. Eliminar archivos temporales
echo "🗑️ Eliminando archivos temporales..."
rm -rf .cache/
rm -rf .parcel-cache/
rm -rf .rpt2_cache/
rm -rf .rts2_cache_cjs/
rm -rf .rts2_cache_es/
rm -rf .rts2_cache_umd/
rm -rf .nyc_output/

# 5. Eliminar archivos de editor
echo "✏️ Eliminando archivos de editor..."
rm -rf .vscode/
rm -rf .idea/
rm -f *.swp
rm -f *.swo
rm -f *~

# 6. Eliminar archivos del sistema
echo "💻 Eliminando archivos del sistema..."
rm -f .DS_Store
rm -f .DS_Store?
rm -f ._*
rm -f .Spotlight-V100
rm -f .Trashes
rm -f ehthumbs.db
rm -f Thumbs.db

# 7. Eliminar package-lock.json para reinstalación limpia
echo "📦 Eliminando package-lock.json..."
rm -f package-lock.json

echo "✅ Proyecto limpiado exitosamente!"
echo "📋 Próximos pasos:"
echo "1. npm install"
echo "2. git init"
echo "3. git add ."
echo "4. git commit -m 'Initial commit'"
echo "5. Crear repo en GitHub"
echo "6. git remote add origin <URL>"
echo "7. git push -u origin main"
