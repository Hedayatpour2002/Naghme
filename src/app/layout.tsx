import type { Metadata } from "next";

import "./globals.css";
import ModalDialog from "@/components/modal";

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
      <body className="font-shabnam text-dark-blue min-h-screen flex flex-col">
        {children}

        <ModalDialog />
      </body>
    </html>
  );
}
