FROM node:22-alpine AS runtime

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --prod --filter api...

COPY --from=builder /app/apps/api/build ./apps/api/build

WORKDIR /app/apps/api

EXPOSE 8080

CMD ["node", "build"]