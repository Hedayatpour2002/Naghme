"use client";

import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";
import CartTitle from "@/components/cart/cartTitle";
import EpmtyCart from "@/components/cart/emptyCart";
import CartDetails from "./cartDetails";
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

export default function Cart() {
  const { getCartItems, removeFromCart } = useStore();
  const [cartBooks, setCartBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const cartIds = getCartItems();

  useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const fetchedBooks = await Promise.all(
          cartIds.map(async (id) => {
            try {
              const res = await getBook(+id);
              return res.message;
            } catch (error) {
              if (error instanceof Error) {
                console.error(`Error fetching book ID ${id}: ${error.message}`);
              } else {
                console.error("Error fetching book data");
              }
              removeFromCart(id);
              return null;
            }
          })
        );

        const validBooks = fetchedBooks.filter(
          (book) => book !== null
        ) as Book[];
        setCartBooks(validBooks);
      } catch (error) {
        setError("خطا در دریافت اطلاعات کتاب‌ها. لطفاً دوباره تلاش کنید.");
        console.error(error);
      }
    };

    fetchCartBooks();
  }, [cartIds, getCartItems, removeFromCart]);

  const calculateTotal = () => {
    let totalPrice = 0;
    let totalDiscount = 0;

    cartBooks.forEach((book) => {
      totalPrice += book.price;
      if (book.is_off > 0) {
        totalDiscount += book.price * (book.is_off / 100);
      }
    });

    const totalToPay = totalPrice - totalDiscount;
    return { totalPrice, totalDiscount, totalToPay };
  };

  const handleEmptyCart = () => {
    cartBooks.forEach((book) => {
      removeFromCart(book.book_id.toString());
    });
    setCartBooks([]);
  };

  const { totalPrice, totalDiscount, totalToPay } = calculateTotal();

  return (
    <>
      <CartTitle />

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : cartBooks.length ? (
        <>
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4 justify-center pb-9">
            {cartBooks.map((book) => (
              <BookCard key={book.book_id} book={book} />
            ))}
          </div>
          <div className="h-[572px]">
            <CartDetails
              totalPrice={totalPrice}
              totalDiscount={totalDiscount}
              totalToPay={totalToPay}
              handleEmptyCart={handleEmptyCart}
            />
          </div>
        </>
      ) : (
        <EpmtyCart />
      )}
    </>
  );
}
