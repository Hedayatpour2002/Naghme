import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container">
      <section className="flex flex-col gap-8 items-center">{children}</section>
      <Image
        className=" sm:block"
        src="/images/outh.svg"
        alt="books"
        width={737}
        height={825}
      />
    </main>
  );
}
