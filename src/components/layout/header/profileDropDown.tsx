import Image from "next/image";
import UserMenu from "./userMenu";
import { useState } from "react";

export default function ProfileDropDown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const toggleMenu = () => {
    setHasInteracted(true);
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-14 h-14 z-50  relative flex items-center justify-center">
      <button onClick={toggleMenu} className="rounded-xl">
        <Image
          src="/images/userProfile/boy1.svg"
          alt=""
          width={56}
          height={56}
        />
      </button>

      {hasInteracted && (
        <div
          className={`absolute left-0 top-full ${
            isOpen ? "animate-fade-in-down" : "animate-fade-out-up"
          }`}
        >
          <UserMenu />
        </div>
      )}
    </div>
  );
}
