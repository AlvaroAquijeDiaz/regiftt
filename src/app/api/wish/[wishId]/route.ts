import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      wishId: string;
    };
  }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const id = params.wishId;

  await db.gift.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    deleted: id,
    success: true,
  });
}
