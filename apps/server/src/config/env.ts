const DEFAULT_PORT = 8787;

export interface ServerEnv {
  port: number;
  opencodeBaseUrl: string;
  opencodeSessionListPath: string;
  opencodeSessionStatusPath: string;
}

function getNumberEnv(raw: string | undefined, fallback: number): number {
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

function normalizePath(pathValue: string): string {
  return pathValue.startsWith('/') ? pathValue : `/${pathValue}`;
}

export function readServerEnv(): ServerEnv {
  const baseUrl = process.env.OPENCODE_BASE_URL ?? 'http://127.0.0.1:4096';

  return {
    port: getNumberEnv(process.env.PORT, DEFAULT_PORT),
    opencodeBaseUrl: baseUrl,
    opencodeSessionListPath: normalizePath(
      process.env.OPENCODE_SESSION_LIST_PATH ?? '/session/list'
    ),
    opencodeSessionStatusPath: normalizePath(
      process.env.OPENCODE_SESSION_STATUS_PATH ?? '/session/status'
    )
  };
}
