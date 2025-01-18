import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
