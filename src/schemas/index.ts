import { z } from "zod";

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

export const sendOTPSchema = z.object({
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
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(/[0-9]/, { message: "رمز عبور باید حداقل شامل یک عدد باشد!" })
      .regex(/[a-zA-Z]/, {
        message: "رمز عبور باید حداقل شامل یک حرف انگلیسی باشد!",
      })
      .min(8, { message: "رمز عبور باید حداقل شامل 8 حرف باشد!" })
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "رمز عبور و تکرار آن باید یکسان باشند!",
        path: ["confirmPassword"],
      });
    }
    if (data.confirmPassword === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پرکردن این فیلد الازمی است!",
        path: ["confirmPassword"],
      });
    }
  });

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: "پر کردن این فیلد الزامی است!",
      })
      .trim(),
    newPassword: z
      .string()
      .regex(/[0-9]/, { message: "رمز عبور باید حداقل شامل یک عدد باشد!" })
      .regex(/[a-zA-Z]/, {
        message: "رمز عبور باید حداقل شامل یک حرف انگلیسی باشد!",
      })
      .min(8, { message: "رمز عبور باید حداقل شامل 8 حرف باشد!" })
      .trim(),
    confirmPassword: z.string(),
    otp: z
      .string()
      .length(4, {
        message: "لطفا کد یکبار مصرف را وارد نمایید!",
      })
      .trim(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "رمز عبور جدید و تکرار آن باید یکسان باشند!",
        path: ["confirmPassword"],
      });
    }
    if (data.confirmPassword === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "پر کردن این فیلد الزامی است!",
        path: ["confirmPassword"],
      });
    }
  });

export const addNewBookSchema = z.object({
  title: z
    .string()
    .min(1, "وارد کردن عنوان الزامی است!")
    .max(50, "عنوان حداکثر میتواند شامل 50 حرف باشد!")
    .trim(),
  price: z.string().min(1, "وارد کردن قیمت الزامی است!").regex(/^\d*$/, {
    message: "قیمت را به صورت عددی وارد نمایید!",
  }),

  off: z
    .string()
    .min(1, "وارد کردن تخفیف الزامی است!")
    .regex(/^\d*$/, {
      message: "تخفیف را به صورت عددی وارد نمایید!",
    })
    .refine(
      (value) => {
        const number = parseInt(value, 10);
        return number >= 0 && number <= 100;
      },
      {
        message: "درصد تخفیف باید بین ۰ تا ۱۰۰ باشد!",
      }
    ),
  format: z
    .string()
    .min(1, "انتخاب فرمت الزامی است!")
    .refine((value) => value === "TEXT" || value === "AUDIO", {
      message: "فرمت انتخاب شده معتبر نیست!",
    }),

  descriptions: z
    .string()
    .min(1, "وارد کردن توضیحات الزامی است!")
    .max(500, "توضیحات حداکثر می‌تواند شامل 500 حرف باشد!")
    .trim(),
  publishDate: z
    .string({ message: "وارد کردن تاریخ انتشار الزامی است!" })
    .min(1, "وارد کردن تاریخ انتشار الزامی است!"),
  selectedAuthors: z
    .array(
      z.object({
        image: z.string(),
        author: z.string(),
      })
    )
    .nonempty("انتخاب حداقل یک نویسنده الزامی است!"),

  selectedPublishers: z
    .array(z.string())
    .nonempty("انتخاب حداقل یک ناشر الزامی است!"),

  selectedCategories: z
    .array(
      z.object({
        image: z.string(),
        author: z.string(),
      })
    )
    .nonempty("انتخاب حداقل یک دسته بندی الزامی است!"),

  selectedGenres: z
    .array(
      z.object({
        image: z.string(),
        author: z.string(),
      })
    )
    .nonempty("انتخاب حداقل یک ژانر الزامی است!"),
});
