"use client";

import { useState } from "react";
import { useTransition } from "react";
import z from "zod";

import { LoginSchema } from "@/schemas";

import FormError from "@/components/auth/formError";
import FormSuccess from "@/components/auth/formSuccess";
import Image from "next/image";
import { login } from "@/actions/login";
import Link from "next/link";

type Errors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const [show, setShow] = useState(false);

  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const validateForm = (): boolean => {
    try {
      LoginSchema.parse({ email, password });
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
        login({ email, password }).then((data) => {
          setActionError(data.error);
          setActionSuccess(data.success);
        });
      });
    }
  };

  return (
    <>
      <p>لطفاً برای ورود به حساب کاربری خود، اطلاعات زیر را وارد کنید.</p>

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
                alt="success icon"
              />
              {errors.email}
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
        <Link href={"/reset-password"} className="pr-6 text-sm">
          گذرواژه خود را فراموش کرده اید؟
        </Link>
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
