"use client";
import { useParams } from "next/navigation";
import BookHero from "@/components/book/bookHero";
import BookDetails from "./bookDetails";

export default function Book() {
  const { id } = useParams();
  return (
    <>
      <BookHero />
      <BookDetails />
      <p>{id}</p>
    </>
  );
}
