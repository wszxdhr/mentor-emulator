export type SessionStatus = 'idle' | 'busy' | 'retry' | 'unknown';

export interface SessionRecord {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  directory: string;
  status: SessionStatus;
}

export interface SessionStatusSnapshot {
  sessionId: string;
  status: SessionStatus;
}

export interface SessionOverviewResult {
  sessions: SessionRecord[];
  refreshedAt: string;
}

export interface ErrorPayload {
  data: null;
  error: {
    code: string;
    message: string;
  };
}
