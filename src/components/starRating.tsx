// import Image from "next/image";

import Image from "next/image";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-2">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Image
            src={"/icon/full-star.svg"}
            alt="full-star"
            key={`full-${i}`}
            width={21.81}
            height={19.25}
          />
        ))}

      {hasHalfStar && (
        <Image
          src={"/icon/half-star.svg"}
          alt="half-star"
          width={21.81}
          height={19.25}
          className="-scale-x-[1]"
        />
      )}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Image
            src={"/icon/empty-star.svg"}
            alt="empty-star"
            key={`empty-${i}`}
            width={21.81}
            height={19.25}
          />
        ))}
    </div>
  );
}
