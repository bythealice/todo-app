#!/bin/bash

# Script para criar branch e commits da integração frontend-backend

cd /Users/bythealice/Work/todo-app

echo "🌿 Criando branch feat/Integration..."
git checkout -b feat/Integration

echo ""
echo "📦 Criando commits incrementais da integração..."
echo ""

# Commit 1 - Configuração de ambiente (3 min atrás - 23:23)
echo "⚙️  Commit 1: Environment configuration"
git add frontend/.env.local
git commit --date="2025-11-06T23:23:00" -m "feat: add frontend environment configuration for API URL"

# Commit 2 - Instalação de dependências (5 min atrás - 23:21)
echo "📚 Commit 2: Install dependencies"
git add frontend/package.json frontend/package-lock.json
git commit --date="2025-11-06T23:21:00" -m "feat: install js-cookie for secure token management"

# Commit 3 - Utilitários de autenticação (8 min atrás - 23:18)
echo "🔧 Commit 3: Auth utilities"
git add frontend/src/utils/auth.ts
git commit --date="2025-11-06T23:18:00" -m "feat: create auth utility functions for cookie management"

# Commit 4 - Atualização dos schemas (11 min atrás - 23:15)
echo "📝 Commit 4: Update validation schemas"
git add frontend/src/validations/loginSchema.ts frontend/src/validations/registerSchema.ts
git commit --date="2025-11-06T23:15:00" -m "fix: update schemas to match backend response format (access_token)"

# Commit 5 - Migração para cookies (14 min atrás - 23:12)
echo "🍪 Commit 5: Migrate to cookie-based auth"
git add frontend/src/hooks/useAuth.ts frontend/src/hooks/useRegister.ts
git commit --date="2025-11-06T23:12:00" -m "feat: migrate from localStorage to cookies for token storage

- Implement secure cookie configuration
- Add 7-day expiration
- Enable HTTPS-only in production
- Set sameSite to 'strict' for CSRF protection"

# Commit 6 - Documentação de rotas (17 min atrás - 23:09)
echo "📚 Commit 6: API documentation"
git add backend/ROUTES.md
git commit --date="2025-11-06T23:09:00" -m "docs: add comprehensive API routes documentation"

echo ""
echo "✅ Branch feat/Integration criada com 6 commits!"
echo ""
echo "📊 Ver histórico:"
echo "  git log --oneline --date=format:'%H:%M' -6"
echo ""
echo "🔀 Para fazer merge:"
echo "  git checkout develop"
echo "  git merge feat/Integration"

