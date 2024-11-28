import MembersComment from "@/components/home/membersComment";
import Newsletter from "@/components/newsletter";

export default function Home() {
  return (
    <main>
      <h1>خوش آمدید به نغمه</h1>
      <p>این صفحه اصلی وبسایت است.</p>
      <MembersComment/>
      <Newsletter />
    </main>
  );
}
