import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

import localFont from "next/font/local";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NoiseWrapper>
          <Link
            href="/"
            className="transition-transform duration-300 hover:scale-110"
          >
            <Image
              draggable={false}
              src="/logo.webp"
              className="h-28 w-28"
              width={28}
              height={28}
              alt="Vite logo"
              title="Logo"
            />
          </Link>
          <div className="flex w-full max-w-5xl flex-col gap-2">{children}</div>
          <footer className="text-primary flex flex-col text-center">
            <span className="sm:text-md text-sm">
              Free temp mail service, anonymously and free.
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

function NoiseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="noise mx-auto px-4">
      <div className="overlay" />
      <div className="z-20 my-8 flex h-full w-full flex-col items-center gap-6">
        {children}
      </div>
    </main>
  );
}
