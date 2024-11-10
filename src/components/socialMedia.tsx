import Image from "next/image";
import Link from "next/link";

export default function SocialMedia() {
  return (
    <div className="flex gap-6">
      <Link href={"https://facebook.com"} target="_blank">
        <Image
          src={"/icon/socialMedia/facebook.svg"}
          alt="facebook logo"
          width={12}
          height={22}
        />
      </Link>
      <Link href={"https://instagram.com"} target="_blank">
        <Image
          src={"/icon/socialMedia/instagram.svg"}
          alt="instagram logo"
          width={22}
          height={22}
        />
      </Link>

      <Link href={"https://linkedin.com"} target="_blank">
        <Image
          src={"/icon/socialMedia/linkedin.svg"}
          alt="linkedin logo"
          width={23}
          height={22}
        />
      </Link>

      <Link href={"https://x.com"} target="_blank">
        <Image
          src={"/icon/socialMedia/x.svg"}
          alt="x logo"
          width={22}
          height={22}
        />
      </Link>
    </div>
  );
}
