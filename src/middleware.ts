import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/schedule',
    '/standings',
    '/match/:matchId',
    '/about',
    '/leaderboard',
    '/teams/:slug',
    '/stats',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
