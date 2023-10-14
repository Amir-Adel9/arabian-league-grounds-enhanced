import { authMiddleware } from '@clerk/nextjs';

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
    '/profile',
    '/about',
    '/match/:matchId',
    '/teams/:slug',
    '/profile/:id',
    '/api/webhooks/user',
    '/api/schedule/upcoming-events',
    '/api/schedule/full-schedule',
  ],
  // apiRoutes: ['/api', '/api/webhooks/user'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
