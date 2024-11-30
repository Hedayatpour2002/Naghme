"use client";

import { useState } from "react";
import { resetPasswordSchema } from "@/schemas";
import { z } from "zod";
import Image from "next/image";

type ResetPasswordFormProps = {
  onConfirm: () => void;
};

export default function ResetPasswordForm({
  onConfirm,
}: ResetPasswordFormProps) {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    try {
      resetPasswordSchema.parse({ password, confirmPassword });
      setErrors({});
      return true;
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          validationErrors[error.path[0] as keyof typeof validationErrors] =
            error.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("رمز عبور جدید تایید شد:", password);
      onConfirm();
    }
  };

  return (
    <div className="w-full max-w-[454px] p-4 flex flex-col gap-6 md:min-w-[400px] min-w-[350px]">
      <p className="font-bold text-center">رمز عبور جدید خود را وارد کنید.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className={`pr-6 ${errors.password && "text-dark-red"}`}
          >
            رمز عبور
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
                errors.password ? "border-dark-red" : "border-silver"
              }`}
              placeholder="رمز عبور جدید"
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

        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className={`pr-6 ${errors.confirmPassword && "text-dark-red"}`}
          >
            تکرار رمز عبور
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`border rounded-full w-full max-w-[435px] py-3 px-6 ${
                errors.confirmPassword ? "border-dark-red" : "border-silver"
              }`}
              placeholder="تکرار رمز عبور"
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
          {errors.confirmPassword && (
            <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
              <Image
                src={"/icon/alert-error.svg"}
                width={20}
                height={20}
                alt="success icon"
              />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-dark-purple text-white rounded-full py-3 px-6 hover:opacity-90 text-center"
        >
          تایید
        </button>
      </form>
    </div>
  );
}
