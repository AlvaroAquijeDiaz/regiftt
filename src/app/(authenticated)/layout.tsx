import { Nav } from "~/ui/home/nav";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />

      <main className="mx-4 my-8 md:mx-24">{children}</main>
    </>
  );
}
