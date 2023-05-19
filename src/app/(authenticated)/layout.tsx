import { Nav } from "~/ui/home/nav";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="h-full px-4 pt-2 sm:px-8 md:px-24">{children}</main>
    </>
  );
}
