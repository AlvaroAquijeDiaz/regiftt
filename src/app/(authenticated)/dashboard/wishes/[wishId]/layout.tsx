import { type ReactNode } from "react";

export default function WishIDLayout({ children }: { children: ReactNode }) {
  /**
   * TODO: Only God knows why the body tag won't fill up all the height and thus this element
   * needed to be a fixed height
   */
  return <section className="mx-auto h-[80vh] max-w-4xl">{children}</section>;
}
