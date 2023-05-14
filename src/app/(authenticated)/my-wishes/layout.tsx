import { type ReactNode } from "react";

export default function MyWishesPageLayout(props: { children: ReactNode }) {
  return <section className="h-full w-full py-4">{props.children}</section>;
}
