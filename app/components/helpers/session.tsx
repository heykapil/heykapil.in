import { cookies } from 'next/headers';
import { decryptToken, verifyPasetoToken } from './paseto';
export async function Session() {
  let session: any;
  const profileToken = cookies().get('profileToken')?.value || '';
  const sessionId = cookies().get('sessionId')?.value || '';
  const accessToken = cookies().get('accessToken')?.value || '';
  const refreshToken = cookies().get('refreshToken')?.value || '';
  if (!sessionId || !accessToken || !refreshToken || !profileToken) {
    session = null;
  }
  if (profileToken && (!sessionId || !accessToken || !refreshToken)) {
    session = null;
  }
  if (profileToken) {
    session = await decryptToken(profileToken);
  } else {
    session = null;
  }
  // console.log(session);
  return session;
}
