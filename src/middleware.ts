import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define the structure of the User object
interface User {
  user_id?: string;
  admin_id?: string;
  user_name?: string;
  admin_name?: string;
  email: string;
  active?: boolean;
  comment?: boolean;
  role: "admin" | "user";
}

// List of protected routes
const PROTECTED_ROUTES = ["/dashboard", "/cart", "/settings", "/admin"];
// Handle restricted paths for authenticated users
const RESTRICTED_PATHS = [
  "/login",
  "/signup",
  "/reset-password",
  "/admin/login",
  "/admin/reset-password",
];

// Helper function to validate JWT token
const validateToken = async (token: string): Promise<User | null> => {
  const userSecret = process.env.JWT_SECRET_USER;
  const adminSecret = process.env.JWT_SECRET_ADMIN;

  if (!userSecret || !adminSecret) {
    throw new Error("JWT secrets are not defined");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(userSecret)
    );
    return payload as unknown as User;
  } catch {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(adminSecret)
      );
      return payload as unknown as User;
    } catch {
      return null;
    }
  }
};

// Middleware function
export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  // Validate user based on token
  const user = token ? await validateToken(token) : null;

  if (user && RESTRICTED_PATHS.includes(path)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Handle admin/user-specific paths
  if (user && path.startsWith("/admin")) {
    if (user.role === "admin") {
      return NextResponse.next();
    }
    if (user.role === "user") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  // Check if the path is protected and user is not authenticated
  if (PROTECTED_ROUTES.includes(path) && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
