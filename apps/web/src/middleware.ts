import { auth } from "@/lib/auth.edge";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  // Protected routes
  if (pathname.startsWith("/landlord") || pathname.startsWith("/boarder")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Auth routes - redirect if already logged in
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (isLoggedIn) {
      const role = req.auth?.user?.role as string;
      const redirectUrl = role === "LANDLORD" ? "/landlord" : "/boarder";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
