# syntax=docker/dockerfile:1.7

############################
# Builder
############################
FROM node:22-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# Copy manifests first for cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Copy the rest of the source
COPY . .

# Build the API
RUN pnpm --filter api build

############################
# Runtime
############################
FROM node:22-alpine

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# Copy manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

# Install only production deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --filter api...

# Copy built app
COPY --from=builder /app/apps/api/build ./apps/api/build

# Optional: copy any runtime assets if needed
# COPY --from=builder /app/apps/api/static ./apps/api/static

WORKDIR /app/apps/api

EXPOSE 8080

CMD ["node", "build"]