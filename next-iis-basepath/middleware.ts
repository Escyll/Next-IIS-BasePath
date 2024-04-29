import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nextConfig from './next.config.mjs';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL(`${nextConfig.basePath}/login`, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}