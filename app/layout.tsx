import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "trijyoti cooperate and saving pvt. ltd.",
  description: "trijyoti cooperate is nice some and get some",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
   <SessionProvider session={session}>
     <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}>
       {children}
       <Toaster/>
      </body>
    </html>
   </SessionProvider>
  );
}
