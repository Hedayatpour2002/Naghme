"use client";

import { changePasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { z } from "zod";
import FormError from "../auth/formError";
import FormSuccess from "../auth/formSuccess";
import OTPInput from "../auth/OTPInput";
import Image from "next/image";
import getCookie from "@/utils/getCookie";
import {
  sendChangePasswordOtp,
  userChangePassword,
} from "@/services/authService";

type Errors = {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  otp?: string;
};

export default function PasswordChangeFrom() {
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | undefined>("");
  const [actionSuccess, setActionSuccess] = useState<string | undefined>("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function sendOtpFun() {
    setActionError("");
    setActionSuccess("");

    startTransition(async () => {
      try {
        const response = await sendChangePasswordOtp(getCookie("token") || "");
        if (response.result) {
          setActionSuccess("کد OTP با موفقیت ارسال شد.");
          console.log("کد OTP با موفقیت ارسال شد.");
        } else {
          setActionError("خطا در ارسال کد OTP. لطفاً دوباره تلاش کنید.");
        }
      } catch (error) {
        if (error instanceof Error) {
          setActionError(error.message);
        } else {
          setActionError("خطای ناشناخته. لطفاً دوباره تلاش کنید.");
        }
      }
    });
  }

  const validatePasswordForm = (): boolean => {
    try {
      changePasswordSchema.parse(passwordData);
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

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionError("");
    setActionSuccess("");

    if (validatePasswordForm()) {
      console.log(passwordData);
      console.log({ token: getCookie("token") });
      startTransition(async () => {
        try {
          await userChangePassword(
            getCookie("token") || "",
            passwordData.password,
            passwordData.newPassword,
            passwordData.otp
          );
          setActionSuccess("رمز عبور با موفقیت تغییر یافت!");
        } catch (error) {
          if (error instanceof Error) {
            setActionError(error.message);
          } else {
            setActionError("خطا در تغییر رمز عبور. لطفاً دوباره تلاش کنید.");
          }
        }
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtp = (otp: string) => {
    setPasswordData((prev) => ({ ...prev, otp }));
    console.log("کد وارد شده:", otp);
  };

  return (
    <form
      onSubmit={handlePasswordSubmit}
      className="border border-light-silver rounded-2xl px-4 py-14 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl"
    >
      {/* password */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="password"
          className={`pr-6 ${errors.password && "text-dark-red"}`}
        >
          گذرواژه فعلی
        </label>
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            id="password"
            name="password"
            className={`border rounded-full w-full py-3 px-6 ${
              errors.password ? "border-dark-red" : "border-silver"
            }`}
            value={passwordData.password}
            disabled={isPending}
            onChange={handlePasswordChange}
          />

          <div className="absolute top-4 left-4 cursor-pointer">
            <Image
              src={
                showOldPassword
                  ? "/icon/eyeVisible.svg"
                  : "/icon/eyeInvisible.svg"
              }
              alt=""
              width={20}
              height={20}
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          </div>
        </div>
        {errors.password && (
          <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.password}
          </p>
        )}
      </div>

      {/* newPassword */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="newPassword"
          className={`pr-6 ${errors.newPassword && "text-dark-red"}`}
        >
          گذرواژه جدید
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className={`border rounded-full w-full py-3 px-6 ${
              errors.newPassword ? "border-dark-red" : "border-silver"
            }`}
            value={passwordData.newPassword}
            disabled={isPending}
            onChange={handlePasswordChange}
          />

          <div className="absolute top-4 left-4 cursor-pointer">
            <Image
              src={
                showNewPassword
                  ? "/icon/eyeVisible.svg"
                  : "/icon/eyeInvisible.svg"
              }
              alt=""
              width={20}
              height={20}
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          </div>
        </div>
        {errors.newPassword && (
          <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.newPassword}
          </p>
        )}
      </div>

      {/* confirmPassword */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="confirmPassword"
          className={`pr-6 ${errors.confirmPassword && "text-dark-red"}`}
        >
          تکرار گذرواژه جدید
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className={`border rounded-full w-full py-3 px-6 ${
              errors.confirmPassword ? "border-dark-red" : "border-silver"
            }`}
            value={passwordData.confirmPassword}
            disabled={isPending}
            onChange={handlePasswordChange}
          />

          <div className="absolute top-4 left-4 cursor-pointer">
            <Image
              src={
                showConfirmPassword
                  ? "/icon/eyeVisible.svg"
                  : "/icon/eyeInvisible.svg"
              }
              alt=""
              width={20}
              height={20}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="sm:row-start-3">
        <OTPInput onComplete={handleOtp} />
        {errors.otp && (
          <p className="text-dark-red pr-6  rounded-xl py-2 flex gap-2 items-center ">
            <Image
              src={"/icon/alert-error.svg"}
              width={20}
              height={20}
              alt="error icon"
            />
            {errors.otp}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={sendOtpFun}
        disabled={isPending}
        className="sm:row-start-3 sm:justify-self-start"
      >
        ارسال کد
      </button>

      <div className="min-h-10 sm:row-start-4 sm:col-span-2 sm:justify-self-center">
        {actionError && <FormError message={actionError} />}
        {actionSuccess && <FormSuccess message={actionSuccess} />}
      </div>

      <button
        type="submit"
        className="bg-dark-purple text-white rounded-full py-3 px-24 self-center sm:col-span-2 sm:max-w-72 sm:justify-self-center"
        disabled={isPending}
      >
        تغییر رمز عبور
      </button>
    </form>
  );
}
