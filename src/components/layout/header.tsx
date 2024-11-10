"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function onClickHandler() {
    router.push("/login");
  }
  return (
    <div>
      header
      <button onClick={onClickHandler}>ورود</button>
    </div>
  );
}
