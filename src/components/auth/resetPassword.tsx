"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import OTPInput from "@/components/auth/OTPInput";
import ResetPasswordForm from "@/components/auth/resetPasswordForm";

type Errors = {
  phoneNumber?: string;
};

export default function ResetPassword() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, startTransition] = useTransition();
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otpKey, setOtpKey] = useState<number>(0);
  const [showResetPasswordForm, setShowResetPasswordForm] =
    useState<boolean>(false);

  const handlePhoneNumberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    if (!/^09\d{9}$/.test(phoneNumber)) {
      setErrors({ phoneNumber: "شماره موبایل معتبر نیست!" });
      return;
    }

    startTransition(async () => {
      console.log("ارسال شماره موبایل:", phoneNumber);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsOtpSent(true);
    });
  };

  const handleOtpComplete = (otp: string) => {
    console.log("کد وارد شده:", otp);
    setShowResetPasswordForm(true);
  };

  const handleResendCode = () => {
    console.log("ارسال دوباره کد");
    setOtpKey((prevKey) => prevKey + 1);
  };

  const handleEditPhoneNumber = () => {
    setIsOtpSent(false);
    setPhoneNumber("");
    setShowResetPasswordForm(false);
  };

  const confirmHandler = () => {
    console.log("رمز عبور تغییر یافت!");
  };

  return (
    <>
      <p className="font-bold">گذرواژه خود را فراموش کرده‌اید؟</p>
      {!isOtpSent ? (
        <form
          onSubmit={handlePhoneNumberSubmit}
          className="w-full max-w-[454px] p-4 flex flex-col gap-6 lg:w-[450px]"
        >
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
      ) : !showResetPasswordForm ? (
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
          <button
            onClick={handleEditPhoneNumber}
            className="text-dark-purple border border-dark-purple rounded-full py-3 px-6 hover:opacity-90 text-center"
          >
            ویرایش شماره
          </button>
        </div>
      ) : (
        <ResetPasswordForm onConfirm={confirmHandler} />
      )}
    </>
  );
}
