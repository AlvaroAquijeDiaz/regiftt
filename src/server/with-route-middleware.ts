import { getToken, type JWT } from "next-auth/jwt";
import { type NextRequest, type NextResponse } from "next/server";
import { env } from "process";
import { type z, type ZodObject, type ZodRawShape } from "zod";

export const withRouteMiddleware = <T, V extends ZodRawShape>(
  handler: ({
    token,
    req,
    res,
    out,
  }: {
    token: JWT;
    req: NextRequest;
    res?: NextResponse;
    out?: z.infer<ZodObject<V>>;
  }) => Promise<T>,
  opts?: {
    validator: ZodObject<V>;
  }
) => {
  return async (req: NextRequest, res?: NextResponse) => {
    const token = await getToken({
      req,
      secret: env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!opts?.validator) {
      return handler({ token, req, res });
    }

    try {
      const body = (await req.json()) as V;
      const parsed = opts.validator.safeParse(body);

      if (!parsed.success) {
        return new Response(
          JSON.stringify({
            error: parsed.error,
          }),
          { status: 422 }
        );
      }

      return handler({ token, req, res, out: parsed.data });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Validation Error - @withRouteMiddleware",
        }),
        { status: 500 }
      );
    }
  };
};
