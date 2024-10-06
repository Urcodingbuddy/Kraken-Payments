// app/_middleware.ts

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:any) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // Redirect authenticated users to /home if they try to access /
    if (token && pathname === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    // If the user is not authenticated and tries to access a protected route
    if (!token && pathname === "/home") {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // Allow access for unauthorized users to the home page and auth routes
    if (!token || pathname === "/" || pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    // Allow access for authenticated users to other routes
    return NextResponse.next();
}
