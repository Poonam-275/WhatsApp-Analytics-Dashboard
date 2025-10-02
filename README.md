# WhatsApp Message Analytics Dashboard (Monorepo)

A monorepo containing a NestJS backend API, a React + Vite + MUI frontend, and a shared TypeScript package for types and utilities.

## Structure

- `backend`: NestJS API serving health and message stats
- `frontend`: React + Vite + MUI dashboard consuming the API
- `shared`: Shared TypeScript types and utilities

## Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm 9+
- Docker (optional, for containerized runs)

## Getting Started (Local)

1. Install dependencies at the root:

   ```bash
   npm install
   ```

2. Create `.env` from the template and update values:

   ```bash
   cp .env.example .env
   ```

3. Start backend and frontend in dev mode:

   ```bash
   npm run dev
   ```

   - Backend runs on `http://localhost:3000`
   - Frontend runs on `http://localhost:5173`

4. Build all packages:

   ```bash
   npm run build
   ```

## Environment Variables

See `.env.example` for available variables.

- `BACKEND_PORT`: Port for the backend (default `3000`)
- `BACKEND_LOG_LEVEL`: Log level for backend
- `WHATSAPP_API_BASE_URL`: Base URL to WhatsApp Graph API
- `WHATSAPP_API_TOKEN`: Token to access WhatsApp API
- `WHATSAPP_PHONE_NUMBER_ID`: Phone number ID for WhatsApp API
- `VITE_API_BASE_URL`: Frontend base URL for API (defaults to `http://localhost:3000` in dev)

## Docker

Build and run both services using Docker Compose:

```bash
docker compose up --build
```

- Backend available at `http://localhost:3000`
- Frontend available at `http://localhost:5173`

## Linting and Formatting

- Lint: `npm run lint`
- Format: `npm run format`

## Notes

- The backend exposes:
  - `GET /health` — Basic health endpoint
  - `GET /stats` — Returns sample message statistics using shared types
- The frontend displays a simple dashboard with totals and per-type/status counts.
