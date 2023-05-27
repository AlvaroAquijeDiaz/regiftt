import { Nav } from "~/ui/home/nav";
import { Sidebar } from "~/ui/home/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full grid-cols-1 lg:flex">
      <Sidebar />

      <div className="flex w-full flex-col">
        <Nav />

        <main className="mx-auto h-full w-full max-w-3xl px-4 pt-2">{children}</main>
      </div>
    </section>
  );
}
