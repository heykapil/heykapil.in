import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  let refreshToken = request.cookies.get("refreshToken")?.value || "";
  let accessToken = request.cookies.get("accessToken")?.value || "";
  let profileToken = request.cookies.get("profileToken")?.value || "";
  let midResponse = NextResponse.next();
  if (refreshToken && (!accessToken || !profileToken)) {
    const data = await fetch("https://api.kapil.app/api/user/refresh", {
      method: "POST",
      headers: {
        refreshToken: refreshToken as string,
      },
    });
    const response = await data.json();
    if ((response.message = "succesfully refreshed")) {
      midResponse.cookies.set({
        name: "accessToken",
        value: response.access_token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
        expires: Number(response.access_expiry),
        path: "/",
      });
      midResponse.cookies.set({
        name: "refreshToken",
        value: response.refresh_token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
        expires: Number(response.refresh_expiry),
        path: "/",
      });
      midResponse.cookies.set({
        name: "profileToken",
        value: response.profile_token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
        expires: Number(response.access_expiry),
        path: "/",
      });
    }
  }
  return midResponse;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};