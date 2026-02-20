#!/bin/bash
# Script para crear el repositorio en GitHub y subir el código
# Ejecutar desde la raíz del proyecto: ./scripts/github-setup.sh

set -e

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "Error: Ejecuta este script desde la raíz del proyecto pps"
  exit 1
fi

# Verificar autenticación con GitHub
echo "Verificando autenticación con GitHub..."
if ! gh auth status &>/dev/null; then
  echo ""
  echo "Necesitas autenticarte con GitHub. Ejecuta:"
  echo "  gh auth login"
  echo ""
  echo "Selecciona GitHub.com, HTTPS, y sigue las instrucciones."
  exit 1
fi

# Crear repositorio y hacer push
echo "Creando repositorio en GitHub..."
gh repo create pps-plataforma-estudio \
  --public \
  --source=. \
  --description "Plataforma interactiva de estudio - Puesta y Producción Segura. Curso completo con teoría, práctica y laboratorios Docker." \
  --push

echo ""
echo "¡Listo! Repositorio creado en:"
gh repo view --web 2>/dev/null || echo "  https://github.com/$(gh api user -q .login)/pps-plataforma-estudio"
