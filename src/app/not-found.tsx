"use client";
import Link from "next/link";
import { Button } from "~/ui/shared/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 sm:p-24 md:p-32">
      <h1 className="text-2xl font-black">Route Not Found</h1>
      <span>Congrats, you broke the app 🎉 | Or page not found 🤔</span>
      <p className="font-semibold">What happened? LOL</p>

      <Link href="/home" passHref>
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
