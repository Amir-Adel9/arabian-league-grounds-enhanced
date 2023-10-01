import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/schedule',
    '/standings',
    '/teams',
    '/stats',
    '/fantasy',
    '/predictions',
    '/leaderboard',
    '/profile',
    '/about',
    '/match/:matchId',
    '/teams/:slug',
    '/profile/:id',
    '/api/webhooks/user',
  ],
  // apiRoutes: ['/api', '/api/webhooks/user'],
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/api/webhooks/user',
  ],
};
