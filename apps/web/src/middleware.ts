import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Optional: Protect API and trpc routes
    '/api/:path*',
    '/trpc/:path*',
  ],
};
