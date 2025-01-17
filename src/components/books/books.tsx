"use client";
import { useState } from "react";

import BookCard from "@/components/bookCard";
import BooksTitle from "@/components/books/booksTitle";
import Filters from "@/components/books/filters";

export default function Books() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleFilterFun() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <BooksTitle toggleFilterFun={toggleFilterFun} isOpen={isOpen} />

      <div className="flex flex-col md:flex-row md:items-start overflow-hidden">
        <Filters isOpen={isOpen} />

        <div
          className={`w-fit mx-auto grid grid-cols-1 gap-y-6 gap-x-4 justify-center py-9 ${
            isOpen
              ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
              : "md:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </>
  );
}
