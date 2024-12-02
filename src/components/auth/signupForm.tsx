"use client";

import { useState, useEffect } from "react";
import { useTransition } from "react";
import Image from "next/image";
import z from "zod";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/authContext";
import { signupSchema } from "@/schemas";
import FormError from "@/components/auth/formError";
import FormSuccess from "@/components/auth/formSuccess";

type Errors = {
  email?: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
};

export default function SignupForm() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { isAuthenticated, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    try {
      signupSchema.parse({ email, phoneNumber, username, password });
      setErrors({});
      return true;
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const validationErrors: Errors = {};
        err.errors.forEach((error) => {
          validationErrors[error.path[0] as keyof Errors] = error.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");

    if (validateForm()) {
      startTransition(async () => {
        try {
          await register(email, password, username, phoneNumber);

          setActionSuccess("ثبت‌نام موفقیت‌آمیز بود!");
        } catch (error: any) {
          if (error.response) {
            const { status, data } = error.response;

            if (status === 400) {
              setActionError(data.message || "خطای اعتبارسنجی در ثبت‌نام.");
            }
            else if (status === 500) {
              setActionError(
                data.message || "خطای سرور. لطفاً دوباره تلاش کنید."
              );
            }
            else {
              setActionError(
                "خطای ناشناخته در ثبت‌نام. لطفاً دوباره تلاش کنید."
              );
            }
          } else {
            setActionError("مشکلی در ارتباط با سرور رخ داده است.");
          }
        }
      });
    }
  };

  return (
    <>
      <p>لطفاً برای ثبت نام، اطلاعات زیر را وارد کنید.</p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[454px] p-4 flex flex-col gap-6 lg:w-[450px]"
      >
        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className={`pr-6 ${errors.email && "text-dark-red"}`}
          >
            ایمیل
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="ایمیل خود را وارد نمایید."
            className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
              errors.email ? "border-dark-red" : "border-silver"
            }`}
            value={email}
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
              <Image
                src={"/icon/alert-error.svg"}
                width={20}
                height={20}
                alt="error icon"
              />
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phoneNumber"
            className={`pr-6 ${errors.phoneNumber && "text-dark-red"}`}
          >
            شماره موبایل
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="090123456789"
            className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
              errors.phoneNumber ? "border-dark-red" : "border-silver"
            }`}
            value={phoneNumber}
            disabled={isPending}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, "");
            }}
          />
          {errors.phoneNumber && (
            <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
              <Image
                src={"/icon/alert-error.svg"}
                width={20}
                height={20}
                alt="success icon"
              />
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className={`pr-6 ${errors.username && "text-dark-red"}`}
          >
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="نام کاربری خود را وارد نمایید."
            className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
              errors.username ? "border-dark-red" : "border-silver"
            }`}
            value={username}
            disabled={isPending}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
              <Image
                src={"/icon/alert-error.svg"}
                width={20}
                height={20}
                alt="success icon"
              />
              {errors.username}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="password"
            className={`pr-6 ${errors.password && "text-dark-red"}`}
          >
            گذرواژه
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              placeholder="گذرواژه خود را وارد نمایید."
              className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
                errors.password ? "border-dark-red" : "border-silver"
              }`}
              value={password}
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="absolute top-4 left-4 cursor-pointer">
              {show ? (
                <Image
                  src={"/icon/eyeVisible.svg"}
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => setShow(false)}
                />
              ) : (
                <Image
                  src={"/icon/eyeInvisible.svg"}
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => setShow(true)}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
              <Image
                src={"/icon/alert-error.svg"}
                width={20}
                height={20}
                alt="success icon"
              />
              {errors.password}
            </p>
          )}
        </div>

        <div className="min-h-10">
          {actionError && <FormError message={actionError} />}
          {actionSuccess && <FormSuccess message={actionSuccess} />}
        </div>
        <button
          type="submit"
          className="bg-dark-purple text-white rounded-full py-3 px-24 self-center hover:opacity-90"
          disabled={isPending}
        >
          ثبت نام
        </button>
      </form>
    </>
  );
}
