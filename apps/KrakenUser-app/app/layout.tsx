import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppbarClient } from "../components/AppbarClient";
import { Inter } from "next/font/google";
import { Providers } from "../provider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Providers>
      <body className={inter.className}>
        <div className="min-w-screen min-h-full bg-[#000000] flex flex-col overflow-x-hidden">
          <AppbarClient />
          <div className="h-100">{children}</div>
        </div>
      </body>
    </Providers>
  </html>
  );
}
