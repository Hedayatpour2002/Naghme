"use client";
import { useEffect, useState } from "react";
import BookCard from "@/components/bookCard";
import BooksTitle from "@/components/books/booksTitle";
import Filters from "@/components/books/filters";
import { getBooksList } from "@/services/coreService";
import { useRouter } from "next/navigation";

export default function Books() {
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    book_name: "",
    authors: [],
    publishers: [],
    categories: [],
    genres: [],
    price_min: undefined,
    price_max: undefined,
    sort_by: null,
  });

  function toggleFilterFun() {
    setIsOpen((prev) => !prev);
  }

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const newFilters = {
      book_name: params.get("book_name") || "",
      authors: params.get("authors")?.split(",") || [],
      publishers: params.get("publishers")?.split(",") || [],
      categories: params.get("categories")?.split(",") || [],
      genres: params.get("genres")?.split(",") || [],
      price_min: params.get("price_min")
        ? parseInt(params.get("price_min") || "0")
        : undefined,
      price_max: params.get("price_max")
        ? parseInt(params.get("price_max") || "0")
        : undefined,
      sort_by: params.get("sort_by") || null,
    };

    setFilters(newFilters);
    loadBooks(newFilters);
  }, []);

  const loadBooks = async (filters: any) => {
    setLoading(true);
    try {
      const fetchedBooks = await getBooksList(filters);
      setBooks(fetchedBooks.message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("خطا در دریافت لیست کتاب‌ها. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  // بروزرسانی فیلترها و URL
  const updateFiltersAndUrl = (newFilters: any) => {
    setFilters(newFilters);

    // حذف فیلدهایی که مقدارشان undefined، null یا آرایه/رشته خالی هستند
    const filteredFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== "";
      })
    );

    // ساخت URLSearchParams با پارامترهای صحیح
    const newUrlParams = new URLSearchParams();

    // برای هر فیلد، اگر مقدار آرایه باشد، به صورت جداگانه به URL اضافه می‌شود
    Object.entries(filteredFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          newUrlParams.append(key, item); // برای هر آیتم به صورت جداگانه اضافه می‌شود
        });
      } else {
        newUrlParams.append(key, value);
      }
    });

    // تغییر URL بلافاصله بعد از تغییر فیلترها
    router.push(`?${newUrlParams.toString()}`, undefined);

    // ترکیب فیلترها برای ارسال به بک‌اند
    const backendFilters = {
      book_name: newFilters.book_name,
      authors: newFilters.authors.join(","),
      publishers: newFilters.publishers.join(","),
      categories: newFilters.categories.join(","),
      genres: newFilters.genres.join(","),
      price_min: newFilters.price_min,
      price_max: newFilters.price_max,
      sort_by: newFilters.sort_by,
    };

    // بارگذاری کتاب‌ها به صورت همزمان
    loadBooks(backendFilters);
  };

  return (
    <>
      <BooksTitle toggleFilterFun={toggleFilterFun} isOpen={isOpen} />

      <div className="flex flex-col md:flex-row md:items-start overflow-hidden">
        <Filters
          isOpen={isOpen}
          filters={filters} // ارسال فیلترها به Filters
          onUpdateFilters={updateFiltersAndUrl} // ارسال تابع بروزرسانی فیلترها
        />
        <div
          className={`w-fit mx-auto grid grid-cols-1 gap-y-6 gap-x-4 justify-center py-9 ${
            isOpen
              ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
              : "md:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {loading ? (
            <div className="w-full h-48 flex justify-center items-center gap-4">
              <div className="w-8 h-8 animate-spin border-t-dark-purple border-b-dark-purple border-2 rounded-full"></div>
            </div>
          ) : (
            <>
              {error && <p className="text-red-500">{error}</p>}
              {books.length > 0
                ? books.map((book, index) => (
                    <BookCard key={index} book={book} />
                  ))
                : !error && <p>هیچ کتابی یافت نشد.</p>}
            </>
          )}
        </div>
      </div>
    </>
  );
}
