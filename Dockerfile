# syntax=docker/dockerfile:1.7

############################
# Base
############################
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

############################
# Dependencies
############################
FROM base AS deps

# Copy only dependency manifests first for maximum cache reuse
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile

############################
# Build
############################
FROM deps AS builder

COPY . .

RUN pnpm --filter @scouthub27/shared build
RUN pnpm --filter api build

# Remove dev dependencies
RUN pnpm deploy --filter api --prod /prod

############################
# Runtime
############################
FROM node:22-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

RUN addgroup -S scouthub \
 && adduser -S scouthub -G scouthub

COPY --from=builder /prod ./

USER scouthub

EXPOSE 8080

CMD ["node", "build"]