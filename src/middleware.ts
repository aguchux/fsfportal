import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  const token   = request.cookies.get('token')?.value!;
  const pathname = request.nextUrl.pathname;
  const hasToken = Boolean(token);
  if (pathname.startsWith('/auth') && hasToken) {
    return NextResponse.redirect(new URL('/online', request.url))
  }
  if (pathname.startsWith('/online') && !hasToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/online/:path*','/online', '/auth', '/auth/:path*'],
}