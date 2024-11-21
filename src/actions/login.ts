"use server";
import z from "zod";
import { LoginSchema } from "@/schemas";

export async function login({ email, password }: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse({ email, password });

  if (!validatedFields) {
    return { error: "مقادیر اشتباه هستند" };
  }

  return { success: "با موفقیت وارد شدید" };
}
