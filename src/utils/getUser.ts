"use client";
import { jwtDecode } from "jwt-decode";
import getCookie from "@/utils/getCookie";

interface User {
  user_id: number;
  user_name: string;
  email: string;
  contact: boolean;
  role: string;
  iat: number;
  exp: number;
}
function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getCookie("token");

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const decoded = jwtDecode<User>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.log("Token has expired");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
export default getUser;
