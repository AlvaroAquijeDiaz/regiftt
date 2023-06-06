import { ImageResponse } from "next/server";

export const runtime = "edge";

export function GET(req: Request) {
  const url = new URL(req.url);

  const Image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${url.origin}/og/OpenGraph.svg`}
      alt="OG"
      className="rounded-md bg-neutral-800"
      width={1200}
      height={630}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#171717",
          display: "flex",
        }}
      >
        {Image}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      status: 200,
    }
  );
}
