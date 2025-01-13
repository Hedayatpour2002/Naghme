export default function CartTitle() {
  return (
    <div className="flex flex-col gap-1 py-4">
      <h2 className="font-semibold text-3xl">سبد خرید</h2>
      <p className="text-dark-blue/60 text-sm py-2">
        در این بخش، کتاب‌هایی که به سبد خرید شما اضافه شده‌اند، نمایش داده
        می‌شوند. شما می‌توانید قبل از نهایی کردن خرید، لیست کتاب‌ها را بررسی و
        در صورت نیاز تغییراتی اعمال کنید.
      </p>
    </div>
  );
}
