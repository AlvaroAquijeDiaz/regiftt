import { Suspense } from "react";
import Details from "~/ui/my-wishes/[wishID]/details";
import Loader from "~/ui/my-wishes/[wishID]/loader";

// TODO: Make the blobs animated and moving around
export default function WishIDPage({
  searchParams: { name },
  params: { wishId },
}: {
  params: { wishId: string };
  searchParams: { name: string };
}) {
  return (
    <section className="relative h-full">
      <svg
        className="absolute left-0 top-0 h-[500px] w-[500px] opacity-50 blur-lg"
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g transform="translate(451.69870698906084 250.2767189307279)">
          <path
            d="M225.6 -106.8C279.7 -36.5 302.2 75.5 259.4 162.2C216.5 249 108.3 310.5 3.3 308.6C-101.6 306.7 -203.2 241.3 -251.6 151.4C-299.9 61.5 -295 -53 -244.2 -121.4C-193.4 -189.8 -96.7 -212.1 -5.5 -208.9C85.7 -205.8 171.5 -177.1 225.6 -106.8"
            fill="#FCAF3C"
          ></path>
        </g>
      </svg>

      <svg
        className="absolute right-0 top-0 h-[500px] w-[500px] opacity-50 blur-lg"
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g transform="translate(451.69870698906084 250.2767189307279)">
          <path
            d="M225.6 -106.8C279.7 -36.5 302.2 75.5 259.4 162.2C216.5 249 108.3 310.5 3.3 308.6C-101.6 306.7 -203.2 241.3 -251.6 151.4C-299.9 61.5 -295 -53 -244.2 -121.4C-193.4 -189.8 -96.7 -212.1 -5.5 -208.9C85.7 -205.8 171.5 -177.1 225.6 -106.8"
            fill="#715DF2"
          ></path>
        </g>
      </svg>

      <svg
        className="absolute bottom-0 left-40 h-[500px] w-[500px] opacity-50 blur-lg"
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g transform="translate(451.69870698906084 250.2767189307279)">
          <path
            d="M225.6 -106.8C279.7 -36.5 302.2 75.5 259.4 162.2C216.5 249 108.3 310.5 3.3 308.6C-101.6 306.7 -203.2 241.3 -251.6 151.4C-299.9 61.5 -295 -53 -244.2 -121.4C-193.4 -189.8 -96.7 -212.1 -5.5 -208.9C85.7 -205.8 171.5 -177.1 225.6 -106.8"
            fill="#FF6F61"
          ></path>
        </g>
      </svg>

      <div className="anim relative mt-2 flex h-full flex-col gap-4 rounded-lg border bg-white/60 px-6 py-4 shadow-lg backdrop-blur-lg backdrop-filter sm:gap-8 sm:px-12 sm:py-8 md:gap-12 md:py-10">
        <h1 className="text-2xl font-black capitalize md:text-3xl lg:text-4xl">{name}</h1>

        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error RSC */}
          <Details wishID={wishId} />
        </Suspense>
      </div>
    </section>
  );
}
