"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import useUserStore from "@/stores/userStore";

interface MenuItem {
  title: string;
  address: string;
}

interface MenuProps {
  onClose: () => void;
}

export default function Menu({ onClose }: MenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPath =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  const user = useUserStore((state) => state.user);

  const menuItems: MenuItem[] = user
    ? user.role === "admin"
      ? [
          // Admin menu items
          { title: "خانه", address: "/" },
          { title: "کتاب‌ها", address: "/books" },
          { title: "اضافه کردن کتاب", address: "/admin/new-book" },
        ]
      : [
          // Regular user menu items
          { title: "خانه", address: "/" },
          { title: "کتاب‌ها", address: "/books" },
          { title: "جدیدترین‌ها", address: "/books?sort_by=newest" },
          { title: "پرفروش‌ترین‌ها", address: "/books?sort_by=best_selling" },
        ]
    : [
        // Guest menu items (not logged in)
        { title: "خانه", address: "/" },
        { title: "کتاب‌ها", address: "/books" },
        { title: "جدیدترین‌ها", address: "/books?sort_by=newest" },
        { title: "پرفروش‌ترین‌ها", address: "/books?sort_by=best_selling" },
        { title: "علاقه‌مندی‌ها", address: "/favorites" },
        { title: "سبد خرید", address: "/cart" },
      ];

  return (
    <nav className="absolute text-white/60 text-xs sm:text-sm w-full right-0 top-full z-50 px-2 pt-4 lg:pt-3">
      <ul className="flex md:gap-8 justify-between md:justify-start bg-dark-purple py-5 px-4 md:px-9 rounded-xl">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.address}
              onClick={onClose}
              className={`${fullPath === item.address && "text-white"} ${
                index === menuItems.length - 1 && "hidden sm:block"
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
