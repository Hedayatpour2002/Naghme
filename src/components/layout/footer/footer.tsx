import Image from "next/image";
import Logo from "@/components/logo";
import SocialMedia from "@/components/layout/footer/socialMedia";
import FooterNav from "./footerNav";

export default function Footer() {
  return (
    <footer className="container flex flex-col gap-4 mt-8 pb-4">
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

        <FooterNav />

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
