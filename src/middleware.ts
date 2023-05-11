import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env.mjs";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: env.NEXTAUTH_SECRET,
  });

  if (token && (token.exp as number) > Date.now() / 1000) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/home/:path*", "/my-wishes/:path*", "/api/:path*"],
};
