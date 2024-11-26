import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="container">
      <div className="bg-[#6C5DD3] py-14 px-1 flex flex-col items-center gap-4 relative overflow-hidden rounded-xl">
        <p className="text-2xl font-bold z-10 text-white">
          به خبرنامه ما بپیوندید
        </p>
        <form action="#" className="flex rounded-2xl bg-[#7C6DE3] z-10">
          <input
            className="text-sm text-white placeholder:text-silver placeholder:text-xs bg-transparent py-4 pr-4 flex-shrink"
            type="text"
            placeholder="آدرس ایمیل"
          />
          <button
            type="submit"
            className="bg-white text-sm rounded-tl-2xl rounded-bl-2xl py-4 px-6 font-bold"
          >
            عضویت
          </button>
        </form>

        <Image
          className="absolute z-0 -top-56 -left-20 rotate-90 opacity-35"
          src={"shapes/newsletter1.svg"}
          alt="shape"
          width={438}
          height={253}
        />

        <Image
          className="absolute z-0 -bottom-10 -left-5"
          src={"shapes/newsletter2.svg"}
          alt="shape"
          width={101}
          height={109}
        />

        <Image
          className="absolute z-0 -top-10 -right-14"
          src={"shapes/newsletter3.svg"}
          alt="shape"
          width={101}
          height={109}
        />

        <Image
          className="absolute z-0 -bottom-5 -right-9"
          src={"shapes/newsletter1.svg"}
          alt="shape"
          width={77}
          height={63}
        />
      </div>
    </section>
  );
}
