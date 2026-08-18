import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  
  const { pathname } = request.nextUrl;
  
  // Define paths that do not require authentication
  const publicPaths = [
    '/',
    '/about',
    '/contact',
    '/courses',
    '/login',
    '/register',
    '/verify-otp'
  ];

  // Check if current path starts with any of the public paths
  // Using exact match for '/' and startsWith for others to handle dynamic routes like /courses/1
  const isPublicPath = pathname === '/' || 
    publicPaths.some(path => path !== '/' && pathname.startsWith(path));

  // If the path is not public and there is no token, redirect to landing home page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Optionally: redirect authenticated users away from auth pages to dashboard
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/verify-otp');
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except API, static files, and images
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)'
  ],
};
