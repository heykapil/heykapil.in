import { getDataFromToken } from "app/components/helpers/jwt";
import { signJwtAccessToken } from "app/components/helpers/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = (req.query?.token as string) || "";
  if (!token) {
    return res.status(400).json({ error: "Bad Request" });
  }
  if (token) {
    const data = await getDataFromToken({ token });
    const accessToken = signJwtAccessToken({
      id: data.id,
      oauth: data.oauth,
      oauth_id: data.oauth_id,
    });
    const refreshToken = signJwtAccessToken({
      id: data.id,
      oauth: data.oauth,
      oauth_id: data.oauth_id,
    });
    const profileToken = signJwtAccessToken({
      username: data.username,
      email: data.email,
      full_name: data.name,
      avatar: data.avatar,
      role: "github user",
      verified: "true",
      oauth: "github",
    });
    res.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; Path=/; Secure; HttpOnly; SameSite; Max-Age=864000;`,
      `refreshToken=${refreshToken}; Path=/; Secure; HttpOnly; SameSite; Max-Age=864000;`,
      `profileToken=${profileToken}; Path=/; Secure; HttpOnly; SameSite; Max-Age=864000;`,
    ]);
    return res.redirect("/profile");
  }
}
