import { useState, useEffect } from "react";
import { StarRating } from "@/components/starRating";
import Image from "next/image";
import Link from "next/link";

export default function BestsellersCard({
  coverURL,
  rating,
  author,
  customClass,
  isActive,
}: {
  coverURL: string;
  rating: number;
  author: { name: string; pictureURL: string }[];
  customClass: string;
  isActive: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <div
      className={`flex flex-col items-center transition-all duration-700 ease-in-out ${customClass}`}
      data-active={isActive}
    >
      <Link
        href={""}
        className={`overflow-hidden w-[215px] h-[307px] rounded-3xl transition-transform duration-700 ease-in-out shadow-2xl ${
          isActive ? "translate-x-0" : "translate-x-[-20px]"
        }`}
      >
        <Image
          src={coverURL}
          alt=""
          width={215}
          height={307}
          className="transition-opacity duration-700"
        />
      </Link>

      {isVisible && author[0] && (
        <div
          className={`absolute -bottom-[90px] flex flex-col items-center gap-2 transition-all duration-700 ease-in-out origin-top ${
            isActive
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-[-10px] opacity-0 scale-50"
          }`}
        >
          <Image
            className="rounded-full border-4 border-white"
            src={author[0].pictureURL}
            alt={author[0].name}
            width={80}
            height={80}
          />
          <p className="font-bold text-xs sm:text-base">{author[0].name}</p>
          <StarRating rating={rating} />
        </div>
      )}
    </div>
  );
}
