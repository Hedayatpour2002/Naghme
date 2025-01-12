"use client";
import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";

export default function Cart() {
  const { getCartItems } = useStore();

  const cartIds = getCartItems();
  return (
    <>
      <div className="flex flex-col gap-1 py-4">
        <h2 className="font-semibold text-3xl">کتاب های مورد علاقه</h2>
        <p className="text-dark-blue/60 text-sm py-2">
          در این بخش، کتاب‌هایی که توسط شما لایک شده‌اند و مورد توجه‌تان قرار
          گرفته‌اند، نمایش داده می‌شوند.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-start pb-9">
        {cartIds.length ? (
          cartIds.map((id) => <BookCard key={id} />)
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
