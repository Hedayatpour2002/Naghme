import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center flex-col gap-8 pb-16 text-center flex-grow">
        <Image
          src={"/images/books_404.svg"}
          alt="books"
          width={1000}
          height={400}
        />
        <h1 className="font-sahel text-dark-red text-[228px] font-bold leading-none">
          404
        </h1>
        <div className="flex flex-col justify-center items-center gap-4 px-2">
          <p className="text-dark-blue text-4xl font-bold">
            به نظر می‌رسد گم شده‌اید...
          </p>
          <p className="text-2xl text-light-blue">
            صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
          </p>
        </div>
        <Link href={"/"} className="font-bold text-xl text-dark-red">
          بازگشت به صفحه اصلی
        </Link>
      </main>
      <Footer />
    </>
  );
}
