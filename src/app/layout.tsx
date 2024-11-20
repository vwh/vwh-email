import "./globals.css";

import Link from "next/link";
import { Lexend } from "next/font/google";
import Image from "next/image";
import type { Metadata } from "next";

import NextTopLoader from "nextjs-toploader";

const font = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
  fallback: ["sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "VWH Email",
  description: "Temp mail service, anonymously and free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <NextTopLoader showSpinner={false} color="#909DA8" />
        <NoiseWrapper>
          <Link
            href="/"
            className="transition-transform duration-300 hover:scale-110"
          >
            <Image
              draggable={false}
              src="/logo.webp"
              className="h-28 w-28"
              width={100}
              height={100}
              alt="Logo"
              title="Logo"
            />
          </Link>
          <main className="flex w-full max-w-5xl flex-col gap-2">
            {children}
          </main>
          <footer className="text-primary flex flex-col text-center">
            <span className="sm:text-md text-sm">
              Temp mail service, anonymously and free.
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
