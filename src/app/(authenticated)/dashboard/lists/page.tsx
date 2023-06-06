import { Suspense } from "react";
import { ListsGrid } from "~/app/_ui/my-wishes/lists-grid";

export default function MyListsPage() {
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-3xl font-black">📝 My Lists</h1>

      <Suspense>
        <ListsGrid />
      </Suspense>
    </section>
  );
}
