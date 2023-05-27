import { Suspense } from "react";
import { ListsGrid } from "~/ui/my-wishes/lists-grid";

export default function MyListsPage() {
  return (
    <section className="mt-3 flex h-full w-full flex-col gap-4">
      <h1 className="text-3xl font-black">📝 My Lists</h1>

      <Suspense>
        <ListsGrid />
      </Suspense>
    </section>
  );
}
