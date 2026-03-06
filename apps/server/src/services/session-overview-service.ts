import type { OpenCodeClient, RawSessionListItem } from '../opencode/client';
import type { SessionOverviewResult, SessionRecord, SessionStatus } from '../types/session';

const DEFAULT_LIMIT = 10;

export class SessionOverviewService {
  public constructor(private readonly client: OpenCodeClient) {}

  public async getOverview(limit = DEFAULT_LIMIT): Promise<SessionOverviewResult> {
    const sessions = await this.client.fetchLatestSessions(limit);
    const statuses = await this.safeFetchStatuses();

    const merged = sessions.map((session) => this.mergeStatus(session, statuses));

    return {
      sessions: merged,
      refreshedAt: new Date().toISOString()
    };
  }

  private async safeFetchStatuses(): Promise<Map<string, SessionStatus>> {
    try {
      return await this.client.fetchStatuses();
    } catch {
      return new Map<string, SessionStatus>();
    }
  }

  private mergeStatus(
    session: RawSessionListItem,
    statuses: Map<string, SessionStatus>
  ): SessionRecord {
    return {
      ...session,
      status: statuses.get(session.id) ?? 'unknown'
    };
  }
}
