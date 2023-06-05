import Image from "next/image";
import { Button } from "~/ui/shared/button";

export default function Landing() {
  return (
    <section className="flex min-h-screen min-w-full flex-col items-center justify-center bg-neutral-900 text-neutral-100">
      <section className="flex max-w-3xl flex-col items-center gap-4">
        <header className="mb-4 flex items-center gap-4">
          <Image src="/favicon.ico" alt="Logo" width={100} height={100} />
          <h1 className="text-center text-6xl font-black">Welcome to Regiftt</h1>
        </header>

        <article className="flex w-fit max-w-[50ch] select-none flex-col gap-2 self-center rounded-md border-neutral-600 p-4">
          <p className="font-bold">Have you ever received a gift that you didn&apos;t want?</p>
          <p className="text-neutral-400">
            Maybe it was a duplicate of something you already had, or maybe it was just something
            you just didn&apos;t like.
          </p>
        </article>

        <div className="flex flex-col items-center">
          <span>·</span>
          <div className="h-14 w-px rounded-full bg-neutral-500" />
          <span>·</span>
        </div>

        <article className="flex max-w-[65ch] select-none flex-col gap-2 self-center rounded-lg border border-neutral-600 p-4 shadow-xl shadow-purple-700/40">
          <p className="text-xl font-bold">
            Forget about that, make sure you receive what you actually{" "}
            <span className="font-black text-purple-400">WANT!</span>
          </p>

          <p className="text-neutral-400">
            You just need to create your lists, share your personal profile and anyone will be able
            to see your wishes, this of course{" "}
            <span className="font-bold italic">ANONYMOUSLY.</span>
          </p>
        </article>

        <Button
          variant="secondary"
          size="lg"
          className="mt-4 w-fit self-center rounded-full font-bold"
        >
          Join The Waitlist
        </Button>
      </section>
    </section>
  );
}
