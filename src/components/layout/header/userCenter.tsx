"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

import AuthButtons from "@/components/layout/header/authButtons";
import ProfileDropDown from "@/components/layout/header/profileDropDown";
import getUser from "@/utils/getUser";
import { useStore } from "@/stores/useStore";
import useUserStore from "@/stores/userStore";

export default function UserCenter() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { favorites, cart } = useStore();

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, [setUser]);

  return (
    <>
      {user ? (
        <div className="flex items-center gap-6">
          {user.role === "user" && (
            <>
              <Link
                href={"/favorites"}
                className="h-14 w-14 border border-light-silver items-center justify-center cursor-pointer rounded-2xl relative hidden md:flex"
              >
                <Image
                  src={"/icon/love.svg"}
                  alt="wishlist icon"
                  width={24}
                  height={24}
                />

                <p className="w-7 h-7 rounded-full bg-dark-purple text-white font-bold flex items-end justify-center absolute -top-2 -right-3 text-sm">
                  {favorites.length}
                </p>
              </Link>
              <Link
                href={"/cart"}
                className="h-14 w-14 border border-light-silver items-center justify-center cursor-pointer rounded-2xl relative hidden sm:flex"
              >
                <Image
                  src={"/icon/shoppingCart.svg"}
                  alt="shopping cart icon"
                  width={24}
                  height={24}
                />

                <p className="w-7 h-7 rounded-full bg-dark-purple text-white font-bold flex items-end justify-center absolute -top-2 -right-3 text-sm">
                  {cart.length}
                </p>
              </Link>
            </>
          )}

          <ProfileDropDown />
        </div>
      ) : (
        <AuthButtons />
      )}
    </>
  );
}
