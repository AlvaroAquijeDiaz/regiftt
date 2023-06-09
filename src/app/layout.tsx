export const metadata: Metadata = {
  title: "Regiftt",
  description: "The new social media app to share and receive gifts",
  robots: "all",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  authors: [
    {
      name: "Alvaro Aquije",
      url: "https://twitter.com/@alvaro_dotdev",
    },
  ],
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://regiftt.vercel.app/"),
  generator: "Regiftt v0.0.1",
  alternates: {
    canonical: "/",
    languages: {
      es: "/es",
      en: "/",
    },
  },
};

import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { cn } from "~/lib/cn";
import { fontSans } from "~/lib/fonts";
import { NextAuthProvider } from "~/providers/next-auth";
import { ThemeProvider } from "~/providers/themes";
import "~/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="cannonical" href="https://regiftt.vercel.app" />
      </head>
      {/* TODO: Why is it overflowing when cursor is near edges? fixed by overflow-hidden but idk */}
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
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

        <Analytics />
      </body>
    </html>
  );
}
