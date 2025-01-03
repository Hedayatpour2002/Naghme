import Link from "next/link";
import React, { useState } from "react";

export default function Menu() {
  const [isActive, setIsActive] = useState("/");
  const menuItems = [
    { title: "خانه", address: "/" },
    { title: "کتاب ها", address: "/books" },
    { title: "کتاب الکترونیکی", address: "/books" },
    { title: "کتاب صوتی", address: "/books" },
    { title: "جدیدترین ها", address: "/books" },
    { title: "پرفروش ترین ها", address: "/signup" },
  ];
  return (
    <>
      <nav className="absolute text-white/60 text-xs sm:text-sm w-full right-0 top-full z-50 px-2 pt-4 lg:pt-3">
        <ul className="flex md:gap-8 justify-between md:justify-start bg-dark-purple py-5 px-4 md:px-9 rounded-xl">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.address}
                className={`${isActive === item.address && "text-white"} ${
                  index === menuItems.length - 1 && "hidden sm:block"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
