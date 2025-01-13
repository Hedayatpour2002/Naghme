"use client";
import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";
import CartTitle from "@/components/cart/cartTitle";

export default function Cart() {
  const { getCartItems } = useStore();

  const cartIds = getCartItems();
  return (
    <>
      <CartTitle />
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4 justify-center pb-9">
        {cartIds.length ? (
          cartIds.map((id) => <BookCard key={id} />)
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
