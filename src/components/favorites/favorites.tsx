"use client";
// import Image from "next/image";

import { useStore } from "@/stores/useStore";
import BookCard from "@/components/bookCard";
import FavoritesTitle from "@/components/favorites/favoritesTitle";

export default function Favorites() {
  const { getFavoriteItems } = useStore();

  const favoriteIds = getFavoriteItems();

  return (
    <>
      <FavoritesTitle />
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4 justify-center pb-9">
        {favoriteIds.length ? (
          favoriteIds.map((id) => <BookCard key={id} />)
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
