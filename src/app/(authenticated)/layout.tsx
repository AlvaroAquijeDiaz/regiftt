import { Nav } from "~/app/_ui/home/nav";
import { Sidebar } from "~/app/_ui/home/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen w-full grid-cols-1 lg:flex">
      <Sidebar />

      <div className="flex h-full w-full flex-col">
        <Nav />

        <main className="mx-auto h-full w-full max-w-2xl px-4 pb-8 pt-5">{children}</main>
      </div>
    </section>
  );
}
