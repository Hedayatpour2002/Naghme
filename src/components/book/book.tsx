"use client";
import BookHero from "@/components/book/bookHero";
import BookDetails from "./bookDetails";
import { useEffect, useState } from "react";
import { getBook } from "@/services/coreService";

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

interface BookProps {
  book_id: string;
}

export default function Book({ book_id }: BookProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      const id = Number(book_id);
      try {
        const res = await getBook(id);
        setBook(res.message);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [book_id]);

  if (loading) {
    return (
      <div className="w-full h-48 flex justify-center items-center gap-4">
        <div className="w-8 h-8 animate-spin border-t-dark-purple border-b-dark-purple border-2 rounded-full"></div>
      </div>
    );
  }

  if (!book) {
    return <div>کتاب مورد نظر یافت نشد.</div>;
  }

  return (
    <>
      <BookHero book={book} />
      <BookDetails book={book} />
    </>
  );
}
