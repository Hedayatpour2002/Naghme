"use client";

import { useState } from "react";
import Image from "next/image";

import AuthButtons from "@/components/layout/header/authButtons";
import ProfileDropDown from "@/components/layout/header/profileDropDown";

export default function UserCenter() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  function signOut() {
    setIsLogin(false);
  }

  return (
    <>
      {isLogin ? (
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 border border-light-silver items-center justify-center cursor-pointer rounded-2xl relative hidden md:flex">
            <Image
              src={"/icon/love.svg"}
              alt="wishlist icon"
              width={24}
              height={24}
            />

            <p className="w-7 h-7 rounded-full bg-dark-purple text-white font-bold flex items-end justify-center absolute -top-2 -right-3 text-sm">
              0
            </p>
          </div>
          <div className="h-14 w-14 border border-light-silver items-center justify-center cursor-pointer rounded-2xl relative hidden sm:flex">
            <Image
              src={"/icon/shoppingCart.svg"}
              alt="shopping cart icon"
              width={24}
              height={24}
            />

            <p className="w-7 h-7 rounded-full bg-dark-purple text-white font-bold flex items-end justify-center absolute -top-2 -right-3 text-sm">
              0
            </p>
          </div>

          <ProfileDropDown signOut={signOut} />
        </div>
      ) : (
        <AuthButtons />
      )}
    </>
  );
}
