import Bestsellers from "@/components/home/bestsellers";
import Hero from "@/components/home/hero";
import MembersComment from "@/components/home/membersComment";
import Newsletter from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <main className="flex-grow">
        <Hero />
        <Bestsellers />
        <MembersComment />
        <Newsletter />
      </main>
    </>
  );
}
