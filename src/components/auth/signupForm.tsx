"use client";

import { useState } from "react";
import { useTransition } from "react";
import z from "zod";

import { signupSchema } from "@/schemas";

import FormError from "@/components/auth/formError";
import FormSuccess from "@/components/auth/formSuccess";
import Image from "next/image";
import { signup } from "@/actions/signup";

type Errors = {
  email?: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
};

export default function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");
    if (validateForm()) {
      startTransition(() => {
        signup({ email, phoneNumber, username, password }).then((data) => {
          setActionError(data.error);
          setActionSuccess(data.success);
        });
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
            className="border border-silver rounded-full w-full max-w-[435px] py-3 px-6"
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
                alt="success icon"
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
            className="border border-silver rounded-full w-full max-w-[435px] py-3 px-6"
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
            className="border border-silver rounded-full w-full max-w-[435px] py-3 px-6"
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
          <input
            type="password"
            id="password"
            name="password"
            placeholder="گذرواژه خود را وارد نمایید."
            className="border border-silver rounded-full w-full max-w-[435px] pr-6 pl-10 py-3"
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
          />
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
          ورود
        </button>
      </form>
    </>
  );
}
