"use client";
import Book from "@/components/book/book";
import { useParams } from "next/navigation";
import React from "react";

export default function BookPage() {
  const { id } = useParams();
  return <Book book_id={id} />;
}
