import Logo from "@/components/logo";
import Image from "next/image";
import Link from "next/link";
import SocialMedia from "../socialMedia";

export default function Footer() {
  return (
    <footer className="container flex flex-col gap-4 pt-8 pb-4">
      <section className="flex flex-col lg:flex-row gap-8 lg:justify-between">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 items-center">
            <Logo />
            <div className=" font-bold">
              <p>
                <span className="text-dark-red">نغمه‌ای</span> برای هر گوش
              </p>
              <p>
                <span className="text-dark-red">کتابی</span> برای هر دل
              </p>
            </div>
          </div>
          <p className="text-justify max-w-96">
            نغمه‌، تجربه‌ای نوین در دنیای کتاب‌های الکترونیکی و صوتی. با
            مجموعه‌ای گسترده از کتاب‌های پرفروش، داستان‌های جذاب و آثار
            غیرداستانی در هر موضوع، همراه شما هستیم. چه بخواهید بشنوید یا
            بخوانید، نغمه‌ همیشه و در هر زمان همراه شماست. با ما دنیاهای جدید را
            کشف کنید و از لحظاتتان لذت ببرید.
          </p>
        </div>
        <div className="flex justify-between w-80 self-center">
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
        </div>
        <div className="md:w-96 lg:w-auto flex justify-between items-center sm:items-end mx-auto lg:mx-0 flex-col-reverse sm:flex-row lg:flex-col-reverse self-center gap-6">
          <div className="flex flex-col gap-6 lg:gap-2 pb-2">
            <div className="text-center">ما را دنبال کنید:</div>
            <SocialMedia />
          </div>
          <div className="flex flex-col gap-1" dir="ltr">
            <div className="flex items-center gap-2">
              <Image
                src={"/icon/phone.svg"}
                alt="phone icon"
                width={24}
                height={24}
              />
              <p>+98 911123 4567</p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src={"/icon/email.svg"}
                alt="phone icon"
                width={24}
                height={24}
              />
              <p>support@example.com</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-light-light-silver py-4 md:py-7 text-xs md:text-base flex flex-col sm:flex-row items-center justify-between">
        <p>نغمه‌ - فروشگاه کتاب | © 2024 تمامی حقوق محفوظ است</p>
        <p>ساخته شده با عشق توسط تیم نغمه‌</p>
      </section>
    </footer>
  );
}
