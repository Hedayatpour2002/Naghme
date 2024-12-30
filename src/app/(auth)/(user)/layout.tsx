import type { Metadata } from "next";
import { AuthProvider } from "@/context/authContext";

import "@/app/globals.css";
import Image from "next/image";
import Footer from "@/components/layout/footer/footer";

export const metadata: Metadata = {
  title: "نغمه",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-shabnam text-dark-blue h-full">
        <AuthProvider>
          <main className="container min-h-screen py-8 flex flex-col md:flex-row-reverse items-center justify-center  gap-4 md:w-96 lg:w-auto lg:gap-16">
            <Image
              src="/images/outh.svg"
              alt="books"
              width={737}
              height={825}
              className="flex-shrink"
            />
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
