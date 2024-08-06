import { cookies } from 'next/headers';
import { verifyPasetoToken } from './paseto';
// import { getDataFromToken } from "./jwt";
export async function Session() {
  let session: any;
  const profileToken = cookies().get('profileToken')?.value || '';
  if (profileToken) {
    session = await verifyPasetoToken({ token: profileToken });
    // console.log(session);
  } else {
    session = null;
  }
  return session;
}
