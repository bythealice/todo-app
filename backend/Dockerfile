# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Set a dummy DATABASE_URL for build time
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma schema and migrations
COPY --from=builder /app/prisma ./prisma

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]

