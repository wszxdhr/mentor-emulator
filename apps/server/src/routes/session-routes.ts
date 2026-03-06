import Router from '@koa/router';
import type { SessionOverviewService } from '../services/session-overview-service';
import type { ErrorPayload } from '../types/session';

export function createSessionRoutes(service: SessionOverviewService): Router {
  const router = new Router({
    prefix: '/api/sessions'
  });

  router.get('/overview', async (ctx) => {
    try {
      const overview = await service.getOverview();
      ctx.status = 200;
      ctx.body = {
        data: overview,
        error: null
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown OpenCode gateway error';
      const body: ErrorPayload = {
        data: null,
        error: {
          code: 'OPENCODE_GATEWAY_ERROR',
          message
        }
      };
      ctx.status = 502;
      ctx.body = body;
    }
  });

  return router;
}
