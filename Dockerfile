# 1. Base image
FROM node:20-alpine AS base

# 2. Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Builder
FROM base AS builder
WORKDIR /app

# bring node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build-time args for public variables that must be baked into client bundle
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG DATABASE_URL

# fail build early if essential build args are missing
RUN if [ -z "$NEXT_PUBLIC_GOOGLE_CLIENT_ID" ]; then echo "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID build-arg"; exit 1; fi

# Set build-time args as ENV so Next.js picks them up during `next build`
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV DATABASE_URL=$DATABASE_URL

# Disable telemetry and other envs you need during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate

# Build the project
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 4. Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permission for cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy only the necessary files from the builder stage
# "standalone" folder contains a minimal server.js and dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]