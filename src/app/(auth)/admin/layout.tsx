import Image from "next/image";
import Footer from "@/components/layout/footer/footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container py-8 flex flex-col md:flex-row-reverse items-center justify-center  gap-4 md:w-96 lg:w-auto xl:gap-16 min-h-screen">
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
    </>
  );
}
