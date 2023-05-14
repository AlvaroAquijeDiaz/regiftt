import { type ReactNode } from "react";
import { Return } from "~/ui/my-wishes/return";

export default function WishIDLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-full w-full gap-4 rounded-lg border p-10">
      <Return />

      {children}
    </section>
  );
}
