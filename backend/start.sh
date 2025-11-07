#!/bin/bash

echo "🔍 Verificando processos Nest rodando..."
PIDS=$(lsof -ti:4000)
if [ ! -z "$PIDS" ]; then
  echo "🛑 Parando processos na porta 4000..."
  kill -9 $PIDS 2>/dev/null || true
fi

echo "🐘 Iniciando PostgreSQL no Docker..."
docker compose up -d

echo "⏳ Aguardando PostgreSQL iniciar..."
sleep 3

echo "🔄 Executando migrations do Prisma..."
npx prisma migrate deploy

echo "✅ Gerando Prisma Client..."
npx prisma generate

echo "🚀 Iniciando servidor NestJS..."
npm run start:dev

