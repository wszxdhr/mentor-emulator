import type { SessionOverviewItem, SessionStatus } from '../types/session';
import type { JSX } from 'react';

interface SessionListProps {
  sessions: SessionOverviewItem[];
}

const STATUS_LABEL: Record<SessionStatus, string> = {
  idle: 'Idle',
  busy: 'Busy',
  retry: 'Retry',
  unknown: 'Unknown'
};

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function SessionList({ sessions }: SessionListProps): JSX.Element {
  return (
    <ul className="session-list">
      {sessions.map((session) => (
        <li key={session.id} className="session-card">
          <header className="session-card__header">
            <h2 className="session-card__title">{session.title}</h2>
            <span className={`status-badge status-badge--${session.status}`}>
              {STATUS_LABEL[session.status]}
            </span>
          </header>

          <dl className="session-card__meta">
            <div>
              <dt>ID</dt>
              <dd>{session.id}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatTime(session.updatedAt)}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{formatTime(session.createdAt)}</dd>
            </div>
            <div>
              <dt>Directory</dt>
              <dd>{session.directory || '-'}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
