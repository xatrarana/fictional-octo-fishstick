import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  
  title: "trijyoti cooperate and saving pvt. ltd.",
  description: "trijyoti cooperate is nice some and get some",
  manifest: "/manifest.json",
  other: {
    me: ["mail.chhatrarana@gmail.com", "https://chhatrarana.com.np"],
  },
  appLinks: {
    web: {
      url: "https://trijyoticorporate.com.np",
      should_fallback: true,
    },
  },
  category:"Micro Finance",
  keywords: ["trijyoti", "cooperate", "saving", "pvt", "ltd"],
  appleWebApp:{
    title:"trijyoti cooperate and saving pvt. ltd.",
    statusBarStyle:"black-translucent",
    startupImage:[
      '/apple-touch-icon.png'
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
