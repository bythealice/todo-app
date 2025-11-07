# 📝 Fullstack ToDo App - Arquitetura Enterprise

Uma aplicação web full-stack de gerenciamento de tarefas construída com arquitetura escalável, seguindo princípios SOLID, Clean Architecture e as melhores práticas de desenvolvimento moderno. Este projeto demonstra uma implementação profissional completa, desde a escolha de tecnologias até decisões arquiteturais críticas.

<img width="1848" height="932" alt="image" src="https://github.com/user-attachments/assets/100a48af-1d35-4208-b259-cd0217fa09d3" />

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
  - [Decisões de Arquitetura Backend](#decisões-de-arquitetura-backend)
  - [Decisões de Arquitetura Frontend](#decisões-de-arquitetura-frontend)
- [Stack Tecnológico e Justificativas](#stack-tecnológico-e-justificativas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação Completa](#instalação-completa)
  - [Instalação com Docker (Recomendado)](#instalação-com-docker-recomendado)
  - [Instalação Manual](#instalação-manual)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Como Executar](#como-executar)
- [Estrutura do Projeto Detalhada](#estrutura-do-projeto-detalhada)
- [Padrões de Código e Boas Práticas](#padrões-de-código-e-boas-práticas)
- [API Documentation](#api-documentation)
- [Segurança e Autenticação](#segurança-e-autenticação)
- [Performance e Otimizações](#performance-e-otimizações)
- [Testes](#testes)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

## 🎯 Sobre o Projeto

Este é um sistema completo de gerenciamento de tarefas (ToDo List) desenvolvido como demonstração de uma arquitetura full-stack moderna, escalável e profissional. O projeto vai além de uma simples aplicação CRUD, implementando conceitos avançados de engenharia de software, segurança e experiência do usuário.

### Filosofia do Projeto

O desenvolvimento deste projeto foi guiado por princípios fundamentais:

- **Separação de Responsabilidades**: Backend e frontend completamente desacoplados, comunicando-se via API RESTful
- **Type Safety**: TypeScript em toda a aplicação para eliminar erros em tempo de compilação
- **Developer Experience**: Ferramentas modernas que aumentam produtividade e reduzem erros
- **Escalabilidade**: Arquitetura modular que permite crescimento horizontal e vertical
- **Manutenibilidade**: Código limpo, documentado e testável
- **Segurança First**: Implementação de práticas de segurança desde o início do desenvolvimento

### Destaques Técnicos:

- 🏗️ **Arquitetura Modular** - Baseada em DDD (Domain-Driven Design) com módulos independentes
- 🔐 **Autenticação Stateless** - JWT com refresh token strategy para escalabilidade
- 🎨 **Design System Próprio** - Componentes UI reutilizáveis e composáveis
- ⚡ **Cache Inteligente** - React Query com otimistic updates e cache invalidation
- 📚 **API Self-Documented** - Swagger/OpenAPI automático com decorators
- 🐳 **Container-Ready** - Docker e docker-compose para ambientes isolados
- ✅ **Validação em Camadas** - Schemas compartilháveis entre client e server
- 🔄 **Real-time Feedback** - Loading states, error boundaries e toast notifications
- 🧪 **Test-Ready** - Estrutura preparada para testes unitários e E2E

## 🏛️ Arquitetura e Decisões Técnicas

### Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router)                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐   │  │
│  │  │   Pages &   │  │ Components  │  │  Middleware  │   │  │
│  │  │   Layouts   │  │   (UI/BL)   │  │   (Auth)     │   │  │
│  │  └─────────────┘  └─────────────┘  └──────────────┘   │  │
│  │         │                │                  │         │  │
│  │         └────────────────┼──────────────────┘         │  │
│  │                          │                            │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │        React Query (Data Management)            │  │  │
│  │  │  • Server State Cache                           │  │  │
│  │  │  • Optimistic Updates                           │  │  │
│  │  │  • Auto Refetch                                 │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                          │                            │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Service Layer (API Clients)           │  │  │
│  │  │  • authService  • taskService                   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └──────────────────────────┼────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────┘
                              │
                      HTTP/REST API
                       (JWT Bearer)
                              │
┌─────────────────────────────┼───────────────────────────────┐
│                      SERVER SIDE                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  NestJS Application                   │  │
│  │                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐   │  │
│  │  │ Controllers  │  │  Services    │  │  Guards    │   │  │
│  │  │ (HTTP Layer) │→ │(Business Logic)│← │  (Auth)  │   │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘   │  │
│  │         │                 │                           │  │
│  │─────────└─────────────────┼───────────────────────────┘  │
│                              │                              │
│    ┌─────────────────────────────────────────────────┐      │
│    │          Prisma ORM (Data Layer)                │      │
│    │  • Type-safe queries                            │      │
│    │  • Migrations                                   │      │
│    │  • Connection pooling                           │      │
│    └─────────────────────────────────────────────────┘      │
│                              │                              │
└──────────────────────────────┼──────────────────────────────┘
                               │
                   ┌───────────┴──────────┐
                   │   PostgreSQL DB      │
                   │  • ACID Compliance   │
                   │  • Relational Data   │
                   └──────────────────────┘
```

### Decisões de Arquitetura Backend

#### 1. **Por que NestJS?**

**Escolha**: Framework NestJS ao invés de Express.js puro ou Fastify.

**Justificativa**:
- **Arquitetura Enterprise**: NestJS implementa padrões como Dependency Injection, Module System e Decorators, facilitando a criação de aplicações escaláveis
- **TypeScript First**: Suporte nativo e completo ao TypeScript, com decorators que melhoram a legibilidade
- **Testabilidade**: DI container facilita mock de dependências para testes unitários
- **CLI Poderoso**: Geração de código boilerplate consistente
- **Ecossistema Rico**: Integração nativa com Swagger, TypeORM/Prisma, Passport, etc.
- **Opinião Forte**: Estrutura bem definida evita "decision fatigue" em times grandes

**Trade-offs**:
- ✅ Curva de aprendizado inicial maior, mas paga dividendos em manutenibilidade
- ✅ Overhead mínimo comparado aos benefícios arquiteturais

#### 2. **Por que Prisma ORM?**

**Escolha**: Prisma ao invés de TypeORM ou Sequelize.

**Justificativa**:
- **Type Safety Completo**: Schema Prisma gera tipos TypeScript automaticamente, eliminando discrepância entre DB e código
- **Developer Experience**: Prisma Client tem autocomplete perfeito e queries intuitivas
- **Migrations Seguras**: Sistema de migrations declarativo e versionado
- **Performance**: Query engine otimizado em Rust
- **Prisma Studio**: Interface visual para debug e exploração do banco

```prisma
// Schema declarativo e legível
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  priority    Priority  @default(MEDIUM)
  completed   Boolean   @default(false)
  userId      Int
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Decisões de Schema**:
- `@default(autoincrement())`: IDs sequenciais para melhor performance em índices
- `onDelete: Cascade`: Quando usuário é deletado, suas tasks também são (GDPR compliance)
- `@updatedAt`: Timestamp automático para auditoria
- `@unique` em email: Garante unicidade a nível de banco, não apenas aplicação

#### 3. **Autenticação JWT Stateless**

**Escolha**: JWT ao invés de sessions.

**Justificativa**:
- **Escalabilidade Horizontal**: Não precisa de session store compartilhado entre instâncias
- **Microservices Ready**: Token pode ser validado por qualquer serviço sem consultar DB
- **Mobile Friendly**: Ideal para apps mobile que fazem HTTP requests
- **Stateless**: Servidor não mantém estado, reduz complexidade

**Implementação**:
```typescript
// Estratégia Passport JWT customizada
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
```

**Security Measures**:
- Tokens com expiração curta (7 dias)
- Senha hasheada com bcrypt (salt rounds: 10)
- Validação de existência do usuário a cada request autenticado
- Secret key armazenada em variável de ambiente

#### 4. **Validação com Class Validator**

**Escolha**: DTOs com class-validator ao invés de Joi ou Yup no backend.

**Justificativa**:
- **Integração Nativa**: NestJS tem suporte built-in via ValidationPipe
- **Type Safety**: DTOs são classes TypeScript, não apenas schemas
- **Decorators Expressivos**: Código mais legível e autodocumentado
- **Swagger Integration**: Decorators geram documentação automaticamente

```typescript
export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa' })
  @IsString()
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @Length(1, 255, { message: 'Título deve ter entre 1 e 255 caracteres' })
  title: string;

  @ApiProperty({ description: 'Descrição detalhada', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ enum: Priority, default: Priority.MEDIUM })
  @IsEnum(Priority, { message: 'Prioridade inválida' })
  @IsOptional()
  priority?: Priority;
}
```

#### 5. **Modularização e Dependency Injection**

**Estrutura Modular**:
```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
```

**Benefícios**:
- Cada módulo encapsula suas dependências
- Fácil remoção ou substituição de módulos
- Teste de módulos isoladamente
- Lazy loading futuro (para microservices)

#### 6. **Documentação Automática com Swagger**

**Configuração**:
```typescript
const config = new DocumentBuilder()
  .setTitle('Todo API')
  .setDescription('API de gerenciamento de tarefas')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

**Vantagens**:
- Documentação sempre sincronizada com código
- Testável via Swagger UI
- Geração de clients automática (openapi-generator)

### Decisões de Arquitetura Frontend

#### 1. **Por que Next.js 15 com App Router?**

**Escolha**: Next.js ao invés de Create React App ou Vite.

**Justificativa**:
- **Server-Side Rendering (SSR)**: Melhor SEO e First Contentful Paint
- **App Router (React Server Components)**: Nova arquitetura que separa client/server code
- **API Routes**: Backend-for-frontend pattern sem servidor adicional
- **Image Optimization**: Componente Image otimiza automaticamente
- **File-based Routing**: Roteamento intuitivo baseado em estrutura de pastas
- **TypeScript Native**: Suporte de primeira classe

**App Router vs Pages Router**:
- Optamos por App Router (novo padrão) para:
  - Layouts aninhados compartilhados
  - Streaming SSR
  - Server Components para buscar dados no servidor
  - Loading states automáticos com `loading.tsx`
  - Error boundaries com `error.tsx`

**Estrutura de Rotas**:
```
app/
├── layout.tsx          # Root layout (HTML shell)
├── page.tsx            # Landing page (público)
├── login/
│   ├── layout.tsx      # Layout de auth (centralizado, sem sidebar)
│   └── page.tsx        # Página de login
├── register/
│   ├── layout.tsx      # Layout de auth
│   └── page.tsx        # Página de registro
└── dashboard/
    ├── layout.tsx      # Layout autenticado (sidebar, header)
    └── page.tsx        # Dashboard principal (protegido)
```

#### 2. **Por que React Query (TanStack Query)?**

**Escolha**: React Query ao invés de Redux, Zustand ou Context API para estado do servidor.

**Justificativa**:
- **Server State ≠ Client State**: React Query trata estado do servidor como cache, não como estado global
- **Cache Inteligente**: Deduplica requests, cache automático com stale-while-revalidate
- **Optimistic Updates**: Atualiza UI instantaneamente, reverte se falhar
- **Auto Refetch**: Refetch em window focus, reconnect, intervals
- **DevTools**: Inspeção visual do cache e queries

**Implementação de Custom Hook**:
```typescript
export function useTaskQueries() {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
    staleTime: 1000 * 60, // 1 minuto
  });

  const createMutation = useMutation({
    mutationFn: taskService.createTask,
    onMutate: async (newTask) => {
      // Cancel refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
      // Snapshot
      const previous = queryClient.getQueryData(['tasks']);
      
      // Optimistic update
      queryClient.setQueryData(['tasks'], (old) => [...old, newTask]);
      
      return { previous };
    },
    onError: (err, newTask, context) => {
      // Rollback
      queryClient.setQueryData(['tasks'], context.previous);
    },
    onSettled: () => {
      // Refetch para sincronizar
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { tasksQuery, createMutation };
}
```

**Benefícios**:
- UX superior: usuário vê mudanças instantaneamente
- Less boilerplate: sem actions, reducers, middlewares
- Performance: deduplica requests automáticos

#### 3. **Por que Tailwind CSS?**

**Escolha**: Tailwind ao invés de CSS Modules, Styled Components ou Material-UI.

**Justificativa**:
- **Utility-First**: Composição rápida sem sair do JSX
- **Purge CSS**: Apenas classes usadas vão para produção (~10kb final)
- **Design System Built-in**: Escala de cores, espaçamentos consistentes
- **Responsive First**: Breakpoints simples (`md:`, `lg:`)
- **No Runtime**: CSS estático, sem overhead de JavaScript
- **Customização**: `tailwind.config.ts` permite temas personalizados

**Configuração Custom**:
```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          500: '#a855f7',
          600: '#9333ea',
          // ...
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
    },
  },
};
```

#### 4. **Validação com Zod**

**Escolha**: Zod ao invés de Yup ou Joi no frontend.

**Justificativa**:
- **TypeScript-First**: Infere tipos automaticamente
- **Composable**: Schemas reutilizáveis e combináveis
- **Error Messages**: Customização granular de mensagens
- **Parse vs Validate**: Garante type safety em runtime

```typescript
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título muito longo'),
  description: z
    .string()
    .max(1000, 'Descrição muito longa')
    .optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
});

// Type inference automática!
export type TaskFormData = z.infer<typeof taskSchema>;
```

**Integração com Forms**:
```typescript
const form = useForm<TaskFormData>({
  resolver: zodResolver(taskSchema),
  defaultValues: { priority: 'MEDIUM' },
});
```

#### 5. **Middleware para Autenticação**

**Escolha**: Next.js Middleware ao invés de HOCs ou Route Guards.

**Justificativa**:
- **Edge Runtime**: Executa antes do request chegar ao servidor
- **Performance**: Redirect sem renderizar página protegida
- **Centralizado**: Única fonte de verdade para proteção de rotas

```typescript
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  // Redireciona autenticado para dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redireciona não autenticado para login
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

#### 6. **Component Architecture - Atomic Design**

**Estrutura**:
```
components/
├── ui/              # Átomos (Button, Input, Card)
├── auth/            # Moléculas de autenticação (LoginForm)
├── tasks/           # Moléculas de tarefas (TaskCard, TaskForm)
└── dashboard/       # Organismos (StatCard com lógica)
```

**Princípios**:
- **Single Responsibility**: Cada componente faz uma coisa bem
- **Composição**: Componentes complexos compostos de simples
- **Prop Types**: TypeScript para contratos claros
- **Controlled Components**: Formulários controlados para validação em tempo real

**Exemplo de Composição**:
```tsx
<Card>
  <TaskCard task={task}>
    <Button variant="danger" onClick={handleDelete}>
      <TrashIcon />
      Excluir
    </Button>
  </TaskCard>
</Card>
```

#### 7. **Service Layer Pattern**

**Separação de Concerns**:
```typescript
// services/taskService.ts
class TaskService {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get('/tasks');
    return data;
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const { data } = await api.post('/tasks', task);
    return data;
  }
  // ... outros métodos
}

export const taskService = new TaskService();
```

**Benefícios**:
- Componentes não conhecem detalhes de API
- Fácil mock para testes
- Ponto único para interceptors, retry logic, etc.

#### 8. **Error Handling e Loading States**

**Error Boundaries**:
```tsx
// app/error.tsx
'use client';

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="error-container">
      <h2>Algo deu errado!</h2>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}
```

**Loading States**:
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton />;
}
```

**React Query Loading**:
```tsx
const { data, isLoading, error } = useTaskQueries().tasksQuery;

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <TaskList tasks={data} />;
```

### Decisões de Comunicação e Protocolo

#### REST API vs GraphQL vs tRPC

**Escolha**: REST API tradicional.

**Justificativa**:
- **Simplicidade**: Todo desenvolvedor conhece REST
- **Cacheability**: HTTP cache funciona out-of-the-box
- **Tooling**: Swagger, Postman, curl
- **Maturidade**: Padrões bem estabelecidos

**Trade-offs**:
- GraphQL seria melhor para: queries complexas com relações profundas
- tRPC seria melhor para: full-stack TypeScript com type sharing
- REST é suficiente para: CRUD simples com relações rasas

### Decisões de Segurança

#### 1. **CORS Configuration**

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

#### 2. **Rate Limiting** (Futuro)

```typescript
import { ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRoot({
  ttl: 60,
  limit: 10, // 10 requests por minuto
});
```

#### 3. **Helmet para Headers de Segurança**

```typescript
import helmet from 'helmet';
app.use(helmet());
```

### Decisões de Performance

#### 1. **Database Indexing**

```prisma
model Task {
  // ...
  userId Int
  @@index([userId]) // Index para queries WHERE userId = X
  @@index([completed]) // Index para filtros
  @@index([userId, completed]) // Composite index para ambos
}
```

#### 2. **Connection Pooling**

```typescript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Prisma gerencia pool automaticamente
}
```

#### 3. **React Query Cache Strategy**

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min
      cacheTime: 1000 * 60 * 5, // 5 min
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});
```

## 🚀 Stack Tecnológico e Justificativas

### Backend Stack

#### Core Framework
- **[NestJS 10](https://nestjs.com/)** - Framework Node.js progressivo e opinativo
  - *Por quê?* Arquitetura enterprise-ready com DI, decorators e modularização nativa
  - *Alternativas consideradas:* Express (muito básico), Fastify (menos opinativo)
  - *Trade-off:* Curva de aprendizado maior, mas código mais maintível

#### Linguagem
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
  - *Por quê?* Type safety reduz bugs em produção, melhor DX com autocomplete
  - *Benefícios:* Refatoração segura, documentação implícita via tipos
  - *Configuração:* `strict: true` para máxima segurança

#### ORM / Database
- **[Prisma 5](https://www.prisma.io/)** - ORM moderno e type-safe
  - *Por quê?* Melhor DX do mercado, migrations declarativas, type generation
  - *Alternativas:* TypeORM (menos type-safe), Sequelize (legacy)
  - *Vantagens:* Prisma Studio para debug, query engine em Rust (performance)

- **[PostgreSQL 15](https://www.postgresql.org/)** - Banco relacional ACID
  - *Por quê?* ACID compliance, suporte a JSON, performance excelente
  - *Alternativas:* MySQL (menos features), MongoDB (não relacional)
  - *Escolha:* Dados estruturados com relações claras (User ↔ Tasks)

#### Autenticação
- **[Passport.js](https://www.passportjs.org/)** + **[JWT](https://jwt.io/)** - Estratégia stateless
  - *Por quê?* Scalability horizontal sem session store
  - *Strategy:* JWT com Bearer Token no header `Authorization`
  - *Security:* Bcrypt (10 rounds) + secret key forte

#### Validação
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação com decorators
  - *Por quê?* Integração nativa com NestJS, decorators autodocumentados
  - *Uso:* DTOs validados automaticamente via `ValidationPipe`
  - *Exemplo:* `@IsString()`, `@IsEmail()`, `@Length(1, 255)`

#### Documentação
- **[Swagger/OpenAPI](https://swagger.io/)** - API self-documented
  - *Por quê?* Documentação gerada do código (single source of truth)
  - *Vantagens:* Testável via UI, geração de clients, contratos claros
  - *Integração:* Decorators `@ApiProperty()`, `@ApiResponse()`

### Frontend Stack

#### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework com SSR e App Router
  - *Por quê?* SSR para SEO, file-based routing, API routes built-in
  - *App Router:* Nova arquitetura com React Server Components
  - *Benefícios:* Layouts aninhados, streaming SSR, loading/error states automáticos

#### Linguagem
- **[TypeScript 5](https://www.typescriptlang.org/)** - Consistência full-stack
  - *Por quê?* Mesma linguagem do backend, tipos compartilháveis
  - *Configuração:* `strict: true`, `esModuleInterop: true`

#### State Management
- **[TanStack Query v5](https://tanstack.com/query/latest)** (React Query) - Server state
  - *Por quê?* Cache inteligente, optimistic updates, auto refetch
  - *Alternativas:* Redux (complexo demais), Context (não é para server state)
  - *Padrão:* Stale-while-revalidate para UX instantânea

#### Estilização
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Utility-first CSS
  - *Por quê?* Desenvolvimento rápido, purge automático, design system built-in
  - *Customização:* Paleta violeta custom, animations personalizadas
  - *Bundle size:* ~10kb após purge (apenas classes usadas)

#### Validação
- **[Zod 3](https://zod.dev/)** - Schema validation TypeScript-first
  - *Por quê?* Type inference automática, composable schemas
  - *Integração:* React Hook Form via `@hookform/resolvers`
  - *Vantagens:* Runtime type safety, error messages customizáveis

#### UI Components
- **[Lucide Icons](https://lucide.dev/)** - Ícones SVG modernos
  - *Por quê?* Tree-shakeable, consistentes, customizáveis
  - *Alternativas:* FontAwesome (bundle maior), Hero Icons (menos variedade)

#### HTTP Client
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client
  - *Por quê?* Interceptors para auth token, error handling centralizado
  - *Configuração:* Base URL, timeout, retry logic

### DevOps & Tooling

#### Containerização
- **[Docker](https://www.docker.com/)** + **[Docker Compose](https://docs.docker.com/compose/)** - Ambientes isolados
  - *Por quê?* Paridade dev/prod, setup simplificado
  - *Compose:* PostgreSQL + Backend em containers orquestrados

#### Linting & Formatting
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
  - *Por quê?* Consistência de código, catch de erros comuns
  - *Configuração:* Regras Next.js + TypeScript strict

#### Package Manager
- **[npm](https://www.npmjs.com/)** - Gerenciador de pacotes
  - *Alternativas:* yarn (similar), pnpm (mais eficiente)
  - *Escolha:* npm pela compatibilidade universal

### Diagrama de Dependências

```
┌─────────────────────────────────────────┐
│         APPLICATION LAYER               │
│  Next.js (UI) ←→ NestJS (API)           │
└────────┬────────────────────┬───────────┘
         │                    │
    ┌────▼────┐         ┌─────▼──────┐
    │ React   │         │  Express   │
    │ Query   │         │  (interno) │
    └────┬────┘         └─────┬──────┘
         │                    │
    ┌────▼────┐         ┌─────▼──────┐
    │  Axios  │────────▶│  Passport  │
    └─────────┘  HTTP   │    JWT     │
                        └─────┬──────┘
                              │
                        ┌─────▼──────┐
                        │   Prisma   │
                        │    ORM     │
                        └─────┬──────┘
                              │
                        ┌─────▼──────┐
                        │ PostgreSQL │
                        └────────────┘
```

## ✨ Funcionalidades

### Autenticação
- ✅ Cadastro de novos usuários
- ✅ Login com email e senha
- ✅ Proteção de rotas com JWT
- ✅ Validação de dados com feedback em tempo real

### Gerenciamento de Tarefas
- ✅ Criar tarefas com título, descrição e prioridade
- ✅ Editar tarefas existentes
- ✅ Excluir tarefas com confirmação
- ✅ Marcar tarefas como concluídas/pendentes
- ✅ Filtrar tarefas (todas, pendentes, concluídas)
- ✅ Ordenar por data ou prioridade
- ✅ Buscar tarefas por título ou descrição
- ✅ Dashboard com estatísticas

### Interface
- ✅ Design moderno e intuitivo
- ✅ Animações suaves
- ✅ Modais personalizadas
- ✅ Feedback visual de ações
- ✅ Página 404 personalizada
- ✅ Loading states
- ✅ Tratamento de erros

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte ambiente configurado:

### Obrigatórios

#### 1. **Node.js** (versão 18.x ou superior)
- **Por quê?** Next.js 15 e NestJS 10 requerem Node 18+ para features ES2022
- **Verificar instalação:**
  ```bash
  node --version  # deve retornar v18.x.x ou superior
  ```
- **Instalar:** 
  - macOS: `brew install node` ou [nvm](https://github.com/nvm-sh/nvm)
  - Windows: [nodejs.org](https://nodejs.org/)
  - Linux: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`

#### 2. **npm** (vem com Node.js) ou **yarn**
- **Verificar:**
  ```bash
  npm --version   # deve retornar 9.x.x ou superior
  ```
- **Alternativa:** yarn (`npm install -g yarn`)

#### 3. **PostgreSQL 15+** (ou Docker)
- **Opção 1 - PostgreSQL nativo:**
  - macOS: `brew install postgresql@15`
  - Linux: `sudo apt-get install postgresql-15`
  - Windows: [Instalador oficial](https://www.postgresql.org/download/windows/)
  
- **Opção 2 - Docker (Recomendado):**
  - Mais simples, isolado, sem conflitos de versão
  - Requer: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  
- **Verificar:**
  ```bash
  psql --version  # PostgreSQL 15.x ou superior
  # OU
  docker --version  # Docker 20.x ou superior
  ```

#### 4. **Git**
- **Verificar:**
  ```bash
  git --version  # 2.x ou superior
  ```
- **Instalar:** `brew install git` (macOS) ou [git-scm.com](https://git-scm.com/)

### Opcionais (mas recomendados)

#### 5. **Prisma CLI Global** (opcional)
```bash
npm install -g prisma
```
- Facilita comandos como `prisma studio` de qualquer pasta

#### 6. **IDE / Editor**
- **VS Code** (recomendado) com extensões:
  - [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

#### 7. **Postman / Insomnia** (para testar API)
- Alternativa: usar Swagger UI em `http://localhost:4000/api/docs`

---

## 🔧 Instalação Completa

### Instalação com Docker (Recomendado)

Docker simplifica o setup isolando o banco de dados e potencialmente o backend.

#### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd todo-app
```

#### 2. Configure o Backend

```bash
cd backend
```

**Crie o arquivo `.env`:**

```bash
cat > .env << EOF
# Database (Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db?schema=public"

# JWT Configuration
JWT_SECRET="seu_jwt_secret_super_seguro_aqui_com_no_minimo_32_caracteres"
JWT_EXPIRES_IN="7d"

# Server
PORT=4000
NODE_ENV=development

# CORS (Frontend URL)
FRONTEND_URL="http://localhost:3000"
EOF
```

**⚠️ IMPORTANTE - JWT_SECRET:**
- Em produção, use um secret forte gerado aleatoriamente
- Comando para gerar: `openssl rand -base64 32`
- Nunca commite esse arquivo no Git (já está no `.gitignore`)

**Instale as dependências:**

```bash
npm install
```

**Inicie o PostgreSQL com Docker Compose:**

```bash
docker-compose up -d
```

Isso irá:
- Baixar a imagem do PostgreSQL 15
- Criar um container chamado `todo-postgres`
- Expor a porta `5432`
- Persistir dados em um volume Docker

**Verificar se o container está rodando:**

```bash
docker ps
# Deve mostrar: todo-postgres rodando na porta 5432
```

**Execute as migrations do Prisma:**

```bash
npx prisma migrate dev --name init
```

Isso irá:
- Criar o banco de dados `todo_db`
- Aplicar todas as migrations (criar tabelas User e Task)
- Gerar o Prisma Client TypeScript

**Verificar o banco com Prisma Studio (opcional):**

```bash
npx prisma studio
```

Abre interface visual em `http://localhost:5555` para explorar dados.

#### 3. Configure o Frontend

```bash
cd ../frontend
```

**Crie o arquivo `.env.local`:**

```bash
cat > .env.local << EOF
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api
EOF
```

**⚠️ NEXT_PUBLIC_ prefix:**
- Necessário para variáveis expostas ao browser
- Sem esse prefix, a variável só existe no servidor Next.js

**Instale as dependências:**

```bash
npm install
```

#### 4. Inicie os servidores

**Terminal 1 - Backend:**

```bash
cd backend
npm run start:dev
```

Aguarde até ver:
```
[Nest] INFO  Application is running on: http://localhost:4000
[Nest] INFO  Swagger documentation available at: http://localhost:4000/api/docs
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Aguarde até ver:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

**✅ Pronto!** Acesse:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:4000/api
- **Swagger Docs:** http://localhost:4000/api/docs
- **Prisma Studio:** http://localhost:5555

---

### Instalação Manual (Sem Docker)

Se preferir instalar PostgreSQL nativamente.

#### 1. Clone e entre no repositório

```bash
git clone <url-do-repositorio>
cd todo-app
```

#### 2. Configure PostgreSQL nativo

**Inicie o serviço PostgreSQL:**

```bash
# macOS (Homebrew)
brew services start postgresql@15

# Linux (systemd)
sudo systemctl start postgresql

# Windows
# Iniciar via pgAdmin ou Services
```

**Crie o banco de dados:**

```bash
# Conecte como superuser
psql postgres

# No prompt psql, execute:
CREATE DATABASE todo_db;
CREATE USER todouser WITH ENCRYPTED PASSWORD 'todopass';
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todouser;
\q
```

**Alternativa com usuário postgres padrão:**

```bash
createdb todo_db
```

#### 3. Configure o Backend

```bash
cd backend
npm install
```

**Crie o arquivo `.env`:**

```env
# Database (Ajuste user/password se criou usuário custom)
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/todo_db?schema=public"

# JWT
JWT_SECRET="seu_jwt_secret_super_seguro_aqui_com_no_minimo_32_caracteres"
JWT_EXPIRES_IN="7d"

# Server
PORT=4000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:3000"
```

**Execute as migrations:**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### 4. Configure o Frontend

```bash
cd ../frontend
npm install
```

**Crie `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

#### 5. Inicie os servidores

**Terminal 1 - Backend:**

```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

---

## ⚙️ Configuração de Ambiente

### Variáveis de Ambiente - Explicação Detalhada

#### Backend (`backend/.env`)

| Variável | Descrição | Exemplo | Obrigatória |
|----------|-----------|---------|-------------|
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://user:pass@host:5432/db` | ✅ |
| `JWT_SECRET` | Secret para assinar tokens JWT | `openssl rand -base64 32` | ✅ |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d`, `24h`, `3600s` | ❌ (default: 7d) |
| `PORT` | Porta do servidor | `4000` | ❌ (default: 3000) |
| `NODE_ENV` | Ambiente de execução | `development`, `production` | ❌ (default: development) |
| `FRONTEND_URL` | URL do frontend para CORS | `http://localhost:3000` | ❌ (default: *) |

**DATABASE_URL - Anatomia:**
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?schema=public
          └─┬─┘ └────┬────┘ └──┬──┘└─┬─┘ └───┬───┘  └─────┬────┘
            │        │         │     │       │            │
         usuário  senha     host   porta   nome      schema
```

**JWT_SECRET - Boas Práticas:**
- Mínimo 32 caracteres
- Gerado aleatoriamente: `openssl rand -base64 32`
- Diferente para cada ambiente (dev, staging, prod)
- NUNCA commitar no Git

**JWT_EXPIRES_IN - Formato:**
- `60` = 60 milissegundos
- `60s` = 60 segundos
- `5m` = 5 minutos
- `2h` = 2 horas
- `7d` = 7 dias

#### Frontend (`frontend/.env.local`)

| Variável | Descrição | Exemplo | Obrigatória |
|----------|-----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | URL base da API backend | `http://localhost:4000/api` | ✅ |

**NEXT_PUBLIC_ Prefix:**
- Variáveis com esse prefix são expostas ao browser
- Podem ser acessadas em componentes client com `process.env.NEXT_PUBLIC_API_URL`
- Variáveis SEM o prefix só existem no servidor Next.js

**⚠️ Segurança:**
- Nunca coloque secrets (API keys, passwords) em variáveis `NEXT_PUBLIC_`
- Elas são incluídas no bundle JavaScript enviado ao cliente

### Arquivo de Exemplo

**Backend - `.env.example` (commitar no Git):**

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db?schema=public"
JWT_SECRET="your-super-secret-key-here-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=4000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

**Frontend - `.env.local.example`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**Setup rápido:**
```bash
# Backend
cd backend
cp .env.example .env
# Editar .env e mudar JWT_SECRET

# Frontend
cd frontend
cp .env.local.example .env.local
```

## 🚀 Como Executar

### Modo Desenvolvimento (Padrão)

#### Usando Docker Compose (Recomendado)

**1. Inicie todos os serviços:**

```bash
# Na raiz do projeto backend
cd backend

# Inicia PostgreSQL em background
docker-compose up -d

# Verificar logs (opcional)
docker-compose logs -f
```

**Comandos úteis do Docker Compose:**

```bash
# Ver status dos containers
docker-compose ps

# Parar containers
docker-compose stop

# Parar e remover containers (mantém dados)
docker-compose down

# Parar e remover TUDO (apaga dados do banco)
docker-compose down -v

# Reiniciar serviços
docker-compose restart

# Ver logs em tempo real
docker-compose logs -f postgres
```

**2. Inicie o Backend (Terminal 1):**

```bash
cd backend
npm run start:dev
```

**O que acontece:**
- NestJS inicia em modo watch (hot reload)
- Cada mudança nos arquivos `.ts` recompila automaticamente
- Swagger UI disponível em `/api/docs`
- Porta padrão: `4000`

**Logs esperados:**
```
[Nest] INFO  [NestFactory] Starting Nest application...
[Nest] INFO  [InstanceLoader] PrismaModule dependencies initialized
[Nest] INFO  [InstanceLoader] AuthModule dependencies initialized
[Nest] INFO  [InstanceLoader] TasksModule dependencies initialized
[Nest] INFO  [RoutesResolver] AuthController {/api/auth}:
[Nest] INFO  [RouterExplorer] Mapped {/api/auth/signup, POST} route
[Nest] INFO  [RouterExplorer] Mapped {/api/auth/login, POST} route
[Nest] INFO  [RoutesResolver] TasksController {/api/tasks}:
[Nest] INFO  [RouterExplorer] Mapped {/api/tasks, GET} route
[Nest] INFO  [RouterExplorer] Mapped {/api/tasks, POST} route
[Nest] INFO  [NestApplication] Nest application successfully started
[Nest] INFO  Application is running on: http://localhost:4000
```

**Troubleshooting Backend:**

- **Erro "port 4000 already in use":**
  ```bash
  # Encontrar processo usando a porta
  lsof -ti:4000
  
  # Matar processo
  kill -9 $(lsof -ti:4000)
  
  # OU mudar porta no .env
  PORT=4001
  ```

- **Erro "Can't reach database server":**
  ```bash
  # Verificar se PostgreSQL está rodando
  docker ps | grep postgres
  
  # Reiniciar container
  docker-compose restart postgres
  
  # Verificar logs
  docker-compose logs postgres
  ```

- **Erro de migration:**
  ```bash
  # Resetar banco (APAGA TUDO)
  npx prisma migrate reset
  
  # Aplicar migrations novamente
  npx prisma migrate dev
  ```

**3. Inicie o Frontend (Terminal 2):**

```bash
cd frontend
npm run dev
```

**O que acontece:**
- Next.js inicia em modo desenvolvimento
- Fast Refresh habilitado (hot reload sem perder estado)
- Porta padrão: `3000`

**Logs esperados:**
```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.5s
 ○ Compiling / ...
 ✓ Compiled / in 1.2s
```

**Troubleshooting Frontend:**

- **Erro "port 3000 already in use":**
  ```bash
  kill -9 $(lsof -ti:3000)
  
  # OU iniciar em outra porta
  PORT=3001 npm run dev
  ```

- **Erro "Failed to fetch" nas chamadas API:**
  - Verificar se backend está rodando em `http://localhost:4000`
  - Verificar `NEXT_PUBLIC_API_URL` no `.env.local`
  - Abrir DevTools → Network para ver request falhando

- **TypeScript errors:**
  ```bash
  # Limpar cache e reinstalar
  rm -rf .next node_modules
  npm install
  npm run dev
  ```

---

### Modo Produção

#### Backend - Build e Deploy

```bash
cd backend

# 1. Build da aplicação
npm run build

# Isso compila TypeScript → JavaScript em /dist
# Otimizações de produção aplicadas

# 2. Executar em produção
npm run start:prod

# OU com PM2 (process manager)
npm install -g pm2
pm2 start dist/main.js --name todo-api
pm2 logs todo-api
pm2 restart todo-api
```

**Variáveis de ambiente para produção:**

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@prod-host:5432/todo_db"
JWT_SECRET="PRODUCTION_SECRET_MUITO_FORTE_E_ALEATORIO"
PORT=4000
FRONTEND_URL="https://seu-dominio.com"
```

**Considerações de produção:**
- ✅ Use PostgreSQL gerenciado (RDS, Supabase, Railway)
- ✅ JWT_SECRET diferente e forte
- ✅ CORS configurado com domínio específico
- ✅ HTTPS obrigatório
- ✅ Rate limiting habilitado
- ✅ Logs estruturados (Winston, Pino)
- ✅ Health checks configurados

#### Frontend - Build e Deploy

```bash
cd frontend

# 1. Build estático otimizado
npm run build

# Isso gera:
# - Bundle JavaScript minificado
# - HTML estático pre-renderizado
# - Otimização de imagens
# - Tree-shaking de código não usado

# 2. Testar build localmente
npm run start

# Servidor produção local na porta 3000
```

**Análise do bundle:**

```bash
# Analisar tamanho do bundle
npm run build

# Saída mostra:
# Route (app)              Size      First Load JS
# ┌ ○ /                    1.2 kB         85.3 kB
# ├ ○ /dashboard           15.4 kB        99.5 kB
# └ ○ /login               8.7 kB         92.8 kB
```

**Deploy recomendado:**
- **Vercel** (recomendado para Next.js):
  ```bash
  npm install -g vercel
  vercel
  ```
  - Deploy automático do Git
  - Edge functions globais
  - Preview deployments para PRs

- **Netlify:**
  ```bash
  npm install -g netlify-cli
  netlify deploy --prod
  ```

- **Docker:**
  ```dockerfile
  # frontend/Dockerfile
  FROM node:18-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build

  FROM node:18-alpine
  WORKDIR /app
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/package*.json ./
  RUN npm ci --only=production
  EXPOSE 3000
  CMD ["npm", "start"]
  ```

**Variáveis de ambiente para produção:**

```env
NEXT_PUBLIC_API_URL=https://api.seu-dominio.com/api
NODE_ENV=production
```

---

### Docker Compose Full Stack (Avançado)

Para rodar frontend + backend + banco em containers:

**Criar `docker-compose.yml` na raiz do projeto:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: todo-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: todo_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: todo-backend
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/todo_db"
      JWT_SECRET: "your-production-secret-here"
      PORT: 4000
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run start:dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: todo-frontend
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:4000/api
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev

volumes:
  postgres_data:
```

**Executar:**

```bash
# Na raiz do projeto
docker-compose up

# Em background
docker-compose up -d

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Parar tudo
docker-compose down
```

---

### URLs e Endpoints Importantes

Após iniciar os servidores, você tem acesso a:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:3000 | Interface do usuário |
| **Landing Page** | http://localhost:3000/ | Página inicial pública |
| **Login** | http://localhost:3000/login | Autenticação de usuários |
| **Register** | http://localhost:3000/register | Cadastro de novos usuários |
| **Dashboard** | http://localhost:3000/dashboard | Painel principal (autenticado) |
| **Backend API** | http://localhost:4000/api | Base URL da API REST |
| **Swagger Docs** | http://localhost:4000/api/docs | Documentação interativa da API |
| **Health Check** | http://localhost:4000/api/health | Status da aplicação |
| **Prisma Studio** | http://localhost:5555 | Interface visual do banco |

**Testar API com curl:**

```bash
# 1. Criar usuário
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'

# 2. Login (retorna JWT token)
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Copie o "access_token" da resposta

# 3. Criar task (autenticado)
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"title":"Minha primeira task","priority":"HIGH"}'

# 4. Listar tasks
curl http://localhost:4000/api/tasks \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

### Scripts Disponíveis

#### Backend (`backend/package.json`)

```bash
# Desenvolvimento
npm run start          # Inicia sem watch
npm run start:dev      # Inicia com hot reload (recomendado)
npm run start:debug    # Inicia com debugger (porta 9229)

# Build e Produção
npm run build          # Compila TypeScript → JavaScript
npm run start:prod     # Executa versão compilada

# Prisma
npm run prisma:studio  # Abre Prisma Studio
npm run prisma:migrate # Cria nova migration
npm run prisma:generate # Gera Prisma Client
npm run prisma:reset   # Reset banco (CUIDADO: apaga tudo)

# Testes
npm run test           # Testes unitários
npm run test:watch     # Testes em watch mode
npm run test:cov       # Testes com coverage
npm run test:e2e       # Testes end-to-end

# Lint
npm run lint           # ESLint check
npm run format         # Prettier format
```

#### Frontend (`frontend/package.json`)

```bash
# Desenvolvimento
npm run dev            # Inicia Next.js dev server

# Build e Produção
npm run build          # Build otimizado para produção
npm run start          # Inicia servidor produção
npm run export         # Gera static export (sem SSR)

# Lint
npm run lint           # Next.js + ESLint check
npm run lint:fix       # Fix automático

# Type Check
npm run type-check     # TypeScript check sem emitir arquivos
```

**Scripts úteis customizados:**

```bash
# Backend - Seed database (criar dados de teste)
npm run seed

# Backend - Reset completo
npm run prisma:reset && npm run seed

# Frontend - Limpar cache
rm -rf .next && npm run dev
```

## 📁 Estrutura do Projeto Detalhada

### Visão Geral

```
todo-app/
├── backend/              # API NestJS
├── frontend/             # UI Next.js
└── README.md             # Este arquivo
```

---

### Backend - Arquitetura em Camadas

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20251107045555_init/
│           └── migration.sql
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   │
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── signup.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── decorators/
│   │       └── current-user.decorator.ts
│   │
│   ├── tasks/
│   │   ├── tasks.module.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── dto/
│   │       ├── create-task.dto.ts
│   │       └── update-task.dto.ts
│   │
│   └── prisma/
│       ├── prisma.module.ts
│       └── prisma.service.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── start.sh                        # 🚀 Script automatizado de inicialização
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── eslint.config.mjs
├── prisma.config.ts
└── package.json
```

---

### Frontend - Feature-Based Structure

```
frontend/
├── public/
│   ├── figure_01.png
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   │
│   │   ├── login/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── register/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── index.ts
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ConfirmModal.tsx
│   │   │   ├── MiniChart.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CirclePattern.tsx
│   │   │   └── WavePattern.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   │
│   │   ├── tasks/
│   │   │   ├── index.ts
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskForm.tsx
│   │   │
│   │   └── dashboard/
│   │       └── StatCard.tsx
│   │
│   ├── hooks/
│   │   ├── useAuthQueries.ts
│   │   ├── useTaskQueries.ts
│   │   └── usePageTitle.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── taskService.ts
│   │
│   ├── providers/
│   │   └── ReactQueryProvider.tsx
│   │
│   ├── validations/
│   │   ├── loginSchema.ts
│   │   ├── registerSchema.ts
│   │   └── taskSchema.ts
│   │
│   ├── utils/
│   │   └── auth.ts
│   │
│   └── middleware.ts
│
├── .env.local
├── .env.local.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── next.config.ts
├── next-env.d.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── package.json
```

## 📚 API Documentation

A API está documentada com Swagger e pode ser acessada em:

```
http://localhost:4000/api/docs
```

### Principais Endpoints

#### Autenticação
- `POST /api/auth/signup` - Cadastrar usuário
- `POST /api/auth/login` - Login

#### Tarefas (Requer autenticação)
- `GET /api/tasks` - Listar todas as tarefas do usuário
- `GET /api/tasks/:id` - Buscar tarefa por ID
- `POST /api/tasks` - Criar nova tarefa
- `PATCH /api/tasks/:id` - Atualizar tarefa
- `PATCH /api/tasks/:id/toggle` - Alternar status de conclusão
- `DELETE /api/tasks/:id` - Excluir tarefa

## 🛠️ Scripts Disponíveis

### Backend

```bash
npm run start:dev      # Inicia em modo desenvolvimento
npm run build          # Build para produção
npm run start:prod     # Inicia em modo produção
npm run prisma:studio  # Abre Prisma Studio
npm run prisma:migrate # Cria nova migration
```

### Frontend

```bash
npm run dev            # Inicia em modo desenvolvimento
npm run build          # Build para produção
npm run start          # Inicia em modo produção
npm run lint           # Executa linter
```

## 🔐 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Autenticação JWT
- ✅ Proteção de rotas no frontend e backend
- ✅ Validação de dados em ambas as pontas
- ✅ CORS configurado
- ✅ Sanitização de inputs

## 🎨 Design

O design da aplicação segue princípios modernos:
- Paleta de cores violeta/roxo
- Glassmorphism
- Animações suaves
- Feedback visual claro
- Interface intuitiva


## 👨‍💻 Autor

Desenvolvido por Alice Ramalho

---

⭐ **Dica**: Para testar rapidamente, você pode criar um usuário de teste e começar a criar suas tarefas!

📧 **Suporte**: Em caso de dúvidas, consulte a documentação do Swagger.
