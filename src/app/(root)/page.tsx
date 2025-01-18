import Bestsellers from "@/components/home/bestsellers";
import FeaturedPicks from "@/components/home/featuredPicks";
import Hero from "@/components/home/hero";
import MembersComment from "@/components/home/membersComment";
import Newsletter from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <main className="flex-grow">
        <Hero />
        <Bestsellers />
        <FeaturedPicks />
        <MembersComment />
        <Newsletter />
      </main>
    </>
  );
}
