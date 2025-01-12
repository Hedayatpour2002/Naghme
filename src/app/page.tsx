import Bestsellers from "@/components/home/bestsellers";
import FeaturedPicks from "@/components/home/featuredPicks";
import Hero from "@/components/home/hero";
import MembersComment from "@/components/home/membersComment";
import Newsletter from "@/components/home/newsletter";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Bestsellers />
        <FeaturedPicks />
        <MembersComment />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
