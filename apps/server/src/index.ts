import Koa from 'koa';
import { readServerEnv } from './config/env';
import { OpenCodeClient } from './opencode/client';
import { createSessionRoutes } from './routes/session-routes';
import { SessionOverviewService } from './services/session-overview-service';

const env = readServerEnv();

const app = new Koa();
const client = new OpenCodeClient(env);
const service = new SessionOverviewService(client);
const routes = createSessionRoutes(service);

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  }

  await next();
});
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(env.port, () => {
  console.log(`mentor-emulator server listening on :${env.port}`);
});
