import Filter from "@/components/books/filter";
import { getCategories, getGenres } from "@/services/coreService";
import { useEffect, useState } from "react";

interface FiltersProps {
  isOpen: boolean;
  filters: any; // دریافت فیلترها از Books
  onUpdateFilters: (newFilters: any) => void; // برای به‌روزرسانی فیلترها و URL
}

interface genre {
  genre_id: number;
  genre_name: string;
}

interface Category {
  category_id: number;
  category_name: string;
}

export default function Filters({
  isOpen,
  filters,
  onUpdateFilters,
}: FiltersProps) {
  const [genres, setGenres] = useState<genre[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resGenres = await getGenres();
        setGenres(resGenres.message);

        const resCategories = await getCategories();
        setCategories(resCategories.message);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("خطا در دریافت ژانرها. لطفاً دوباره تلاش کنید.");
        }
      }
    };

    fetchData();
  }, []);

  const toggleGenreSelection = (genreId: number) => {
    // فقط یک ژانر را انتخاب می‌کنیم
    const newGenres = filters.genres[0] === genreId ? [] : [genreId];

    onUpdateFilters({ ...filters, genres: newGenres });
  };

  const toggleCategorySelection = (categoryId: number) => {
    // فقط یک دسته‌بندی را انتخاب می‌کنیم
    const newCategories =
      filters.categories[0] === categoryId ? [] : [categoryId];

    onUpdateFilters({ ...filters, categories: newCategories });
  };

  return (
    <aside
      className={`sticky top-4 transition-all duration-300 overflow-hidden md:max-w-56 xl:max-w-none flex-shrink-0 flex flex-col gap-4 ${
        isOpen ? "md:w-64 h-auto opacity-100" : "md:w-0 h-0 md:h-auto opacity-0"
      }`}
    >
      <p className="font-semibold text-3xl ">فیلتر</p>

      <Filter title="مرتب سازی">
        <ul className="flex flex-col gap-4">
          {[
            "best_selling",
            "newest",
            "lowest_price",
            "highest_price",
            "highest_rated",
            "most_viewed",
          ].map((option) => (
            <li
              key={option}
              className={`${
                filters.sort_by === option ? "text-dark-purple font-bold" : ""
              }`}
              onClick={() => onUpdateFilters({ ...filters, sort_by: option })}
            >
              {option === "best_selling" && "پرفروش ترین ها"}
              {option === "newest" && "جدید ترین ها"}
              {option === "lowest_price" && "قیمت از کم به زیاد"}
              {option === "highest_price" && "قیمت از زیاد به کم"}
              {option === "highest_rated" && "امتیاز کاربران"}
              {option === "most_viewed" && "تعداد نظرات"}
            </li>
          ))}
        </ul>
      </Filter>

      <Filter title="دسته بندی">
        <ul className="flex flex-col gap-4">
          {categories
            .slice(0, showAllCategories ? categories.length : 6)
            .map((category) => (
              <div key={category.category_id} className="flex gap-2">
                <input
                  type="checkbox"
                  id={`category-${category.category_id}`}
                  checked={filters.categories.includes(category.category_id)}
                  onChange={() => toggleCategorySelection(category.category_id)}
                />
                <label
                  htmlFor={`category-${category.category_id}`}
                  className={`${
                    filters.categories.includes(category.category_id)
                      ? "font-bold text-dark-purple"
                      : ""
                  }`}
                >
                  {category.category_name}
                </label>
              </div>
            ))}
          <button
            className="text-dark-purple font-bold text-start text-sm"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? "- کمتر" : "+ بیشتر"}
          </button>
        </ul>
      </Filter>

      <Filter title="ژانر">
        <ul className="flex flex-col gap-4">
          {genres.slice(0, showAllGenres ? genres.length : 6).map((genre) => (
            <div key={genre.genre_id} className="flex gap-2">
              <input
                type="checkbox"
                id={`genre-${genre.genre_id}`}
                checked={filters.genres.includes(genre.genre_id)}
                onChange={() => toggleGenreSelection(genre.genre_id)}
              />
              <label
                htmlFor={`genre-${genre.genre_id}`}
                className={`${
                  filters.genres.includes(genre.genre_id)
                    ? "font-bold text-dark-purple "
                    : ""
                }`}
              >
                {genre.genre_name}
              </label>
            </div>
          ))}
          <button
            className="text-dark-purple font-bold text-start text-sm"
            onClick={() => setShowAllGenres(!showAllGenres)}
          >
            {showAllGenres ? "- کمتر" : "+ بیشتر"}
          </button>
        </ul>
      </Filter>

      <button
        className="text-light-blue border border-dark-purple rounded-lg py-5 font-semibold"
        onClick={() => {
          onUpdateFilters({
            ...filters,
            genres: [],
            categories: [],
            sort_by: null, 
          });
        }}
      >
        بازنشانی
      </button>
    </aside>
  );
}
