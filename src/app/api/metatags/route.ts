import { ipAddress } from "@vercel/edge";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";
import { ratelimit } from "~/lib/upstash";
import { LOCALHOST_IP, getMetaTags, isValidUrl } from "~/lib/utils";

export const runtime = "edge";

export type Metatags = Partial<{
  "og:title": string;
  "twitter:image": string;
  "twitter:title": string;
  "og:image": string;
  icon: string;
  "shortcut icon": string;
  image_src: string;
  content: string;
  description: string;
  property: string;
  rel: string;
  href: string;
}>;

export type MetatagsResponse = {
  title: string;
  description: string;
  image: string | null;
  from: string;
};

/**
 *
 * @note Special thanks to https://github.com/steven-tey (Steven Tey) for open sourcing https://dub.sh
 * that's where this piece of code was taken from, and then modified to fit my architecture.
 *
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || !isValidUrl(url)) {
    return new Response(JSON.stringify({ message: "Invalid URL" }), { status: 400 });
  }

  // Rate limit if user is not logged in
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session?.id) {
    const ip = ipAddress(req) || LOCALHOST_IP;
    const { success } = await ratelimit().limit(ip);

    if (!success) {
      return new Response("Don't DDoS me pls 🥺", { status: 429 });
    }
  }

  const metatags = await getMetaTags(url);

  return new Response(
    JSON.stringify({
      ...metatags,
      from: url,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
