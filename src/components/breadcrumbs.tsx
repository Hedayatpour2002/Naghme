"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const breadcrumbLabels: { [key: string]: string } = {
  books: "کتاب ها",
  ebooks: "کتاب های الکترونیکی",
  audiobooks: "کتاب های صوتی",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");

  const breadcrumbs = pathParts.map((part, index) => {
    const href = `/${pathParts.slice(0, index + 1).join("/")}`;
    const label = breadcrumbLabels[part] || part;
    const isLast = index === pathParts.length - 1;

    return (
      <li key={href} className={isLast ? "font-normal" : ""}>
        <Link href={isLast ? "" : href}>{label}</Link>

        {!isLast && <span className="mx-1">/</span>}
      </li>
    );
  });

  return (
    <nav
      aria-label="breadcrumb"
      className="bg-gradient-to-l from-[rgba(251,247,252,1)] to-[rgba(251,247,252,0)] py-6"
    >
      <ul className="font-bold text-dark-purple flex container">
        <li className="">
          <Link href="/">خانه</Link>
          <span className="mx-1">/</span>
        </li>
        {breadcrumbs}
      </ul>
    </nav>
  );
}
