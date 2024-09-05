import { cookies } from 'next/headers';
import { decryptToken } from './paseto';
import { redis } from './redis';
import { Logout } from 'app/db/actions';
import { redirect } from 'next/navigation';
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
    const decodedToken = await decryptToken(profileToken);
    const pool = await redis();
    const redissessionId = await pool.get(decodedToken?.userid);
    console.log(redissessionId);
    if (redissessionId === sessionId) {
      session = decodedToken;
    } else {
      session = null;
      redirect('/signout?error=Session Expired');
    }
    await pool.quit();
  } else {
    session = null;
  }
  return session;
}
