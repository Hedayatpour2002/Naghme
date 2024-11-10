import Link from "next/link";

interface AuthToggleProps {
  isLogin: boolean;
}

export default function AuthToggle({ isLogin }: AuthToggleProps) {
  return (
    <div className="rounded-full bg-light-purple p-4 flex">
      <Link
        href="/signup"
        className={`py-2 px-14 rounded-full text-nowrap ${
          !isLogin
            ? "text-white bg-dark-purple hover:opacity-90"
            : "text-dark-purple bg-none"
        }`}
      >
        ثبت نام 
      </Link>
      <Link
        href="/login"
        className={`py-2 px-14 rounded-full ${
          isLogin
            ? "text-white bg-dark-purple hover:opacity-90"
            : "text-dark-purple bg-none"
        }`}
      >
        ورود
      </Link>
    </div>
  );
}
