import { cookies } from 'next/headers';
import { verifyPasetoToken } from './paseto';
export async function Session() {
  let session: any;
  const profileToken = cookies().get('profileToken')?.value || '';
  if (profileToken) {
    session = await verifyPasetoToken({ token: profileToken });
  } else {
    session = null;
  }
  return session;
}
