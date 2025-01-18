import Breadcrumbs from "@/components/breadcrumbs";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs />
      <main className="flex-grow container">{children}</main>
    </>
  );
}
