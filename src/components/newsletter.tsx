import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="container pt-16 pb-8">
      <div className="bg-[#6C5DD3] py-14 px-1 flex flex-col items-center gap-4 relative overflow-hidden rounded-xl">
        <p className="text-2xl sm:text-3xl font-bold z-10 text-white">
          به خبرنامه ما بپیوندید
        </p>
        <form action="#" className="flex rounded-2xl bg-[#7C6DE3] z-10 sm:w-[500px]">
          <input
            className="text-sm text-white placeholder:text-silver placeholder:text-xs sm:placeholder:text-sm bg-transparent py-4 pr-4 flex-1"
            type="text"
            placeholder="آدرس ایمیل"
          />
          <button
            type="submit"
            className="bg-white text-darkest-purple text-sm sm:text-base rounded-tl-2xl rounded-bl-2xl py-4 px-6 sm:px-9 sm:py-5 font-bold"
          >
            عضویت
          </button>
        </form>

        <Image
          className="absolute z-0 -top-56 -left-20 rotate-90 opacity-30 sm:scale-110"
          src={"shapes/newsletter1.svg"}
          alt="shape"
          width={438}
          height={253}
        />

        <Image
          className="absolute z-0 -bottom-10 -left-5 sm:scale-150"
          src={"shapes/newsletter2.svg"}
          alt="shape"
          width={101}
          height={109}
        />

        <Image
          className="absolute z-0 -top-10 -right-14 sm:scale-150"
          src={"shapes/newsletter3.svg"}
          alt="shape"
          width={101}
          height={109}
        />

        <Image
          className="absolute z-0 -bottom-5 -right-9 sm:scale-150"
          src={"shapes/newsletter1.svg"}
          alt="shape"
          width={77}
          height={63}
        />
      </div>
    </section>
  );
}
