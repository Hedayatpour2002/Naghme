import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

// Define routes with their access type
const routes = [
  { path: "/dashboard", protected: true },
  { path: "/login", protected: false },
  { path: "/signup", protected: false },
  { path: "/", protected: false },
  { path: "/cart", protected: true },
  { path: "/settings", protected: true },
];

// Helper to find route configuration
const getRouteConfig = (path) => routes.find((route) => route.path === path);

async function validateToken(token) {
  try {
    const response = await axios.post(
      "https://your-backend-url/validate-token",
      { token }
    );
    return response.data.valid; // Assuming backend returns { valid: true/false }
  } catch (error) {
    console.error("Token validation failed:", error.message);
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = (await cookies()).get("token")?.value;

  const routeConfig = getRouteConfig(path);

  if (!routeConfig) {
    return NextResponse.next(); // If route not found, proceed without blocking
  }

  const isAuthenticated = cookie ? await validateToken(cookie) : false;

  if (routeConfig.protected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!routeConfig.protected && isAuthenticated && path !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
