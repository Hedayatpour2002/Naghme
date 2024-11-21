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
    .max(50, "ایمیل حداکثر میتواند شامل 50 حرف باشد!")
    .trim(),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, {
      message: "شماره تلفن باید دقیقا 11 رقم باشد!",
    })
    .trim(),
  username: z
    .string()
    .min(4, { message: "نام کاربری باید حداقل شامل 4 حرف باشد!" })
    .max(30, "نام کاربری حداکثر میتواند شامل 30 کاراکتر باشد!")
    .trim(),
  password: z
    .string()
    .regex(/[a-zA-Z]/, {
      message: "گذرواژه باید حداقل شامل یک حرف انگلیسی باشد!",
    })
    .regex(/[0-9]/, { message: "گذرواژه باید حداقل شامل یک عدد باشد!" })
    .min(8, { message: "گذرواژه باید حداقل شامل 8 حرف باشد!" })
    .trim(),
});
