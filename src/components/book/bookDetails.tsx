import React from "react";

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

interface BookDetailsProps {
  book: Book;
}

export default function BookDetails({ book }: BookDetailsProps) {
  if (!book) {
    return <div>در حال بارگذاری...</div>;
  }

  const titles = [
    "نام کتاب",
    "فرمت کتاب",
    "نویسنده",
    "ناشر",
    "دسته‌بندی‌ها",
    "ژانرها",
  ];

  const desc = [
    book.title,
    book.format,
    getAuthorNames(book.Authors),
    getPublisherNames(book.Publishers),
    getCategoryNames(book.Categories),
    getGenreNames(book.Genres),
  ];

  function getAuthorNames(authors) {
    return authors && authors.length > 0
      ? authors.map((a) => a.author_name).join(", ")
      : "بدون نویسنده";
  }

  function getPublisherNames(publishers) {
    return publishers && publishers.length > 0
      ? publishers.map((p) => p.publisher_name).join(", ")
      : "بدون ناشر";
  }

  function getCategoryNames(categories) {
    return categories && categories.length > 0
      ? categories.map((c) => c.category_name).join(", ")
      : "بدون دسته‌بندی";
  }

  function getGenreNames(genres) {
    return genres && genres.length > 0
      ? genres.map((g) => g.genre_name).join(", ")
      : "بدون ژانر";
  }

  return (
    <section className="py-8 px-9 flex flex-col gap-8 overflow-hidden">
      <p className="font-semibold text-xl">جزئیات</p>
      <div className="rounded-lg overflow-hidden">
        {titles.map((title, index) => (
          <DetailsRow key={index} title={title} desc={desc[index]} />
        ))}
      </div>
    </section>
  );
}

interface DetailsRowProps {
  title: string;
  desc: string;
}

function DetailsRow({ title, desc }: DetailsRowProps) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-52 md:w-80 p-7 bg-light-blue text-white font-semibold text-xl">
        {title}
      </div>
      <div className="p-7 bg flex-grow bg-light-ligth-purple">
        <span className="sm:pr-8 text-lg text-light-blue">{desc}</span>
      </div>
    </div>
  );
}
