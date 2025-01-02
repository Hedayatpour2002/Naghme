import { removeAuthHeader } from "@/utils/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const router = useRouter();

  const menuItem = [
    { title: "کتاب های من", address: "/my-book", icon: "/icon/my-books.svg" },
    { title: "سبد خرید", address: "/cart", icon: "/icon/cart.svg" },
    { title: "مورد علاقه ها", address: "/favorites", icon: "/icon/love.svg" },
    { title: "تنظیمات", address: "/settings", icon: "/icon/settings.svg" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeAuthHeader();
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push("/login");
  };

  return (
    <ul className="flex flex-col gap-7 p-8 font-bold text-sm text-light-blue bg-white border-light-ligth-purple shadow-xl min-w-[227px] rounded-2xl">
      {menuItem.map((item, index) => (
        <li key={index}>
          <Link href={item.address} className="flex gap-2 items-center">
            <Image src={item.icon} alt="" width={24} height={24} />
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
      <li>
        <button className="flex gap-2 items-center" onClick={handleLogout}>
          <Image
            src={"/icon/exit.svg"}
            alt="exit-icon"
            width={24}
            height={24}
          />
          <span>خروج از حساب کاربری</span>
        </button>
      </li>
    </ul>
  );
}
