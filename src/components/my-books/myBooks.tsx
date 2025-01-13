import MyBooksTitle from "@/components/my-books/myBooksTitle";
import EpmtyMyBooks from "@/components/my-books/epmtyMyBooks";
import BookCard from "@/components/bookCard";

export default function MyBooks() {
  const myBooksIds = [];

  return (
    <>
      <MyBooksTitle />

      {myBooksIds.length ? (
        <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4 justify-center pb-9">
          {myBooksIds.map((id) => (
            <BookCard key={id} />
          ))}
        </div>
      ) : (
        <EpmtyMyBooks />
      )}
    </>
  );
}
