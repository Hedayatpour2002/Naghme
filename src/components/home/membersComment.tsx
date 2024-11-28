"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Autoplay } from "swiper/modules";
import { useRef } from "react";
import SwiperCore from "swiper";

import MemberCommentCard from "./memberCommentCard";

import "swiper/css";
import Image from "next/image";

const datas = [
  {
    id: 1,
    imageURL: "/images/userProfile/boy1.svg",
    name: "شروین",
    desc: "خیلی خوشحالم که این سایت رو پیدا کردم. انتخاب کتاب‌های الکترونیکی متنوعه و خرید سریع و راحت انجام میشه. عالیه!",
  },
  {
    id: 2,
    imageURL: "/images/userProfile/girl1.svg",
    name: "مهسا",
    desc: "اینجا بهترین سایت برای خرید کتاب‌های الکترونیکی با قیمت مناسب هست. کتاب‌هایی که می‌خواستم رو به راحتی پیدا کردم.",
  },
  {
    id: 3,
    imageURL: "/images/userProfile/boy2.svg",
    name: "احمد",
    desc: "کتاب‌های صوتی که از اینجا خریدم کیفیت ضبط بسیار بالایی داشتن. حتماً دوباره از اینجا خرید می‌کنم.",
  },
  {
    id: 4,
    imageURL: "/images/userProfile/girl1.svg",
    name: "زهرا",
    desc: "من از پشتیبانی این سایت خیلی راضی بودم. خیلی سریع به سوالاتم جواب دادن و مشکلم رو حل کردن.",
  },
  {
    id: 5,
    imageURL: "/images/userProfile/boy1.svg",
    name: "رضا",
    desc: "امکان دانلود مستقیم و سریع باعث شده که همیشه از این سایت خرید کنم. کیفیت فایل‌ها هم عالیه!",
  },
  {
    id: 6,
    imageURL: "/images/userProfile/girl1.svg",
    name: "الهام",
    desc: "کتاب‌های نایابی که مدت‌ها دنبالشون بودم رو اینجا پیدا کردم. واقعاً از خدمات سایت راضی‌ام.",
  },
  {
    id: 7,
    imageURL: "/images/userProfile/boy1.svg",
    name: "علی",
    desc: "امکان خرید آسان و محیط کاربری ساده این سایت باعث شده که من همیشه ازش خرید کنم. واقعاً کارتون درسته!",
  },
  {
    id: 8,
    imageURL: "/images/userProfile/girl1.svg",
    name: "مریم",
    desc: "از تخفیف‌های جذابی که روی کتاب‌ها می‌ذارید خیلی خوشم میاد. همیشه منتظر تخفیف‌های جدید هستم.",
  },
  {
    id: 9,
    imageURL: "/images/userProfile/boy1.svg",
    name: "محمد",
    desc: "از سرعت دانلود و کیفیت بالای فایل‌های صوتی این سایت خیلی راضی‌ام. پیشنهاد می‌کنم همه استفاده کنن.",
  },
  {
    id: 10,
    imageURL: "/images/userProfile/girl1.svg",
    name: "فاطمه",
    desc: "کتاب‌هایی که از اینجا خریدم بسیار باکیفیت و بدون مشکل بودن. امیدوارم همیشه همین‌طور عالی باشید.",
  },
];

export default function MembersComment() {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <section className="flex flex-col bg-light-ligth-purple pt-10">
      <p className="text-center font-bold text-2xl sm:text-3xl">
        <span>نظرات </span>
        <span className="text-dark-red">کاربران </span>
      </p>
      <div className="container flex justify-between items-center">
        <button
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center flex-shrink-0 bg-white"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Image
            src={"/icon/arrow-right.svg"}
            alt="arrow-right-icon"
            width={24}
            height={24}
          />
        </button>

        <Swiper
          modules={[Virtual, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          virtual
          loop={true}
          className="!py-10 !px-4"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {datas.map((slideContent, index) => (
            <SwiperSlide key={slideContent.id} virtualIndex={index}>
              <MemberCommentCard {...slideContent} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center flex-shrink-0 bg-white"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Image
            src={"/icon/arrow-left.svg"}
            alt="arrow-left-icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </section>
  );
}
