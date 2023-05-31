import { getToken, type JWT } from "next-auth/jwt";
import { type NextRequest } from "next/server";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { type User } from "~/server/db.types";
import { editProfileSchema, type EditProfileSchema } from "~/ui/profile/profile.schemas";

export const GET = async (req: NextRequest) => {
  const session = await getToken({
    req,
    secret: env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await db.user.findFirstOrThrow({
    where: {
      id: session.id,
    },
  });

  return new Response(JSON.stringify(user), {
    status: 200,
  });
};

export async function POST(req: NextRequest) {
  try {
    const token = (await getToken({
      req,
      secret: env.NEXTAUTH_SECRET,
    })) as JWT;

    const body = (await req.json()) as EditProfileSchema;

    const parsed = editProfileSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          message: parsed.error,
        }),
        { status: 405 }
      );
    }

    const updatedUser = await db.user.update({
      where: {
        id: token.id,
      },
      data: {
        name: parsed.data.name,
        bio: parsed.data.bio,
        username: parsed.data.username,
      },
    });

    return new Response(
      JSON.stringify({
        ...updatedUser,
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        success: false,
      }),
      { status: 500 }
    );
  }
}

export type PostHandlerReturn = User & {
  success: boolean;
};
