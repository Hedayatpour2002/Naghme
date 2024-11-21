import Logo from "@/components/logo";
import SearchBox from "@/components/searchBox";
import UserCenter from "@/components/userCenter";

export default function Header() {
  return (
    <header className="container flex gap-4 pt-6 pb-4 items-center justify-between">
      <Logo />
      <SearchBox />
      <UserCenter />
    </header>
  );
}
