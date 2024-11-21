import Image from "next/image";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <section className="flex gap-2 font-bold text-sm flex-shrink-0">
      <Link
        href={"/signup"}
        className="flex gap-2 px-3 py-2 bg-dark-purple shadow-xl text-white rounded-xl hover:opacity-90 flex-nowrap text-nowrap"
      >
        ثبت نام
        <Image
          className="hidden sm:block"
          src={"/icon/user.svg"}
          alt="user icon"
          width={16}
          height={16}
        />
      </Link>
      <Link
        href={"login"}
        className="px-3 py-2 bg-light-purple text-dark-purple rounded-xl hover:opacity-90"
      >
        ورود
      </Link>
    </section>
  );
}
