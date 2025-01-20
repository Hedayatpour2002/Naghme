"use client";

import Image from "next/image";
import BookActionButtons from "@/components/BookActionButtons";
import Link from "next/link";

export default function BookCard({ book }) {
  const {
    book_id,
    title,
    price,
    is_off,
    book_likes,
    book_views,
    format,
    descriptions,
    Authors,
    Publishers,
    Categories,
    Genres,
  } = book;

  const discountedPrice = is_off ? price * (1 - is_off / 100) : price;

  return (
    <div className="flex rounded-2xl border border-light-ligth-purple shadow-md p-2 gap-3 relative overflow-hidden">
      {is_off > 0 && (
        <p className="absolute top-0 right-0 bg-dark-red text-white p-2 shadow-2xl rounded-bl-2xl rounded-tr-2xl text-xs font-semibold">
          فروش ویژه
        </p>
      )}
      <Link href={`/books/${book_id}`} className="flex">
        <Image
          src={"/sample/home-bestsellers/placeholder-0.png"}
          width={133}
          height={222}
          alt={title}
          className="object-cover rounded-[20px]"
        />
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 justify-between">
            <span className="text-dark-purple bg-light-purple rounded-lg px-4 py-3 font-bold text-sm flex-grow text-center">
              {format === "AUDIO" ? "کتاب صوتی" : "کتاب الکترونیکی"}
            </span>
            <span className="text-dark-purple bg-light-purple rounded-lg px-4 py-3 font-bold text-sm flex-grow text-center">
              {Categories.length > 0 && Categories[0].category_name}
            </span>
          </div>
          <Link href={`/books/${book_id}`}>
            <h2 className="font-semibold">{title}</h2>
          </Link>
          <div className="flex items-center justify-between gap-3">
            <span className="text-light-blue text-xs">
              {Authors.length > 0 && Authors[0].author_name}
            </span>
            <span className="w-1 h-1 bg-light-purple rounded-full"></span>
            <div className="flex gap-2.5 items-center">
              <span className="text-midnight-blue text-xs sm:text-sm font-semibold flex gap-1 text-center leading-none">
                {book_likes > 0 ? book_likes : 0}
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
            {is_off > 0 && (
              <span className="bg-dark-red py-0.5 px-2 text-sm font-bold text-white rounded-md flex items-center justify-center">
                <span className="relative -bottom-0.5">{is_off}%</span>
              </span>
            )}
            <span className="text-xs text-silver line-through">
              {price.toLocaleString()}
            </span>
          </p>
          <p className="flex items-center">
            <span className="text-2xl font-semibold leading-none">
              {discountedPrice.toLocaleString()}
            </span>
            <span className="font-semibold text-sm">تومان</span>
          </p>
        </div>
        <div className="flex gap-4 justify-between">
          <BookActionButtons productId={book_id.toString()} />
        </div>
      </div>
    </div>
  );
}
