"use client";

import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";
import FavoritesTitle from "@/components/favorites/favoritesTitle";
import EpmtyFavorites from "@/components/favorites/epmtyFavorites";
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

export default function Favorites() {
  const { getFavoriteItems, removeFromFavorites } = useStore();
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const favoriteIds = getFavoriteItems();

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const fetchedBooks = await Promise.all(
          favoriteIds.map(async (id) => {
            try {
              const res = await getBook(+id);
              return res.message;
            } catch (error) {
              console.error(`Error fetching book ID ${id}:`, error);
              removeFromFavorites(id);
              return null;
            }
          })
        );

        const validBooks = fetchedBooks.filter(
          (book) => book !== null
        ) as Book[];
        setFavoriteBooks(validBooks);
      } catch (error) {
        setError("خطا در دریافت اطلاعات کتاب‌ها. لطفاً دوباره تلاش کنید.");
        console.error(error);
      }
    };

    fetchFavoriteBooks();
  }, [favoriteIds, getFavoriteItems, removeFromFavorites]);

  return (
    <>
      <FavoritesTitle />

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : favoriteBooks.length ? (
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4 justify-center pb-9">
          {favoriteBooks.map((book) => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </div>
      ) : (
        <EpmtyFavorites />
      )}
    </>
  );
}
