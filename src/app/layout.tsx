export const metadata: Metadata = {
  title: "Regiftt",
  description: "The new social media to share wishes and desires",
  viewport: "width=device-width",
  authors: [
    {
      name: "Alvaro Aquije",
      url: "https://twitter.com/@alvaro_dotdev",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Regiftt",
    site: "@alvaro_dotdev",
    description: "The new social media to share wishes and desires",
    creator: "@alvaro_dotdev",
    images: {
      url: "https://regiftt.vercel.app/og/regiftt.png",
      type: "image/png",
      width: 1200,
      height: 630,
      alt: "Regiftt",
      username: "@alvaro_dotdev",
    },
  },
  openGraph: {
    url: "https://regiftt.vercel.app",
    title: "Regiftt",
    description: "The new social media to share wishes and desires",
    // images: {
    //   url: "https://regiftt.vercel.app/og/regiftt.png",
    //   type: "image/png",
    //   width: 1200,
    //   height: 630,
    // },
    locale: "en",
    alternateLocale: "es",
    type: "website",
  },
  icons: "/favicon.ico",
  metadataBase: new URL("https://regiftt.vercel.app/"),
  generator: "Regiftt v0.0.1",
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
