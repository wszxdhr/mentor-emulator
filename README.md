# Mentor Emulator

A minimal TypeScript monorepo that boots a React + Vite frontend and a Koa backend for OpenCode session overview.

## Prerequisites

- Node.js 20+
- Yarn 4+
- Reachable OpenCode service (default `http://127.0.0.1:4096`)

## Install

```bash
yarn install
```

## Run in development

```bash
yarn dev
```

- Web app: `http://localhost:5173`
- API server: `http://localhost:8787`

The frontend proxies `/api/*` to backend via Vite dev proxy.

## Environment variables

Server-side options:

- `PORT` (default `8787`)
- `OPENCODE_BASE_URL` (default `http://127.0.0.1:4096`)
- `OPENCODE_SESSION_LIST_PATH` (default `/session/list`)
- `OPENCODE_SESSION_STATUS_PATH` (default `/session/status`)

Frontend dev proxy target:

- `VITE_API_TARGET` (default `http://localhost:8787`)

## Scripts

- `yarn dev` – start web + server concurrently
- `yarn build` – build server then web
- `yarn lint` – run ESLint across workspace
- `yarn format` – run Prettier across workspace
