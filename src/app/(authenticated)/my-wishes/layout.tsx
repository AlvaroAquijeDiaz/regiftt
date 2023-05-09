import { type ReactNode } from "react";

export default function MyWishesPageLayout(props: { children: ReactNode }) {
  return (
    <section className="flex w-full gap-8">
      {props.children}

      <aside className="border-l p-8 ">
        <h3>Filters</h3>
      </aside>
    </section>
  );
}
