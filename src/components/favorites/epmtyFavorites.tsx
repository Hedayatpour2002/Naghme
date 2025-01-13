import Image from "next/image";
import Link from "next/link";

export default function EpmtyFavorites() {
  return (
    <div className="flex flex-col items-center pb-16">
      <Image
        src={"/images/empty_Favorites.svg"}
        width={500}
        height={500}
        alt="لیست علاقه‌مندی های شما خالی است!"
      />

      <p className="text-2xl font-bold">لیست علاقه‌مندی های شما خالی است!</p>
      <Link href="/books" className="font-bold text-xl text-dark-red p-4">
        رفتن به صفحه محصولات
      </Link>
    </div>
  );
}
