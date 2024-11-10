import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "نغمه",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-shabnam text-dark-blue h-full">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
