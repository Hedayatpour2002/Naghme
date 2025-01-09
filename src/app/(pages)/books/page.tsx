import Books from "@/components/books/books";
import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

export default function BooksPage() {
  return (
    <>
      <Breadcrumbs />
      <main className="container">
        <Books />
      </main>
    </>
  );
}
