import Image from "next/image";
import Link from "next/link";

export default function FooterNav() {
  return (
    <nav className="flex justify-between w-80 self-center">
      <div className="flex flex-col gap-2">
        <p className="font-bold">دسترسی سریع</p>
        <ul className="flex flex-col gap-1">
          <li>
            <Link href={"/"}>درباره‌ی ما</Link>
          </li>
          <li>
            <Link href={"/"}>ارتباط با ما</Link>
          </li>
          <li>
            <Link href={"/"}>محصولات</Link>
          </li>
          <li>
            <Link href={"/login"}>ورود</Link>
          </li>
          <li>
            <Link href={"/signup"}>ثبت نام</Link>
          </li>
          <li>
            <Link href={"/"}>سوالات متداول</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">دسته‌بندی کتاب‌ها</p>
        <ul className="flex flex-col gap-1">
          <li>
            <Link href={"/"}>اکشن</Link>
          </li>
          <li>
            <Link href={"/"}>ماجراجویانه</Link>
          </li>
          <li>
            <Link href={"/"}>جنایی</Link>
          </li>
          <li>
            <Link href={"/"}>درام</Link>
          </li>
          <li>
            <Link href={"/"}>فانتزی</Link>
          </li>
          <li>
            <Link
              href={"/"}
              className="text-dark-purple flex items-center gap-1"
            >
              مشاهده ی همه
              <Image
                src={"/icon/left.svg"}
                alt="left icon"
                width={16}
                height={16}
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
