import Filter from "@/components/books/filter";

export default function Filters({ isOpen }) {
  return (
    <aside
      className={`sticky top-4 transition-all duration-300 overflow-hidden md:max-w-56 xl:max-w-none flex-shrink-0 flex flex-col gap-4 ${
        isOpen ? "md:w-64 h-auto opacity-100" : "md:w-0 h-0 md:h-auto opacity-0"
      }`}
    >
      <p className="font-semibold text-3xl ">فیلتر</p>
      <Filter title="مرتب سازی" items="" isCheckBox="" />
      <Filter title="مرتب سازی" items="" isCheckBox="" />

      <Filter title="مرتب سازی" items="" isCheckBox="" />

      <Filter title="مرتب سازی" items="" isCheckBox="" />
    </aside>
  );
}
