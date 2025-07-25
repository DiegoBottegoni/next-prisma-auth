import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  console.log("✅ middleware running on", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("🚫 No token found, redirecting...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token valid");
    return NextResponse.next();
  } catch (error) {
    console.log("❌ Invalid token", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

