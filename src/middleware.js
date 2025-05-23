import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  let pathname = req.nextUrl.pathname.replace(/\/$/, "") || "/";

  console.log("heyyy", req.nextUrl.pathname);

  // Define public routes
  const publicPaths = [
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/verification",
    "/auth/create-profile",
  ];

  const isPublic = publicPaths.includes(pathname);

  // Redirect unauthenticated users away from protected routes
  if (!isPublic && !token) {
    console.log("Redirecting unauthenticated user to /auth/signin");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // if (token) {
  //   console.log("Redirecting authenticated user to dashboard");
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }
  // Restrict role-based access for dashboard

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // run on all routes except static assets
};
