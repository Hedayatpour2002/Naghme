import type { Metadata } from "next";
import { AuthProvider } from "@/context/authContext";

import "@/app/globals.css";
import Image from "next/image";
import Footer from "@/components/layout/footer/footer";

export const metadata: Metadata = {
  title: "نغمه | ادمین",
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
          <main className="container py-8 flex flex-col md:flex-row-reverse items-center justify-center  gap-4 md:w-96 lg:w-auto xl:gap-16">
            <Image
              src="/images/adminLogin.svg"
              alt="books"
              width={737}
              height={825}
              className="flex-shrink lg:max-w-[500px] xl:max-w-none"
            />
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
