import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { type DefaultJWT, type JWT } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";
import { type NextRequest, type NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { fetcher } from "~/lib/fetcher";
import { db } from "./db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    id: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ account, token, user }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        username: token.username,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    newUser: "/new-user",
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export const getRSCToken = async () => {
  return await fetcher<JWT>(env.NEXTAUTH_URL + "/api/token");
};

export const withEnforceAuth = async (
  handler: (req: NextRequest, res?: NextResponse) => unknown
) => {
  const token = await getRSCToken();

  if (token) {
    return handler;
  }

  return new Response("UNAUTHORIZED", {
    status: 401,
  });
};
