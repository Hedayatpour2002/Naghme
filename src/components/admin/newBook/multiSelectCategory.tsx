import { getCategories } from "@/services/coreService";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Item {
  categoryId: number;
  categoryName: string;
}

interface MultiSelectCategoryProps {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
  error: string | undefined;
}

interface Category {
  category_id: number;
  category_name: string;
}

export default function MultiSelectCategory({
  selectedItems,
  setSelectedItems,
  error,
}: MultiSelectCategoryProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories();
        setCategories(res.message);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("خطا در دریافت دسته بندی ها. لطفاً دوباره تلاش کنید.");
        }
      }
    };

    fetchData();
  }, []);

  const filteredData = categories.filter((item) =>
    item.category_name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (item: Item) => {
    if (!selectedItems.find((i) => i.categoryName === item.categoryName)) {
      setSelectedItems([...selectedItems, item]);
    }
    setInputValue("");
  };

  const handleRemove = (item: Item) => {
    setSelectedItems(
      selectedItems.filter((i) => i.categoryName !== item.categoryName)
    );
  };

  return (
    <div className="w-full max-w-[320px] sm:max-w-none flex flex-col gap-2">
      <label
        htmlFor="publishDate"
        className={`pr-6 ${error && "text-dark-red"}`}
      >
        دسته‌بندی‌ها
      </label>
      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-4 border rounded-lg border-silver"
          placeholder="اضافه کردن دسته‌بندی ..."
          value={inputValue}
          onChange={handleInputChange}
        />

        {inputValue && (
          <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg">
            {filteredData.length > 0 && (
              <ul>
                {filteredData.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleSelect({
                        categoryId: item.category_id,
                        categoryName: item.category_name,
                      })
                    }
                  >
                    {item.category_name}
                  </li>
                ))}
              </ul>
            )}

            {filteredData.length === 0 && inputValue && (
              <div className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                دسته بندی موردنظر وجود ندارد
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-dark-red pr-6 rounded-xl py-2 flex gap-2 items-center ">
          <Image
            src={"/icon/alert-error.svg"}
            width={20}
            height={20}
            alt="error icon"
          />
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2 py-3">
        {selectedItems.map((item) => (
          <div
            key={item.categoryName}
            className="inline-flex items-center px-3 py-1 text-sm font-medium bg-light-purple rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2 cursor-pointer"
              viewBox="0 0 20 20"
              fill="#5C067C"
              onClick={() => handleRemove(item)}
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
            {item.categoryName}
          </div>
        ))}
      </div>
    </div>
  );
}
