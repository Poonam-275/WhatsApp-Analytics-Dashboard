# Backend Dockerfile
FROM node:20-alpine AS deps
WORKDIR /repo
COPY package.json tsconfig.base.json ./
COPY backend/package.json backend/tsconfig.json backend/ ./backend/
COPY shared/package.json ./shared/package.json
RUN npm ci --ignore-scripts || npm install

FROM node:20-alpine AS build
WORKDIR /repo
COPY --from=deps /repo/ /repo/
RUN npm run -w shared build && npm run -w backend build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /repo/backend/dist ./dist
COPY backend/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/main.js"]
