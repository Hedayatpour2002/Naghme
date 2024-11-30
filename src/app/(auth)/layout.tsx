import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container py-8 flex flex-col md:flex-row-reverse items-center justify-center  gap-4 md:w-96 lg:w-auto lg:gap-16">
      <Image
        src="/images/outh.svg"
        alt="books"
        width={737}
        height={825}
        className="flex-shrink"
      />
      {children}
    </main>
  );
}
