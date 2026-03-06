import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { ServerEnv } from '../config/env';
import type { SessionStatus } from '../types/session';

const execFileAsync = promisify(execFile);

interface SessionListApiItem {
  id?: string;
  sessionId?: string;
  title?: string;
  summary?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  directory?: string;
}

interface SessionListApiResponse {
  sessions?: SessionListApiItem[];
  data?: SessionListApiItem[];
}

interface CliSessionListItem {
  id?: string;
  title?: string;
  updated?: number;
  created?: number;
  directory?: string;
}

interface SessionStatusApiResponse {
  statuses?: Array<{
    sessionId?: string;
    id?: string;
    status?: string;
  }>;
  data?: Array<{
    sessionId?: string;
    id?: string;
    status?: string;
  }>;
}

export interface RawSessionListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  directory: string;
}

export class OpenCodeClient {
  public constructor(private readonly env: ServerEnv) {}

  public async fetchLatestSessions(limit: number): Promise<RawSessionListItem[]> {
    try {
      const url = new URL(this.env.opencodeSessionListPath, this.env.opencodeBaseUrl);
      url.searchParams.set('limit', String(limit));

      const payload = await this.request<SessionListApiResponse>(url.toString());
      const source = payload.sessions ?? payload.data ?? [];
      return normalizeApiSessions(source, limit);
    } catch {
      return this.fetchLatestSessionsFromCli(limit);
    }
  }

  public async fetchStatuses(): Promise<Map<string, SessionStatus>> {
    const url = new URL(this.env.opencodeSessionStatusPath, this.env.opencodeBaseUrl);
    const payload = await this.request<SessionStatusApiResponse>(url.toString());
    const source = payload.statuses ?? payload.data ?? [];

    return source.reduce<Map<string, SessionStatus>>((acc, item) => {
      const id = item.sessionId ?? item.id;
      if (!id) {
        return acc;
      }

      const normalized = normalizeStatus(item.status);
      acc.set(id, normalized);
      return acc;
    }, new Map<string, SessionStatus>());
  }

  private async request<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`OpenCode request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  private async fetchLatestSessionsFromCli(limit: number): Promise<RawSessionListItem[]> {
    const { stdout } = await execFileAsync('opencode', [
      'session',
      'list',
      '--format',
      'json',
      '--max-count',
      String(limit)
    ]);

    const parsed = JSON.parse(stdout) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => toRawSessionFromCli(item))
      .filter((item): item is RawSessionListItem => item !== null)
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      .slice(0, limit);
  }
}

function normalizeApiSessions(source: SessionListApiItem[], limit: number): RawSessionListItem[] {
  return source
    .map((item) => {
      const id = item.id ?? item.sessionId ?? '';
      if (!id) {
        return null;
      }

      return {
        id,
        title: item.title ?? item.summary ?? `Session ${id.slice(0, 8)}`,
        createdAt: item.createdAt ?? item.created_at ?? new Date(0).toISOString(),
        updatedAt: item.updatedAt ?? item.updated_at ?? new Date(0).toISOString(),
        directory: item.directory ?? ''
      };
    })
    .filter((item): item is RawSessionListItem => item !== null)
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, limit);
}

function toRawSessionFromCli(value: unknown): RawSessionListItem | null {
  if (!isCliSessionListItem(value)) {
    return null;
  }

  const id = value.id ?? '';
  if (!id) {
    return null;
  }

  return {
    id,
    title: value.title ?? `Session ${id.slice(0, 8)}`,
    createdAt: toIsoTimestamp(value.created),
    updatedAt: toIsoTimestamp(value.updated),
    directory: value.directory ?? ''
  };
}

function isCliSessionListItem(value: unknown): value is CliSessionListItem {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const hasId = typeof candidate.id === 'string';
  const hasUpdated = typeof candidate.updated === 'number';
  const hasCreated = typeof candidate.created === 'number';

  return hasId && hasUpdated && hasCreated;
}

function toIsoTimestamp(epochMs: number | undefined): string {
  if (typeof epochMs !== 'number' || Number.isNaN(epochMs)) {
    return new Date(0).toISOString();
  }

  return new Date(epochMs).toISOString();
}

function normalizeStatus(raw: string | undefined): SessionStatus {
  if (!raw) {
    return 'unknown';
  }

  const normalized = raw.toLowerCase();
  if (normalized === 'idle' || normalized === 'busy' || normalized === 'retry') {
    return normalized;
  }
  return 'unknown';
}
