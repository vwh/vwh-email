import "./globals.css";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";

import NextTopLoader from "nextjs-toploader";
import { Button } from "@/components/ui/button";

import { Lexend } from "next/font/google";

const font = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
  fallback: ["sans-serif"],
  preload: true
});

export const metadata: Metadata = {
  title: "VWH Email",
  description: "Open source temp mail service, anonymous and free"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preload" as="image" href="/noise.webp" type="image/webp" />
      </Head>
      <body className={`${font.className} antialiased`}>
        <NextTopLoader showSpinner={false} color="#909DA8" />
        <NoiseWrapper>
          <Link href="/api/" className="absolute right-4 top-4">
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              type="button"
              aria-label="API"
            >
              API
            </Button>
          </Link>
          <Link
            href="/"
            className="transition-transform duration-300 hover:scale-110"
          >
            <Image
              draggable={false}
              src="/logo.webp"
              className="h-28 w-28"
              width={112}
              height={112}
              alt="Logo"
              title="Logo"
              priority
            />
          </Link>
          <main className="flex w-full max-w-5xl flex-col gap-2">
            {children}
          </main>
          <footer className="flex flex-col text-center text-primary">
            <span className="sm:text-md text-sm">
              Temp mail service, anonymous and free
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/vwh/vwh-email"
              className="hover:underline"
            >
              <strong>
                Made with <span className="animate-pulse">💙</span> by @vwh
              </strong>
            </a>
          </footer>
        </NoiseWrapper>
      </body>
    </html>
  );
}

interface NoiseWrapperProps {
  children: React.ReactNode;
}

function NoiseWrapper({ children }: NoiseWrapperProps) {
  return (
    <main className="noise mx-auto px-4 opacity-80">
      <div className="overlay" />
      <div className="z-20 my-8 flex h-full w-full flex-col items-center gap-6">
        {children}
      </div>
    </main>
  );
}
