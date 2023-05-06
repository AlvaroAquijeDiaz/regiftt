import { NextResponse, type NextRequest } from 'next/server';
import { newUserSchema } from '~/lib/schemas';
import { db } from '~/server/db';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as unknown;

  try {
    const parsed = newUserSchema.parse(body);

    const newUser = await db.user.update({
      where: {
        id: parsed.userId,
      },
      data: {
        username: parsed.username,
      },
    });

    return NextResponse.json({
      status: 200,
      body: newUser,
    });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 405 });
  }
}
