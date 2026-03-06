export type SessionStatus = 'idle' | 'busy' | 'retry' | 'unknown';

export interface SessionOverviewItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  directory: string;
  status: SessionStatus;
}

export interface SessionOverviewResponse {
  data: {
    sessions: SessionOverviewItem[];
    refreshedAt: string;
  };
  error: null;
}

export interface ApiErrorResponse {
  data: null;
  error: {
    code: string;
    message: string;
  };
}
