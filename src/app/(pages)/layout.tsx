import Breadcrumbs from "@/components/breadcrumbs";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow container">{children}</main>
      <Footer />
    </>
  );
}
