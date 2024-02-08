import { getDataFromToken } from "app/components/helpers/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session;
  let { refreshToken, accessToken, profileToken } =
    req.body || req.headers || req.cookies;
  if (!refreshToken) {
    session = null;
  }
  if (refreshToken && (!accessToken || !profileToken)) {
    const data = await fetch("https://api.kapil.app/api/user/refresh", {
      method: "POST",
      headers: {
        refreshToken: refreshToken as string,
      },
    });
    const response = await data.json();
    if ((response.message = "succesfully refreshed")) {
      res.setHeader("Set-Cookie", [
        `accessToken=${response.access_token}; Httponly; Max-Age=86400; Path=/;`,
        `profileToken=${response.profile_token}; Httponly; Max-Age=7200; Path=/;`,
        `refreshToken=${response.refresh_token}; Httponly; Max-Age=2592000; Path=/;`,
      ]);
      session = await getDataFromToken({ token: response.profile_token });
    }
  }
  if (refreshToken && profileToken && accessToken) {
    session = await getDataFromToken({ token: profileToken });
  }
  return res.status(200).json({ ...session });
}
