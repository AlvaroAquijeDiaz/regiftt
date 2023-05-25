import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import { env } from "~/env.mjs";

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

// Initiate Redis instance by connecting to REST URL
export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new rate limiter, that allows 10 requests per 10 seconds by default
export const ratelimit = (
  requests = 10,
  seconds: `${number} ms` | `${number} s` | `${number} m` | `${number} h` | `${number} d` = "10 s"
) => {
  return env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(requests, seconds),
        analytics: true,
      })
    : // if Redis is not configured, return a dummy ratelimiter
      // with the function limit() that always returns true
      {
        limit: () => ({ success: true }),
      };
};

/**
 * Recording metatags that were generated via `/api/edge/metatags`
 * If there's an error, it will be logged to a separate redis list for debugging
 **/
export async function recordMetatags(url: string, error: boolean) {
  if (url === "https://github.com/AlvaroAquijeDiaz/regiftt") {
    // don't log metatags generation for default URL
    return null;
  } else {
    return await redis.lpush(error ? "metatags-errors" : "metatags", {
      url,
    });
  }
}
