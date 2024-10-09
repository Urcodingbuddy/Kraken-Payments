import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

let reqCount = 0;
export function middleware(request:NextRequest){
    reqCount++;
    console.log(`Request Count: ${reqCount}`);
    console.log(request.nextUrl.pathname);
    const sessionToken = request.cookies.get("next-auth.session-token");
    
    if (request.nextUrl.pathname.startsWith("/(dashboard)")) {
        if (!sessionToken) {
          return NextResponse.redirect(new URL("/auth/signin", request.url));
        }
      }
    return NextResponse.next();  
}

export const config = {
    matcher: [
      "/(dashboard)/:path*",      // Protect /dashboard and all its child routes
      "/api/:path*",             // Protect all API routes
        "/"
    ],
  };