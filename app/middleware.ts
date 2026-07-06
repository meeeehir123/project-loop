import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Console log add karo ye check karne ke liye ki kya ye file hit ho rahi hai
  console.log("Middleware checking path:", request.nextUrl.pathname);

  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Agar user dashboard pe hai aur token nahi hai
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Saare dashboard routes match karega
  matcher: ['/dashboard/:path*'],
};