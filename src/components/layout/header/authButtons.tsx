import Image from "next/image";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <section className="flex gap-2 md:gap-4 font-bold text-sm sm:text-base md:text-lg flex-shrink-0">
      <Link
        href={"/signup"}
        className="flex gap-2 md:gap-5 px-3 py-2 bg-dark-purple shadow-xl text-white rounded-xl hover:opacity-90 flex-nowrap text-nowrap md:px-8 md:py-3 "
      >
        ثبت نام
        <Image
          className="hidden sm:block md:w-6 md:h-6"
          src={"/icon/user.svg"}
          alt="user icon"
          width={16}
          height={16}
        />
      </Link>
      <Link
        href={"/login"}
        className="px-3 py-2 md:py-3 md:px-7 bg-light-purple text-dark-purple rounded-xl hover:opacity-90"
      >
        ورود
      </Link>
    </section>
  );
}
