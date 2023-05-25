export const metadata: Metadata = {
  title: "Regiftt",
  description: "The new social media to share wishes and desires",
  authors: [
    {
      name: "Alvaro Aquije",
      url: "https://twitter.com/@alvaro_dotdev",
    },
  ],
};

import { type Metadata } from "next";
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
      <head>
        <meta charSet="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeProvider>

        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#27272a",
              border: "1px solid #525252",
              borderRadius: "9999px",
              fontSize: "0.9rem",
              color: "#eee",
            },
          }}
        />

        <StyleSwitcher />
      </body>
    </html>
  );
}
