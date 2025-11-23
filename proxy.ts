import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export async function proxy(request: NextRequest) {
  let refreshToken = request.cookies.get('refreshToken')?.value || '';
  let accessToken = request.cookies.get('accessToken')?.value || '';
  let profileToken = request.cookies.get('profileToken')?.value || '';
  let midResponse = NextResponse.next();
  if (refreshToken && (!accessToken || !profileToken)) {
    const data = await fetch('https://api.kapil.app/api/user/refresh', {
      method: 'POST',
      headers: {
        refreshToken: refreshToken as string,
      },
    });
    const response = await data.json();
    if ((response.message = 'succesfully refreshed')) {
      midResponse.cookies.set({
        name: 'accessToken',
        value: response.access_token,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: Number(response.access_expiry),
        path: '/',
      });
      midResponse.cookies.set({
        name: 'refreshToken',
        value: response.refresh_token,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: Number(response.refresh_expiry),
        path: '/',
      });
      midResponse.cookies.set({
        name: 'profileToken',
        value: response.profile_token,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        expires: Number(response.access_expiry),
        path: '/',
      });
    }
  }
  return midResponse;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path*'],
};
