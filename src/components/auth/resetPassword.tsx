"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import OTPInput from "@/components/auth/OTPInput";
import ResetPasswordForm from "@/components/auth/resetPasswordForm";
import { useAuth } from "@/context/authContext";
import { sendOTPSchema } from "@/schemas";
import FormError from "@/components/auth/formError";
import FormSuccess from "@/components/auth/formSuccess";

type Errors = {
  email?: string;
  phoneNumber?: string;
};

export default function ResetPassword() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, startTransition] = useTransition();
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otpKey, setOtpKey] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    try {
      sendOTPSchema.parse({ email, phoneNumber });
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

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");

    // todo
    // use setActionError and setActionSuccess

    if (validateForm()) {
      startTransition(async () => {
        // todo
        // generate new OTP
        setIsOtpSent(true);
      });
    }
  };

  const handleOtpComplete = (otp: string) => {
    // todo
    // set OTP

    console.log("کد وارد شده:", otp);
  };

  const handleResendCode = () => {
    // todo
    //  generate new OTP

    console.log("ارسال دوباره کد");
    setOtpKey((prevKey) => prevKey + 1);
  };

  const handleEditPhoneNumber = () => {
    setIsOtpSent(false);
    setPhoneNumber("");
  };

  const confirmHandler = () => {
    // todo
    // verify OTP
  };

  return (
    <>
      <p className="font-bold">گذرواژه خود را فراموش کرده‌اید؟</p>
      {!isOtpSent ? (
        <form
          onSubmit={handleformSubmit}
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
              placeholder="09012345678"
              className={`border rounded-full w-full max-w-[435px] min-w-[300px] py-3 px-6 ${
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
              <p className="text-dark-red pr-6 rounded-xl py-2 flex gap-2 items-center">
                <Image
                  src={"/icon/alert-error.svg"}
                  width={20}
                  height={20}
                  alt="error icon"
                />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="min-h-10">
            {actionError && <FormError message={actionError} />}
            {actionSuccess && <FormSuccess message={actionSuccess} />}
          </div>

          <button
            type="submit"
            className="bg-dark-purple text-white rounded-full py-3 px-6 hover:opacity-90 text-center"
            disabled={isPending}
          >
            دریافت کد
          </button>

          <Link
            href={"login"}
            className="text-dark-purple border border-dark-purple rounded-full py-3 px-6 hover:opacity-90 text-center"
          >
            بازشگت به صفحه ورود
          </Link>
        </form>
      ) : (
        <div className="w-[400px] p-4 flex flex-col gap-6 lg:w-[450px]">
          <p className="text-center">
            کد ارسال شده به شماره {phoneNumber} را وارد کنید:
          </p>
          <OTPInput key={otpKey} length={4} onComplete={handleOtpComplete} />
          <button
            onClick={handleResendCode}
            className="text-dark-purple border border-dark-purple rounded-full py-3 px-6 hover:opacity-90 text-center"
          >
            ارسال دوباره کد
          </button>

          <ResetPasswordForm onConfirm={confirmHandler} />

          <button
            onClick={handleEditPhoneNumber}
            className="text-dark-purple border border-dark-purple rounded-full py-3 px-6 hover:opacity-90 text-center"
          >
            ویرایش شماره
          </button>
        </div>
      )}
    </>
  );
}
