import { useEffect, useMemo, useState } from 'react';
import type { JSX } from 'react';
import { SessionList } from './components/SessionList';
import type {
  ApiErrorResponse,
  SessionOverviewItem,
  SessionOverviewResponse
} from './types/session';

interface ViewState {
  loading: boolean;
  sessions: SessionOverviewItem[];
  refreshedAt: string;
  error: string;
}

const INITIAL_STATE: ViewState = {
  loading: true,
  sessions: [],
  refreshedAt: '',
  error: ''
};

export default function App(): JSX.Element {
  const [state, setState] = useState<ViewState>(INITIAL_STATE);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      try {
        const response = await fetch('/api/sessions/overview', {
          signal: controller.signal
        });

        if (!response.ok) {
          const errorBody = (await response.json()) as ApiErrorResponse;
          throw new Error(errorBody.error?.message ?? `Request failed (${response.status})`);
        }

        const body = (await response.json()) as SessionOverviewResponse;
        setState({
          loading: false,
          sessions: body.data.sessions,
          refreshedAt: body.data.refreshedAt,
          error: ''
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        const message = error instanceof Error ? error.message : 'Unknown request error';
        setState({
          loading: false,
          sessions: [],
          refreshedAt: '',
          error: message
        });
      }
    };

    void load();
    return () => {
      controller.abort();
    };
  }, []);

  const content = useMemo(() => {
    if (state.loading) {
      return <p className="hint">Loading session telemetry...</p>;
    }

    if (state.error) {
      return (
        <div className="error-block" role="alert">
          <h2>Gateway Signal Lost</h2>
          <p>{state.error}</p>
        </div>
      );
    }

    if (state.sessions.length === 0) {
      return (
        <div className="empty-block">
          <h2>No Sessions Online</h2>
          <p>OpenCode currently has no session snapshot for this workspace.</p>
        </div>
      );
    }

    return <SessionList sessions={state.sessions} />;
  }, [state]);

  return (
    <main className="app-shell">
      <header className="app-shell__header">
        <p className="eyebrow">Mentor Emulator</p>
        <h1>Session Command Console</h1>
        <p className="subtitle">Latest 10 OpenCode sessions with live status badges.</p>
        {state.refreshedAt ? (
          <p className="hint">Refreshed: {new Date(state.refreshedAt).toLocaleString()}</p>
        ) : null}
      </header>
      {content}
    </main>
  );
}
