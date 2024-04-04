import { cookies } from "next/headers";
import { getDataFromToken } from "./jwt";
export async function Session() {
  let session: any;
  const profileToken = cookies().get("profileToken")?.value || "";
  if (profileToken) {
    session = await getDataFromToken({ token: profileToken });
  } else {
    session = null;
  }
  return session;
}
