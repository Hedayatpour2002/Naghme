import Image from "next/image";

export default function Hero() {
  return (
    <section className="overflow-hidden relative">
      <div className="container pb-8 flex flex-col-reverse lg:flex-row-reverse lg:items-center lg:justify-center z-10">
        <div className="flex flex-col gap-6 z-10">
          <h1 className="flex flex-col text-4xl md:text-[42px] font-bold text-center lg:text-right">
            <span>
              <span className="text-dark-red">نغمه‌ای</span> برای هر گوش،
            </span>
            <span>
              <span className="text-dark-red">کتابی</span> برای هر دل
            </span>
          </h1>
          <h2 className="text-light-blue sm:w-[370px] md:max-w-[430px] text-center mx-auto lg:text-right">
            کتاب‌های خود را پیدا کنید؛ بیش از ۳۰۰,۰۰۰ کتاب الکترونیکی و صوتی در
            همه موضوعات را کاوش کنید.
          </h2>
        </div>
        <Image
          src={"/images/books_home.webp"}
          alt="books"
          width={700}
          height={700}
          className="z-10"
        />
      </div>

      <div className="w-96 h-96 bg-[#D7D2F2] absolute -top-1/4 xl:-top-30 xl:-left-20 -left-1/4 rounded-full z-0 lg:scale-150"></div>
    </section>
  );
}
