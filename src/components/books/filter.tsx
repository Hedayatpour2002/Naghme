import { useState } from "react";

export default function Filter({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full border border-light-purple rounded-xl ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between py-4 px-8 w-full ${
          isOpen && "border-b border-b-light-purple"
        }`}
      >
        <span className="font-semibold text-lg text-nowrap">{title}</span>
        <ArrowSVG isOpen={isOpen} />
      </button>
      {isOpen && <div className="px-8 py-4 text-light-blue">{children}</div>}
    </section>
  );
}

interface ArrowSVGProps {
  isOpen: boolean;
}
function ArrowSVG({ isOpen }: ArrowSVGProps) {
  return (
    <svg
      className={`transform duration-300 ${!isOpen && "-rotate-180"}`}
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.99998 11.5L10.021 3.47897L18.042 11.5"
        stroke="#8D28AD"
        strokeWidth="4"
      />
    </svg>
  );
}
