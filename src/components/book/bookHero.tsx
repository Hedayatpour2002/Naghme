import Image from "next/image";
import { StarRating } from "../starRating";
import BookActionButtons from "../BookActionButtons";

interface Book {
  book_id: number;
  title: string;
  price: number;
  is_off: number;
  book_likes: number;
  book_views: number;
  format: string;
  descriptions: string;
  Authors: Array<{ author_id: number; author_name: string }>;
  Publishers: Array<{ publisher_id: number; publisher_name: string }>;
  Categories: Array<{ category_id: number; category_name: string }>;
  Genres: Array<{ genre_id: number; genre_name: string }>;
}

interface BookHeroProps {
  book: Book;
}

export default function BookHero({ book }: BookHeroProps) {
  const {
    title,
    price,
    is_off,
    descriptions,
    Authors,
    book_likes,
    book_views,
    format,
  } = book;

  const discountedPrice = price - (price * is_off) / 100;
  const authorNames = Authors.map((author) => author.author_name).join(", ");

  return (
    <section className="flex flex-col gap-16 items-center justify-center lg:flex-row-reverse pb-9 lg:pt-9">
      <div className="w-fit relative top-9 flex-shrink-0">
        <Image
          src="/sample/images.jpg"
          alt={title}
          width={400}
          height={572}
          className="rounded-[20px]"
        />
        {is_off > 0 && (
          <div className="font-semibold text-lg bg-dark-red rounded-bl-[20px] rounded-br-[20px] w-full text-white h-[100px] relative -top-[25px] flex items-end justify-center -z-10 pb-6 shadow-2xl shadow-[#FF6B00]/30">
            فروش ویژه
          </div>
        )}
      </div>
      <section className="flex gap-4 flex-col self-start lg:gap-8 lg:max-w-[533px]">
        <div className="flex gap-7">
          <div className="border border-dark-red rounded-lg flex gap-4 py-3 px-5 items-center justify-center">
            <span className="text-dark-red relative top-0.5">بدون امتیاز</span>
            <StarRating rating={0} />
          </div>
          <div className="border border-light-silver text-light-blue py-3 text-center rounded-lg px-5 min-w-40">
            <span className="relative top-0.5">{book_views} نظر</span>
          </div>
        </div>

        <h1 className="font-semibold text-3xl">{title}</h1>

        <div className="flex gap-4 items-center">
          <Image
            src={"/sample/home-bestsellers/picture.png"}
            alt={authorNames}
            width={52}
            height={52}
            className="rounded-full"
          />
          <p className="opacity-80">{authorNames}</p>
        </div>

        <p className="opacity-70 text-xs leading-7">{descriptions}</p>

        <div className="flex items-center gap-3">
          {is_off > 0 && (
            <p className="flex gap-1 items-center">
              <span className="bg-dark-red py-0.5 px-2 text-sm font-bold text-white rounded-md flex items-center justify-center">
                <span className="relative -bottom-0.5">{is_off}%</span>
              </span>
              <span className="text-xs text-silver line-through relative top-0.5">
                {price.toLocaleString()}
              </span>
            </p>
          )}
          <p className="flex items-center">
            <span className="text-4xl text-dark-red font-semibold leading-none top-0.5">
              {discountedPrice.toLocaleString()}
            </span>
            <span className="font-semibold text-sm">تومان</span>
          </p>
        </div>
        <div className="flex flex-row-reverse justify-between self-start min-w-64 gap-8">
          <BookActionButtons productId={book.book_id} />
        </div>
      </section>
    </section>
  );
}
