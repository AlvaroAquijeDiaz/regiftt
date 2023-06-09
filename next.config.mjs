/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import withRoutes from "nextjs-routes/config";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en", "es"],
  //   defaultLocale: "en",
  // },
  images: {
    domains: ["cdn.discordapp.com", "fastly.picsum.photos"],
  },
};
export default withRoutes({
  outDir: ".",
})(config);
