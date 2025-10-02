# Frontend Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json tsconfig.json vite.config.ts index.html ./
COPY src ./src
RUN npm ci || npm install
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=deps /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
