import AuthButtons from "@/components/authButtons";
import Logo from "@/components/logo";
import SearchBox from "@/components/searchBox";

export default function Header() {
  return (
    <header className="container flex gap-4 pt-6 pb-4 items-center justify-between">
      <Logo />
      <SearchBox />
      <AuthButtons />
    </header>
  );
}
