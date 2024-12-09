"use client";
import Image from "next/image";
import { useState } from "react";
import Menu from "@/components/layout/header/menu";

export default function SearchBox() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-stretch justify-between lg:max-w-[600px] flex-grow">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`border border-l-transparent rounded-tr-xl rounded-br-xl flex gap-2 sm:gap-4 py-2 sm:py-3 sm:px-7 sm:text-lg items-center font-bold pl-2 flex-shrink-0 transition px-2 relative ${
          menuOpen
            ? "bg-dark-purple text-white border-dark-purple"
            : "bg-white text-dark-purple border-light-silver "
        }`}
      >
        <svg
          className={`hidden sm:block transition ${
            menuOpen ? "scale-125" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M1.99992 7.3335H6.66659C6.8434 7.3335 7.01297 7.26326 7.13799 7.13823C7.26301 7.01321 7.33325 6.84364 7.33325 6.66683V2.00016C7.33325 1.82335 7.26301 1.65378 7.13799 1.52876C7.01297 1.40373 6.8434 1.3335 6.66659 1.3335H1.99992C1.82311 1.3335 1.65354 1.40373 1.52851 1.52876C1.40349 1.65378 1.33325 1.82335 1.33325 2.00016V6.66683C1.33325 6.84364 1.40349 7.01321 1.52851 7.13823C1.65354 7.26326 1.82311 7.3335 1.99992 7.3335ZM2.66659 2.66683H5.99992V6.00016H2.66659V2.66683Z"
            fill={menuOpen ? "#fff" : "#8D28AD"}
          />
          <path
            d="M9.33341 7.3335H14.0001C14.1769 7.3335 14.3465 7.26326 14.4715 7.13823C14.5965 7.01321 14.6667 6.84364 14.6667 6.66683V2.00016C14.6667 1.82335 14.5965 1.65378 14.4715 1.52876C14.3465 1.40373 14.1769 1.3335 14.0001 1.3335H9.33341C9.1566 1.3335 8.98703 1.40373 8.86201 1.52876C8.73699 1.65378 8.66675 1.82335 8.66675 2.00016V6.66683C8.66675 6.84364 8.73699 7.01321 8.86201 7.13823C8.98703 7.26326 9.1566 7.3335 9.33341 7.3335ZM10.0001 2.66683H13.3334V6.00016H10.0001V2.66683Z"
            fill={menuOpen ? "#fff" : "#8D28AD"}
          />
          <path
            d="M1.99992 14.6665H6.66659C6.8434 14.6665 7.01297 14.5963 7.13799 14.4712C7.26301 14.3462 7.33325 14.1766 7.33325 13.9998V9.33317C7.33325 9.15636 7.26301 8.98679 7.13799 8.86177C7.01297 8.73674 6.8434 8.6665 6.66659 8.6665H1.99992C1.82311 8.6665 1.65354 8.73674 1.52851 8.86177C1.40349 8.98679 1.33325 9.15636 1.33325 9.33317V13.9998C1.33325 14.1766 1.40349 14.3462 1.52851 14.4712C1.65354 14.5963 1.82311 14.6665 1.99992 14.6665ZM2.66659 9.99984H5.99992V13.3332H2.66659V9.99984Z"
            fill={menuOpen ? "#fff" : "#8D28AD"}
          />
          <path
            d="M9.33341 14.6665H14.0001C14.1769 14.6665 14.3465 14.5963 14.4715 14.4712C14.5965 14.3462 14.6667 14.1766 14.6667 13.9998V9.33317C14.6667 9.15636 14.5965 8.98679 14.4715 8.86177C14.3465 8.73674 14.1769 8.6665 14.0001 8.6665H9.33341C9.1566 8.6665 8.98703 8.73674 8.86201 8.86177C8.73699 8.98679 8.66675 9.15636 8.66675 9.33317V13.9998C8.66675 14.1766 8.73699 14.3462 8.86201 14.4712C8.98703 14.5963 9.1566 14.6665 9.33341 14.6665ZM10.0001 9.99984H13.3334V13.3332H10.0001V9.99984Z"
            fill={menuOpen ? "#fff" : "#8D28AD"}
          />
        </svg>
        منو
        <svg
          className={`hidden sm:block transition ${
            menuOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M5.67782 8.38262L1.17782 4.38263C1.07847 4.29504 1.01794 4.17161 1.0095 4.03944C1.00107 3.90726 1.04542 3.77714 1.13282 3.67763C1.22041 3.57829 1.34384 3.51775 1.47601 3.50932C1.60818 3.50088 1.73831 3.54523 1.83782 3.63263L6.00782 7.33763L10.1778 3.63263C10.2782 3.55182 10.4058 3.51285 10.5342 3.52386C10.6625 3.53487 10.7817 3.595 10.8668 3.69172C10.9519 3.78843 10.9964 3.91427 10.991 4.04299C10.9856 4.17171 10.9307 4.29338 10.8378 4.38263L6.33782 8.38262C6.24657 8.46278 6.12927 8.50699 6.00782 8.50699C5.88636 8.50699 5.76906 8.46278 5.67782 8.38262Z"
            fill={menuOpen ? "#fff" : "#8D28AD"}
          />
        </svg>
        {menuOpen && (
          <div
            className="hidden sm:block absolute -bottom-9 left-0 right-0 mx-auto bg-dark-purple z-50 h-2.5 w-2.5"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
        )}
      </button>

      <div className="flex flex-grow gap-1 items-center md:px-4 border border-light-silver rounded-tl-xl rounded-bl-xl  focus-within:border-dark-purple transition px-2">
        <input
          type="text"
          className="py-2 px-1 w-full text-xs placeholder:text-silver sm:text-base"
          placeholder={`جست و جوی کتاب`}
        />
        <button className="flex-shrink-0">
          <Image
            className="sm:w-6 sm:h-6"
            src={"/icon/search.svg"}
            alt="search icon"
            width={16}
            height={16}
          />
        </button>
      </div>

      {menuOpen && <Menu />}
    </div>
  );
}
