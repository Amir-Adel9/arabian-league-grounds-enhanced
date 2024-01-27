import { authMiddleware } from '@clerk/nextjs';
import { fulfillUpdates } from './entities/actions';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/schedule',
    '/standings',
    '/teams',
    '/stats',
    '/fantasy',
    '/predictions',
    '/leaderboard',
    '/leaderboard/:type',
    '/profile',
    '/about',
    '/match/:matchId',
    '/teams/:slug',
    '/profile/:id',
    '/api/webhooks/user',
    '/api/schedule/upcoming-events',
    '/api/schedule/full-schedule',
    '/api/standings',
    '/api/match/prediction/retrieve',
    '/api/match/prediction/retrieve/:matchId',
  ],
  // apiRoutes: ['/api', '/api/webhooks/user'],
});
export async function middleware() {
  await fulfillUpdates();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
