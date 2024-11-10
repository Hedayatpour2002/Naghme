import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image src={"/icon/Logo.svg"} alt="naghme logo" width={64} height={64} />
    </Link>
  );
}
