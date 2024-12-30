import Image from "next/image";
import SwiperCore from "swiper";

interface SliderControlProps {
  direction: "prev" | "next";
  swiperRef: React.RefObject<SwiperCore | null>;
}

export default function SliderControl({
  direction,
  swiperRef,
}: SliderControlProps) {
  const iconSrc =
    direction === "prev" ? "/icon/arrow-right.svg" : "/icon/arrow-left.svg";

  const altText = direction === "prev" ? "arrow-right-icon" : "arrow-left-icon";

  const onClickHandler =
    direction === "prev"
      ? () => swiperRef.current?.slidePrev()
      : () => swiperRef.current?.slideNext();

  return (
    <button
      className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center flex-shrink-0 bg-white"
      onClick={onClickHandler}
    >
      <Image src={iconSrc} alt={altText} width={24} height={24} />
    </button>
  );
}
