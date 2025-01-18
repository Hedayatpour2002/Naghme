
export default function BookDetails() {
  const titles = ["نام کتاب", "فرمت کتاب", "نویسنده", "ناشر", "تاریخ انتشار"];
  return (
    <section className="py-8 px-9 flex flex-col gap-8 overflow-hidden">
      <p className="font-semibold text-xl">جزئیات</p>
      <div className="rounded-lg overflow-hidden">
        {titles.map((title, index) => (
          <DetailsRow key={index} title={title} desc="صد سال تنهایی" />
        ))}
      </div>
    </section>
  );
}

interface DetailsRowProps {
  title: string;
  desc: string;
}

function DetailsRow({ title, desc }: DetailsRowProps) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-52 md:w-80 p-7 bg-light-blue text-white font-semibold text-xl">
        {title}
      </div>

      <div className="p-7 bg flex-grow bg-light-ligth-purple">
        <span className="sm:pr-8 text-lg text-light-blue">{desc}</span>
      </div>
    </div>
  );
}
