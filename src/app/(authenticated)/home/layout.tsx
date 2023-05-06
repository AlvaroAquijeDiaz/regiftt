export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav className="border-b border-border p-2">Authenticated Nav</nav>

      {children}
    </main>
  );
}
