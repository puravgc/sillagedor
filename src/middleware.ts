import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Admin route protection
  if (url.pathname.startsWith("/admin")) {
    if (!token || !token.isAdmin) {
      console.log("Redirecting non-admin user");
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Redirect unauthenticated users from /shop
  if (url.pathname.startsWith("/shop")) {
    if (!token) {
      console.log("Redirecting unauthenticated user from /shop");
      url.pathname = "/";
      url.searchParams.set("alert", "login");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
