import BookCard from "@/components/bookCard";
import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

export default function Books() {
  return (
    <>
      <Breadcrumbs />
      <main className="container">
        <div className="flex justify-between items-center py-4 gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-3xl">کتاب ها</h2>
            <p className="text-dark-blue/60 text-sm py-2 max-w-[300px] sm:max-w-none">
              بیش از ۴۷۵ کتاب اینجا موجود است، همین حالا کتاب مورد نظرتان را
              پیدا کنید!
            </p>
          </div>

          <button className="flex border border-dark-purple gap-2 py-2 px-4 rounded-lg text-dark-purple text-nowrap">
            <span>جست و جوی پیشرفته</span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden sm:block"
            >
              <path
                d="M21 5.25H10.5C10.5 4.42275 9.82725 3.75 9 3.75H7.5C6.67275 3.75 6 4.42275 6 5.25H3C2.586 5.25 2.25 5.58525 2.25 6C2.25 6.41475 2.586 6.75 3 6.75H6C6 7.57725 6.67275 8.25 7.5 8.25H9C9.82725 8.25 10.5 7.57725 10.5 6.75H21C21.414 6.75 21.75 6.41475 21.75 6C21.75 5.58525 21.414 5.25 21 5.25ZM7.5 6.75V5.25H9L9.00075 5.997C9.00075 5.9985 9 5.99925 9 6C9 6.00075 9.00075 6.0015 9.00075 6.003V6.75H7.5Z"
                fill="#8D28AD"
              />
              <path
                d="M21 11.25H16.5C16.5 10.4227 15.8273 9.75 15 9.75H13.5C12.6727 9.75 12 10.4227 12 11.25H3C2.586 11.25 2.25 11.5853 2.25 12C2.25 12.4148 2.586 12.75 3 12.75H12C12 13.5773 12.6727 14.25 13.5 14.25H15C15.8273 14.25 16.5 13.5773 16.5 12.75H21C21.414 12.75 21.75 12.4148 21.75 12C21.75 11.5853 21.414 11.25 21 11.25ZM13.5 12.75V11.25H15L15.0007 11.997C15.0007 11.9985 15 11.9992 15 12C15 12.0008 15.0007 12.0015 15.0007 12.003V12.75H13.5Z"
                fill="#8D28AD"
              />
              <path
                d="M21 17.25H10.5C10.5 16.4227 9.82725 15.75 9 15.75H7.5C6.67275 15.75 6 16.4227 6 17.25H3C2.586 17.25 2.25 17.5853 2.25 18C2.25 18.4148 2.586 18.75 3 18.75H6C6 19.5773 6.67275 20.25 7.5 20.25H9C9.82725 20.25 10.5 19.5773 10.5 18.75H21C21.414 18.75 21.75 18.4148 21.75 18C21.75 17.5853 21.414 17.25 21 17.25ZM7.5 18.75V17.25H9L9.00075 17.997C9.00075 17.9985 9 17.9992 9 18C9 18.0008 9.00075 18.0015 9.00075 18.003V18.75H7.5Z"
                fill="#8D28AD"
              />
            </svg>
          </button>
        </div>

        <div className="py-9 gap-x-4 gap-y-6 flex flex-wrap items-center justify-evenly">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </main>
    </>
  );
}
