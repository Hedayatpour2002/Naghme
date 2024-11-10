import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "لطفا یک ایمیل معتبر وارد کنید!",
    })
    .trim(),
  password: z
    .string()
    .min(1, {
      message: "پر کردن این فیلد الزامی است!",
    })
    .trim(),
});

export const signupSchema = z.object({
  email: z
    .string()
    .email({
      message: "لطفا یک ایمیل معتبر وارد کنید!",
    })
    .trim(),
  username: z
    .string()
    .min(4, { message: "نام کاربری باید حداقل شامل چهار حرف باشد" })
    .trim(),
  password: z
    .string()
    .regex(/[a-zA-Z]/, { message: "گذرواژه باید حداقل شامل یک حرف باشد" })
    .regex(/[0-9]/, { message: "گذرواژه باید حداقل شامل یک عدد باشد" })
    .min(8, { message: "گذرواژه باید حداقل شامل هشت حرف باشد" })
    .trim(),
});
