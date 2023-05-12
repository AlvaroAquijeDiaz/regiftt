import { type ReactNode } from "react";
import { Return } from "~/ui/my-wishes/return";

export default function WishIDLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-full flex-col items-start gap-4">
      <Return />

      {children}
    </section>
  );
}
