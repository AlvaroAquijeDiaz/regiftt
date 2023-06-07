import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { Button } from "~/app/_ui/shared/button";
import { MouseFollower } from "./_ui/mouse-follower";

export const metadata: Metadata = {
  twitter: {
    card: "summary_large_image",
    title: "Regiftt",
    site: "@alvaro_dotdev",
    description: "The new social media to share wishes and desires",
    creator: "@alvaro_dotdev",
    images: "https://regiftt.vercel.app/og/regiftt.png",
  },
  openGraph: {
    url: "https://regiftt.vercel.app",
    title: "Regiftt",
    description: "The new social media to share wishes and desires",
    images: {
      url: "https://regiftt.vercel.app/og/regiftt.png",
      width: 1200,
      height: 630,
    },
    type: "website",
  },
  alternates: {
    languages: {
      en: "/",
      es: "/es",
    },
  },
};

export default function Landing() {
  return (
    <section className="flex min-h-full flex-col items-center justify-between text-neutral-100">
      <section className="z-10 flex max-w-3xl flex-col items-center gap-4">
        <header className="mb-4 flex select-none items-center  gap-4">
          <Image src="/favicon.ico" alt="Logo" width={80} height={80} priority />
          <h1 className="text-center text-4xl font-black md:text-6xl">Welcome to Regiftt</h1>
        </header>

        <article className="flex w-fit max-w-[50ch] select-none flex-col gap-2 self-center rounded-md border-neutral-600 p-4">
          <p className="font-bold">Have you ever received a gift that you didn&apos;t want?</p>
          <p className="text-neutral-400">
            Maybe it was a duplicate of something you already had, or you just didn&apos;t
            didn&apos;t like it at all.
          </p>
        </article>

        <div className="flex flex-col items-center text-neutral-500">
          <span>·</span>
          <div className="h-14 w-px rounded-full bg-neutral-500" />
          <span>·</span>
        </div>

        <article className="flex max-w-[65ch] select-none flex-col gap-2 self-center rounded-lg border border-neutral-600 p-4 shadow-xl shadow-purple-700/40">
          <p className="text-xl font-bold">
            Forget about that, make sure you receive what you actually{" "}
            <span className="font-black text-purple-400 underline">WANT!</span>
          </p>

          <p className="text-neutral-400">
            You just need to create your lists, share your personal profile and anyone will be able
            to see your wishes, this of course{" "}
            <span className="italic underline underline-offset-2">ANONYMOUSLY</span>.
          </p>
        </article>

        <Link
          href={"https://tally.so/r/w54qQb" as LinkProps["href"]}
          target="_blank"
          className="mt-10"
        >
          <Button
            variant="secondary"
            size="lg"
            className="z-20 w-fit self-center rounded-full font-bold hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-purple-700/50"
          >
            Join The Waitlist
            <ArrowRight size={20} />
          </Button>
        </Link>
      </section>

      <MouseFollower />
    </section>
  );
}
