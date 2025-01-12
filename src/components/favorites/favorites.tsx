"use client";
import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";
// import Image from "next/image";

export default function Favorites() {
  const { getFavoriteItems } = useStore();

  const favoriteIds = getFavoriteItems();

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
        {favoriteIds.length ? (
          favoriteIds.map((id) => <BookCard key={id} />)
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
