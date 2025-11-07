#!/bin/bash

echo "🐘 Iniciando PostgreSQL no Docker..."
docker compose up -d

echo "⏳ Aguardando PostgreSQL iniciar..."
sleep 3

echo "🔄 Executando migrations do Prisma..."
npx prisma migrate dev --name init

echo "✅ Gerando Prisma Client..."
npx prisma generate

echo "🚀 Iniciando servidor NestJS..."
npm run start:dev

