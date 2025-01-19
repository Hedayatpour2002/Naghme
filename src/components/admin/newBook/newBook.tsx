"use client";
import { useState, useTransition } from "react";
import FormError from "@/components/auth/formError";
import FormSuccess from "@/components/auth/formSuccess";
import { addNewBookSchema } from "@/schemas";
import { z } from "zod";
import TextInput from "@/components/textInput";
import NumberInput from "@/components/numberInput";
import Image from "next/image";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import MultiSelectAuthor from "./multiSelectAuthor";
import MultiSelectPublisher from "./multiSelectPublisher";
import MultiSelectCategory from "./multiSelectCategory";
import MultiSelectGener from "./multiSelectGenre";

type Errors = {
  title?: string;
  price?: string;
  off?: string;
  format?: string;
  descriptions?: string;
  publishDate?: string;
  selectedAuthors?: string;
  selectedPublishers?: string;
  selectedCategories?: string;
  selectedGenres?: string;
};

interface Author {
  image: string;
  author: string;
}
interface Category {
  categoryId: string;
  categoryName: string;
}

interface Gener {
  genreId: string;
  genreName: string;
}

export default function NewBook() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [off, setOff] = useState<string>("");
  const [format, setFormat] = useState<string>("TEXT");
  const [descriptions, setDescriptions] = useState<string>("");
  const [publishDate, setPublishDate] = useState<DateObject | undefined>();
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Gener[]>([]);

  const [errors, setErrors] = useState<Errors>({});
  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [persianDate, setPersianDate] = useState(false);

  const validateBookForm = (): boolean => {
    try {
      console.log({
        title,
        price,
        off,
        format,
        descriptions,
        publishDate: publishDate?.format("YYYY-MM-DD"),
        selectedAuthors,
        selectedPublishers,
        selectedCategories,
        selectedGenres,
      });
      addNewBookSchema.parse({
        title,
        price,
        off,
        format,
        descriptions,
        publishDate: publishDate?.format("YYYY-MM-DD"),
        selectedAuthors,
        selectedPublishers,
        selectedCategories,
        selectedGenres,
      });
      setErrors({});
      return true;
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const validationErrors: Errors = {};
        err.errors.forEach((error) => {
          validationErrors[error.path[0] as keyof Errors] = error.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  function submitHnadler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");

    if (validateBookForm()) {
      startTransition(async () => {
        // api call
      });
    }
  }
  return (
    <form
      onSubmit={submitHnadler}
      className="my-9 py-6 border px-4 shadow-xl rounded-lg flex flex-col w-fit mx-auto gap-6 "
    >
      <h2 className="text-xl font-bold flex gap-4 items-center">
        <AddSvg />
        افزودن کتاب جدید
      </h2>
      <TextInput
        id="title"
        label="عنوان کتاب"
        value={title}
        placeholder="نام کتاب را وارد کنید."
        handleEventChange={(e) => {
          setTitle(e.target.value);
        }}
        error={errors.title}
        isPending={isPending}
      />
      <NumberInput
        id="price"
        label="قیمت"
        value={price}
        placeholder="قیمت را وارد کنید."
        handleEventChange={(e) => {
          setPrice(e.target.value);
        }}
        error={errors.price}
        isPending={isPending}
      />

      <NumberInput
        id="off"
        label="تخفیف"
        value={off}
        placeholder="درصد تخفیف را وارد کنید."
        handleEventChange={(e) => {
          setOff(e.target.value);
        }}
        error={errors.off}
        isPending={isPending}
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="format"
          className={`pr-6 ${errors.format && "text-dark-red"}`}
        >
          فرمت
        </label>

        <select
          id="format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className={`border rounded-lg w-full max-w-[435px] py-3 px-6 ${
            errors.format ? "border-dark-red" : "border-silver"
          }`}
        >
          <option value="TEXT">الکترونیکی</option>
          <option value="AUDIO">صوتی</option>
        </select>

        {errors.format && (
          <p className="text-dark-red pr-6 rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.format}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="descriptions"
          className={`pr-6 ${errors.descriptions && "text-dark-red"}`}
        >
          توضیحات
        </label>
        <textarea
          id="descriptions"
          value={descriptions}
          placeholder="توضیحات محصول را وارد کنید."
          rows={10}
          onChange={(e) => setDescriptions(e.target.value)}
          className={`rounded-xl w-full max-w-[435px] py-3 px-6 border ${
            errors.descriptions ? "border-dark-red" : "border-silver"
          } rounded`}
        />
        {errors.descriptions && (
          <p className="text-dark-red pr-6 rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.descriptions}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="publishDate"
          className={`pr-6 ${errors.publishDate && "text-dark-red"}`}
        >
          تاریخ انتشار
        </label>
        <div
          id="publishDate"
          style={{ direction: "rtl" }}
          className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start"
        >
          <DatePicker
            inputClass={`rounded-xl w-full min-w-[320px] sm:min-w-0 py-3 px-3 border text-center ${
              errors.publishDate ? "border-dark-red" : "border-silver"
            } rounded`}
            placeholder="2025-12-01"
            calendar={persianDate ? persian : undefined}
            locale={persianDate ? persian_fa : undefined}
            calendarPosition={persianDate ? "bottom-right" : undefined}
            value={publishDate}
            onChange={setPublishDate}
          />
          <div
            onClick={() => {
              setPersianDate((prev) => !prev);
            }}
            className={`flex-grow rounded-xl w-full text-center shadow-xl py-3 px-4 border text-white bg-dark-purple font-bold`}
          >
            {persianDate
              ? "تغییر تاریخ شمسی به میلادی "
              : "تغییر تاریخ میلادی به شمسی"}
          </div>
        </div>
        {errors.publishDate && (
          <p className="text-dark-red pr-6 rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.publishDate}
          </p>
        )}
      </div>

      <MultiSelectAuthor
        selectedItems={selectedAuthors}
        setSelectedItems={setSelectedAuthors}
        error={errors.selectedAuthors}
      />

      <MultiSelectPublisher
        selectedItems={selectedPublishers}
        setSelectedItems={setSelectedPublishers}
        error={errors.selectedPublishers}
      />

      <MultiSelectCategory
        selectedItems={selectedCategories}
        setSelectedItems={setSelectedCategories}
        error={errors.selectedCategories}
      />
      <MultiSelectGener
        selectedItems={selectedGenres}
        setSelectedItems={setSelectedGenres}
        error={errors.selectedGenres}
      />

      <div className="flex flex-col gap-4">
        <div className="min-h-10">
          {actionError && <FormError message={actionError} />}
          {actionSuccess && <FormSuccess message={actionSuccess} />}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="border self-center py-2 px-8 rounded-lg border-dark-purple text-dark-purple"
        >
          {isPending ? "در حال ثبت..." : "ثبت"}
        </button>
      </div>
    </form>
  );
}

function AddSvg() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0H24C30.6274 0 36 5.37258 36 12V24C36 30.6274 30.6274 36 24 36H12C5.37258 36 0 30.6274 0 24V12Z"
        fill="#5C067C"
      />
      <path
        d="M29.4508 15.4441H20.5476V6.54943C20.5476 5.14151 19.4115 4 18.0034 4C16.5953 4 15.4598 5.14151 15.4598 6.55005V15.4503H6.55224C5.14413 15.4503 3.99938 16.5918 4 18.0003C3.99938 18.704 4.28372 19.349 4.74446 19.8097C5.20581 20.2716 5.84233 20.5633 6.54546 20.5633H15.4598V29.4512C15.4598 30.1555 15.7392 30.7931 16.2005 31.2532C16.6619 31.7145 17.2966 32 18.0009 32C19.4084 32 20.5476 30.8585 20.5476 29.4512V20.5627H29.4508C30.859 20.5627 32.0006 19.4113 32 18.0034C31.9994 16.5961 30.8577 15.4441 29.4508 15.4441Z"
        fill="white"
      />
    </svg>
  );
}
