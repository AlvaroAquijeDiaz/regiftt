export const metadata = {
  title: "Regiftt",
  description: "The new social media to share wishes and desires",
};

import { Toaster } from "react-hot-toast";
import { cn } from "~/lib/cn";
import { fontSans } from "~/lib/fonts";
import { NextAuthProvider } from "~/providers/next-auth";
import { ThemeProvider } from "~/providers/themes";
import "~/styles/globals.css";
import { StyleSwitcher } from "~/ui/theme/style-switcher";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeProvider>

        <Toaster
          toastOptions={{
            className: "bg-neutral-700 text-neutral-100",
          }}
        />

        <StyleSwitcher />
      </body>
    </html>
  );
}
