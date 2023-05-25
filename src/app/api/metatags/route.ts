import { ipAddress } from "@vercel/edge";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { ratelimit, recordMetatags } from "~/lib/upstash";
import { LOCALHOST_IP, isValidUrl } from "~/lib/utils";

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

const getHtml = async (url: string) => {
  try {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 5000); // timeout if it takes longer than 5 seconds

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "regiftt-bot/1.0",
      },
    });

    clearTimeout(timeoutId);

    return await response.text();
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      // Handle fetch request abort (e.g., due to timeout)
      throw new Error("Fetch request aborted due to timeout.");
    }

    return null;
  }
};

const getHeadChildNodes = (html: string) => {
  const ast = parse(html); // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll("meta").map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href;
    return {
      property,
      content: attributes.content,
    };
  });
  const title = ast.querySelector("title")?.innerText;
  const linkTags = ast.querySelectorAll("link").map(({ attributes }) => {
    const { rel, href } = attributes;
    return {
      rel,
      href,
    };
  });

  return { metaTags, title, linkTags };
};

const getRelativeUrl = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null;
  }

  if (isValidUrl(imageUrl)) {
    return imageUrl;
  }

  const { protocol, host } = new URL(url);
  const baseURL = `${protocol}//${host}`;

  return new URL(imageUrl, baseURL).toString();
};

export const getMetaTags = async (url: string) => {
  const html = await getHtml(url);

  if (!html) {
    return {
      title: url,
      description: "No description",
      image: null,
    };
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html);

  const object = {} as Record<string, unknown>;

  metaTags.forEach((metaTag) => {
    const { property, content } = metaTag;

    property && (object[property] = content);
  });

  linkTags.forEach((linkTag) => {
    const { rel, href } = linkTag;

    rel && (object[rel] = href);
  });

  const title = object["og:title"] || object["twitter:title"] || titleTag;

  const description =
    object["description"] || object["og:description"] || object["twitter:description"];

  const image =
    object["og:image"] ||
    object["twitter:image"] ||
    object["image_src"] ||
    object["icon"] ||
    object["shortcut icon"];

  await recordMetatags(url, title && description && image ? false : true);

  return {
    title: title || url,
    description: description || "No description",
    image: getRelativeUrl(url, (image as string) || ""),
  };
};
