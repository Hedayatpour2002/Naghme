"use client";

import Image from "next/image";
import BookActionButtons from "@/components/BookActionButtons";
import Link from "next/link";

export default function BookCard() {
  const productId = "1";
  return (
    <div className="flex rounded-2xl border border-light-ligth-purple shadow-md p-2 gap-3 relative overflow-hidden">
      <p className="absolute top-0 right-0 bg-dark-red text-white p-2 shadow-2xl rounded-bl-2xl rounded-tr-2xl text-xs font-semibold">
        فروش ویژه
      </p>
      {/* @TODO */}
      <Link href={`books/1`} className="flex">
        <Image
          src={"/sample/home-bestsellers/placeholder-0.png"}
          width={133}
          height={222}
          alt=""
          className="object-cover rounded-[20px]"
        />
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 justify-between">
            {/* @TODO */}
            <span className="text-dark-purple bg-light-purple rounded-lg px-4 py-3 font-bold text-sm flex-grow text-center">
              کتاب الکترونیکی
            </span>
            {/* @TODO */}
            <span className="text-dark-purple bg-light-purple rounded-lg px-4 py-3 font-bold text-sm flex-grow text-center">
              درام
            </span>
          </div>
          {/* @TODO */}
          <Link href={`books/1`}>
            <h2 className="font-semibold">صد سال تنهایی</h2>
          </Link>
          <div className="flex items-center justify-between gap-3">
            {/* @TODO */}
            <span className="text-light-blue text-xs">گابریل گارسیا مارکز</span>
            <span className="w-1 h-1 bg-light-purple rounded-full"></span>
            {/* @TODO */}
            <div className="flex gap-2.5 items-center">
              <span className="text-midnight-blue text-xs sm:text-sm font-semibold flex gap-1 text-center leading-none">
                4.1
              </span>
              <Image
                src={"/icon/full-star.svg"}
                width={19}
                height={17}
                alt="ستاره"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 ">
          <p className="flex gap-1 items-center flex-grow">
            <span className="bg-dark-red py-0.5 px-2 text-sm font-bold text-white rounded-md flex items-center justify-center">
              <span className="relative -bottom-0.5">90%</span>
            </span>
            <span className="text-xs text-silver line-through">100,000</span>
          </p>
          <p className="flex items-center">
            <span className="text-2xl font-semibold leading-none">10,000</span>
            <span className="font-semibold text-sm">تومان</span>
          </p>
        </div>
        <div className="flex gap-4 justify-between">
          <BookActionButtons productId={productId} />
        </div>
      </div>
    </div>
  );
}
