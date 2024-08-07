import type { NextApiRequest, NextApiResponse } from 'next';
import {
  verifyPasetoToken,
  signPasetoToken,
} from 'app/components/helpers/paseto';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = (req.query?.token as string) || '';
    const next = (req.query?.next as string) || '/profile';
    const sessionId = (req.query?.sessionid as string) || '';
    if (!token || !sessionId) {
      return res.status(400).json({ error: 'Bad Request' });
    }
    if (token) {
      const data = await verifyPasetoToken({ token });
      const payload = {
        id: data.id,
        oauth: data.oauth,
        oauth_id: data.oauth_id,
      };
      const accessToken = (await signPasetoToken({
        payload,
      })) as string;
      const refreshToken = (await signPasetoToken({ payload })) as string;
      const profilePayload = {
        username: data.username,
        email: data.email,
        full_name: data.name,
        avatar: data.avatar,
        role: 'google user',
        verified: 'true',
        oauth: 'google',
      };
      const profileToken = (await signPasetoToken({
        payload: profilePayload,
      })) as string;
      res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite; Max-Age=864000;`,
        `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite; Max-Age=864000;`,
        `profileToken=${profileToken}; Path=/;  HttpOnly; Secure; SameSite; Max-Age=864000;`,
        `sessionId=${sessionId}; Path=/; HttpOnly; SameSite; Secure; Max-Age=864000;`,
        `newcsrfToken=${data.csrfToken}; Path=/; HttpOnly; SameSite; Secure;`,
      ]);
      return res.status(200).redirect(next);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
