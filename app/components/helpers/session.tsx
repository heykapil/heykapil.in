import { cookies } from 'next/headers';
import { verifyPasetoToken } from './paseto';
import { redirect } from 'next/navigation';
export async function Session() {
  let session: any;
  const profileToken = cookies().get('profileToken')?.value || '';
  const oldcsrfToken = cookies().get('oldcsrfToken')?.value || '';
  const newcsrfToken = cookies().get('newcsrfToken')?.value || '';
  if (oldcsrfToken !== newcsrfToken) {
    redirect('/signout?error=csrf-token-mismatch');
  }
  if (profileToken) {
    session = await verifyPasetoToken({ token: profileToken });
  } else {
    session = null;
  }
  return session;
}
