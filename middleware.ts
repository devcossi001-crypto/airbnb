import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/auth";

// Protected routes
const protectedRoutes = ["/book", "/dashboard"];

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    if (isProtectedRoute) {
        const sessionCookie = req.cookies.get("session")?.value;

        if (!sessionCookie) {
            // Not logged in, redirect to login
            const url = new URL("/login", req.url);
            url.searchParams.set("from", path);
            return NextResponse.redirect(url);
        }

        try {
            await decrypt(sessionCookie);
        } catch (err) {
            // Invalid session, redirect to login
            const url = new URL("/login", req.url);
            url.searchParams.set("from", path);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
