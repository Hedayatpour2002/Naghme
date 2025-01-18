"use client";

import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";
import CartTitle from "@/components/cart/cartTitle";
import EpmtyCart from "@/components/cart/epmtyCart";
import CartDetails from "./cartDetails";

export default function Cart() {
  const { getCartItems } = useStore();

  const cartIds = getCartItems();
  return (
    <>
      <CartTitle />

      {cartIds.length ? (
        <>
          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4 justify-center pb-9">
            {cartIds.map((id) => (
              <BookCard key={id} />
            ))}
          </div>
          <div className="h-[572px]">
            <CartDetails />
          </div>
        </>
      ) : (
        <EpmtyCart />
      )}
    </>
  );
}
