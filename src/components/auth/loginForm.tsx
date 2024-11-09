"use client";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const passwordIconHandler = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <form
      {...form}
      className="w-full max-w-[454px] p-4 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="pr-6">
          نام کاربری
        </label>
        <input
          type="text"
          className="border border-silver rounded-full w-full max-w-[435px] py-3 px-6"
          id="username"
          name="username"
          placeholder="نام کاربری خود را وارد نمایید ..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label htmlFor="password" className="pr-6">
          گذرواژه
        </label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="border border-silver rounded-full w-full max-w-[435px] pr-6 pl-10 py-3"
          id="password"
          name="password"
          placeholder="گذرواژه خود را وارد نمایید ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Image
          className="absolute bottom-4 left-4 cursor-pointer"
          src={isPasswordVisible ? "/icon/invisible.svg" : "/icon/visible.svg"}
          alt="show password"
          width={16}
          height={16}
          onClick={passwordIconHandler}
        />
      </div>

      <button
        type="submit"
        className="bg-dark-purple text-white rounded-full py-3 px-24 self-center"
      >
        ورود
      </button>
    </form>
  );
}
