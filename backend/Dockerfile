# Backend Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json tsconfig.json ./
COPY ../tsconfig.base.json /app/tsconfig.base.json
COPY src ./src
RUN npm ci || npm install
RUN npx tsc -p tsconfig.json

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/dist ./dist
COPY package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/main.js"]
