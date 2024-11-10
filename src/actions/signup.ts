"use server";
import * as z from "zod";
import { signupSchema } from "@/schemas";

export async function signup({
  email,
  username,
  password,
}: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse({ email, username, password });

  if (!validatedFields) return { error: "مقادیر اشتباه هستند" };

  // TODO
  return { success: "ثبت نام شما با موفقیت انجام شد" };
}
