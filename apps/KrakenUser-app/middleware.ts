
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define a secret to use with the JWT token
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    // Get the token (which contains the session)
    const token = await getToken({ req, secret });

    const { pathname } = req.nextUrl;

    // First, check if the user is logged in and trying to access the homepage ('/'), redirect them to '/home'
    if (!token && pathname === '/') {
        return NextResponse.next();
    }

    if (token && pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Allow access if token exists, or if the path is a public route (like sign-in or sign-up)
    if (token || pathname.startsWith('/auth')) {
        return NextResponse.next(); // Continue to the requested page
    }

    // If no token exists and the route is protected, redirect to sign-in
    return NextResponse.redirect(new URL('/auth/signin', req.url));
}

// Define the routes that should trigger this middleware
export const config = {
    matcher: ['/dashboard/:path*', '/home/:path*', '/'], // Protect these routes
};
