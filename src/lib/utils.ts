import parse from "node-html-parser";

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const LOCALHOST_IP = "10.100.59.164";

export const getDomainWithoutWWW = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, "");
  }
  try {
    if (url.includes(".") && !url.includes(" ")) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, "");
    }
  } catch (e) {
    return null;
  }
};

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

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

  return {
    title: title || url,
    description: description || "No description",
    image: getRelativeUrl(url, (image as string) || ""),
  };
};
