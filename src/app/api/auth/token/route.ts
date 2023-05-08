import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
      status: 401,
    });
  }

  return NextResponse.json(token);
}

export const runtime = "edge";
