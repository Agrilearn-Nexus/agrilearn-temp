# ---------- Base ----------
FROM node:20-alpine AS base

# ---------- Dependencies ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY prisma ./prisma

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------- Builder ----------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time public/server vars
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG DATABASE_URL
ARG R2_ENDPOINT
ARG R2_SECRET_ACCESS_KEY
ARG R2_BUCKET_NAME
ARG R2_PUBLIC_BASE_URL
ARG R2_ACCESS_KEY_ID

RUN if [ -z "$NEXT_PUBLIC_GOOGLE_CLIENT_ID" ]; then echo "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID"; exit 1; fi
RUN if [ -z "$DATABASE_URL" ]; then echo "Missing DATABASE_URL"; exit 1; fi
RUN if [ -z "$R2_ENDPOINT" ]; then echo "Missing R2_ENDPOINT"; exit 1; fi

ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV R2_ENDPOINT=$R2_ENDPOINT
ENV R2_PUBLIC_BASE_URL=$R2_PUBLIC_BASE_URL
ENV R2_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID
ENV R2_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY
ENV R2_BUCKET_NAME=$R2_BUCKET_NAME


RUN npx prisma generate

RUN npm run build

# ---------- Runner ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
