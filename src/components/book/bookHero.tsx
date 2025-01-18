import Image from "next/image";
import { StarRating } from "../starRating";
import BookActionButtons from "../BookActionButtons";
import useUserStore from "@/stores/userStore";
import { useStore } from "@/stores/useStore";
import { useEffect } from "react";
import getUser from "@/utils/getUser";

export default function BookHero() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const {
    favorites,
    cart,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    removeFromCart,
  } = useStore();

  const productId = "1";
  const isInCart = cart.includes(productId);
  const isLiked = favorites.includes(productId);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, [setUser]);

  const handleBuy = () => {
    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const handleDelete = () => {
    console.log("Delete product with ID:", productId);
    // API call to delete the product
  };

  const handleEdit = () => {
    console.log("Edit product with ID:", productId);
    // Navigation to edit page or open modal
  };
  return (
    <section className="flex flex-col gap-16 items-center justify-center lg:flex-row-reverse pb-9 lg:pt-9">
      <div className="w-fit relative top-9 flex-shrink-0">
        <Image
          src="/sample/images.jpg"
          alt=""
          width={400}
          height={572}
          className="rounded-[20px]"
        />
        <div className="font-semibold text-lg bg-dark-red rounded-bl-[20px] rounded-br-[20px] w-full text-white h-[100px] relative -top-[25px] flex items-end justify-center -z-10 pb-6 shadow-2xl shadow-[#FF6B00]/30">
          فروش ویژه
        </div>
      </div>
      <section className="flex gap-4 flex-col self-start lg:gap-8 lg:max-w-[533px]">
        <div className="flex gap-7">
          <div className="border border-dark-red rounded-lg flex gap-4 py-3 px-5 items-center justify-center">
            <span className="text-dark-red relative top-0.5">4.5</span>
            <StarRating rating={4.5} />
          </div>
          <div className="border border-light-silver text-light-blue py-3 text-center rounded-lg px-5 min-w-40">
            <span className="relative top-0.5">127 نظر</span>
          </div>
        </div>

        <h1 className="font-semibold text-3xl">صد سال تنهایی</h1>

        <div className="flex gap-4 items-center">
          <Image
            src={"/sample/home-bestsellers/picture.png"}
            alt=""
            width={52}
            height={52}
            className="rounded-full"
          />
          <p className="opacity-80">گابریل گارسیا مارکز</p>
        </div>

        <p className="opacity-70 text-xs leading-7">
          مارکز در این کتاب وضعیت جغرافیایی و آداب و رسوم بومیان سرخپوست آمریکای
          لاتین را به‌خوبی نمایانده است؛ گویی آیینه‌ای دربرابر ملتش گرفته تا همه
          ویژگیهای آنها را بنمایاند. کسی که این اثر را می‌خواند، اگر هم به
          کشورهای آمریکای لاتین سفری نداشته و یا حتی درباره آنها هیچ اطلاعی
          نداشته باشد؛ حس می‌کند آن سرزمین و مردمش را به‌خوبی می‌شناسد. اعتقادات
          باستانی‌ای که گاه در اثر خیالپردازیها و اغراقهای بومیانش خرافات
          به‌نظرمی رسند، همه در این اثر به‌خوبی آشکار است. نکته‌ای که در این
          کتاب بسیار چشمگیر و مضمون اصلی این رمان را رقم می‌زند، اثبات وجود عشق
          و قدرت پایان‌ناپذیر آن است. این کتاب که تاریخ‌نگاری یک قرن از زندگی یک
          خانواده پرجمعیت است به‌خوبی می‌رساند که این خانواده با آنکه بسیار
          پرجمعیت است؛ اما هریک در تنهایی خود به‌سر می‌برند که راه ورود به حریم
          آن بر دیگر افراد خانواده بسته است. وقتی عشق درمیان نسل آنها وجود
          ندارد، همه دچار ناکامیهای زندگی می‌شوند و خود نیز راز این ناکامیها را
          نمی‌دانند که همانا در عدم توانایی آنها در عاشق‌شدن است و ما تنها
          درباره آخرین فرزند این خاندان می‌خوانیم که تنها او درنتیجه عشق به‌دنیا
          آمده است.
        </p>

        <div className="flex items-center gap-3">
          <p className="flex gap-1 items-center">
            <span className="bg-dark-red py-0.5 px-2 text-sm font-bold text-white rounded-md flex items-center justify-center">
              <span className="relative -bottom-0.5">90%</span>
            </span>
            <span className="text-xs text-silver line-through relative top-0.5">
              100,000
            </span>
          </p>
          <p className="flex items-center">
            <span className="text-4xl text-dark-red font-semibold leading-none top-0.5">
              10,000
            </span>
            <span className="font-semibold text-sm">تومان</span>
          </p>
        </div>
        <div className="flex flex-row-reverse justify-between self-start min-w-64 gap-8">
          <BookActionButtons
            userRole={user?.role}
            isInCart={isInCart}
            isLiked={isLiked}
            handleBuy={handleBuy}
            handleLike={handleLike}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </section>
    </section>
  );
}
