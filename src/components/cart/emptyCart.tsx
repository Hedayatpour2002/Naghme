import Image from "next/image";
import Link from "next/link";

export default function EpmtyCart() {
  return (
    <div className="flex flex-col items-center pb-16">
      <Image
        src={"/images/empty_cart.svg"}
        width={750}
        height={500}
        alt="سبد خرید شما خالی است!"
      />

      <p className="text-2xl font-bold">سبد خرید شما خالی است!</p>
      <Link href="/books" className="font-bold text-xl text-dark-red p-4">
        رفتن به صفحه محصولات
      </Link>
    </div>
  );
}
