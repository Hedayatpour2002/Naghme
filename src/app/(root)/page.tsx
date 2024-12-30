import Bestsellers from "@/components/layout/home/bestsellers";
import FeaturedPicks from "@/components/layout/home/featuredPicks";
import Hero from "@/components/layout/home/hero";
import MembersComment from "@/components/layout/home/membersComment";
import Newsletter from "@/components/layout/home/newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bestsellers />
      <FeaturedPicks />
      <MembersComment />
      <Newsletter />
    </main>
  );
}
