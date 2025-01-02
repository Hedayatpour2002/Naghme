import BestsellersSlider from "@/components/home/bestsellersSlider";

export default function Bestsellers() {
  return (
    <section className="bg-light-ligth-purple">
      <div className="container pt-8 pb-40 flex flex-col items-center justify-center gap-10 max-w-[600px]">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-bold text-2xl sm:text-3xl">پرفروش ترین ها</h2>
          <p className=" text-sm sm:text-base max-w-[450px] text-justify">
            برترین انتخاب‌ها، پرفروش‌ترین کتاب‌های نغمه‌خوان! با کتاب‌هایی که
            هزاران خواننده آن‌ها را انتخاب کرده‌اند، همراه شوید. اینجا بهترین‌ها
            در انتظار شماست؛ از داستان‌های جذاب تا آثار غیرداستانی تأثیرگذار،
            همه را در یک‌جا بیابید.
          </p>
        </div>

        <BestsellersSlider />
      </div>
    </section>
  );
}
