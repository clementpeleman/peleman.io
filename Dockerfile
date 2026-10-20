# Productie-image voor Coolify. Vervangt Nixpacks, dat bij elke deploy minutenlang Node via Nix installeerde.

FROM node:22-alpine AS pakketten
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM node:22-alpine AS bouw
WORKDIR /app
# Alleen publieke waarden: Next bakt NEXT_PUBLIC_* tijdens de build in de browsercode.
# Geheimen (SMTP_PASS, TWENTY_API_KEY, ...) komen hier niet; die leest de server pas bij het draaien.
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=pakketten /app/node_modules ./node_modules
COPY . .
# De buildcache van Next blijft tussen deploys bewaard; zonder die cache doet de server er minuten over.
RUN --mount=type=cache,target=/app/.next/cache npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=bouw --chown=node:node /app/.next/standalone ./
COPY --from=bouw --chown=node:node /app/.next/static ./.next/static
COPY --from=bouw --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
