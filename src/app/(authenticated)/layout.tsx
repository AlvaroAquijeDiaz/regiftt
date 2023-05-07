import { Nav } from "~/ui/home/nav";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />

      <main className="px-4 py-4 md:px-14">{children}</main>
    </>
  );
}
