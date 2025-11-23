'use server';
import { signPasetoToken } from 'app/components/helpers/paseto';
import { generateState } from 'app/components/helpers/random';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
};

export async function increment(slug: string) {
  const state = generateState();
  const payload = { state };
  const token = await signPasetoToken({ payload });
  const url =
    'https://kv.kapil.app/kv/sum' +
    `?key=pageviews,${slug}&value=1&state=${state}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer v4.public.${token}`,
    },
    body: JSON.stringify(10),
  });
  console.log(await response.text());
}
