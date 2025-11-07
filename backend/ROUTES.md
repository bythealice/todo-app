# 📍 Rotas da API - Todo App Backend

**Base URL:** `http://localhost:4000/api`

## 🔓 Rotas Públicas (Sem Autenticação)

### 1. Health Check
- **GET** `/`
- **Descrição:** Verifica se o servidor está rodando
- **Resposta:** `"Hello World!"`

### 2. Signup (Cadastro)
- **POST** `/api/auth/signup`
- **Descrição:** Criar uma nova conta de usuário
- **Body:**
  ```json
  {
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }
  ```
- **Resposta:** 
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "joao@example.com",
      "name": "João Silva",
      "createdAt": "2025-11-06T..."
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Status:** `201 Created`

### 3. Login
- **POST** `/api/auth/login`
- **Descrição:** Fazer login e receber token JWT
- **Body:**
  ```json
  {
    "email": "joao@example.com",
    "password": "senha123"
  }
  ```
- **Resposta:** 
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "joao@example.com",
      "name": "João Silva",
      "createdAt": "2025-11-06T..."
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Status:** `200 OK`

---

## 🔐 Rotas Protegidas (Requerem Autenticação)

**Header obrigatório:**
```
Authorization: Bearer {seu_token_jwt}
```

### 4. Get Profile (Me)
- **GET** `/api/auth/me`
- **Descrição:** Obter informações do usuário autenticado
- **Headers:**
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Resposta:**
  ```json
  {
    "id": "uuid",
    "email": "joao@example.com",
    "name": "João Silva",
    "createdAt": "2025-11-06T..."
  }
  ```
- **Status:** `200 OK`

---

## 📂 Estrutura de Arquivos das Rotas

```
backend/src/
├── app.controller.ts          → Rota: GET /
├── auth/
│   ├── auth.controller.ts     → Rotas: /api/auth/*
│   ├── auth.module.ts         → Registro do AuthModule
│   ├── auth.service.ts        → Lógica de negócio
│   ├── dto/
│   │   ├── login.dto.ts       → Validação do login
│   │   └── signup.dto.ts      → Validação do signup
│   ├── guards/
│   │   └── jwt-auth.guard.ts  → Proteção de rotas
│   └── strategies/
│       └── jwt.strategy.ts    → Estratégia JWT
└── app.module.ts              → Registro de todos os módulos
```

---

## 🧪 Testando as Rotas

### Usando cURL:

**Signup:**
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com","password":"senha123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"senha123"}'
```

**Get Profile:**
```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## ⚙️ Configurações Importantes

- **CORS habilitado para:** `http://localhost:3000` (Frontend)
- **Prefixo global:** `/api`
- **Porta:** `4000` (padrão)
- **Validação:** Ativada globalmente com `ValidationPipe`

