import { ImageResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  const Image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://res.cloudinary.com/dplsjufzf/image/upload/v1685921448/OpenGraph_Image_r3jn1r.svg"
      alt="OG"
      className="rounded-md bg-neutral-800"
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
