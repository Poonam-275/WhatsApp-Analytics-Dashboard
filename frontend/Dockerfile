# Frontend Dockerfile
FROM node:20-alpine AS deps
WORKDIR /repo
COPY package.json tsconfig.base.json ./
COPY shared/package.json ./shared/package.json
COPY frontend/package.json frontend/tsconfig.json frontend/vite.config.ts frontend/index.html ./frontend/
RUN npm ci --ignore-scripts || npm install

FROM node:20-alpine AS build
WORKDIR /repo
COPY --from=deps /repo/ /repo/
COPY frontend/src ./frontend/src
RUN npm run -w shared build && npm run -w frontend build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=build /repo/frontend/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
