import { type ReactNode } from "react";

export default function MyWishesPageLayout(props: { children: ReactNode }) {
  return <section className="flex h-full w-full gap-8">{props.children}</section>;
}
