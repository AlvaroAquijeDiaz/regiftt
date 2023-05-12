import { Nav } from "~/ui/home/nav";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />

      <main className="px-4 sm:px-8 md:px-24">{children}</main>
    </>
  );
}
