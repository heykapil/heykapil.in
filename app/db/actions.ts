'use server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { queryBuilder } from './db';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { Session } from 'app/components/helpers/session';
import { redirect } from 'next/navigation';
import {
  encryptToken,
  decryptToken,
  verifyPasetoToken,
  signPasetoToken,
} from 'app/components/helpers/paseto';
import { generateRandomUUID } from 'app/components/helpers/uuid';
import { generateState } from 'app/components/helpers/random';

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
  await response.json();
  const path = '/' + slug.replace(',', '/');
  revalidatePath(path);
}
export async function saveGuestbookEntry(formData: FormData) {
  let session = await Session();
  let email = session?.email as string;
  let created_by = session?.full_name as string;
  let image = session?.avatar as string;
  if (!session.email || !session.full_name || !session.userid) {
    throw new Error('Unauthorized');
  }
  let entry = formData.get('entry')?.toString() || '';
  let body = entry.slice(0, 500);
  try {
    const state = generateState();
    const payload = { state };
    const token = await encryptToken({ payload });
    const url = 'https://api.kapil.app/api/guestbook/send?' + `state=${state}`;
    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        userid: session.userid,
        email,
        fullname: created_by,
        avatar: image,
        message: body,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    console.log(response);
    revalidatePath(`/guestbook`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await Session();
  let role = session?.role as string;
  if (role !== 'admin') {
    throw new Error('Unauthorized');
  }

  let selectedEntriesAsNumbers = selectedEntries;
  const state = generateState();
  const token = await encryptToken({ state });
  const response = await fetch(
    process.env.API_URL! + '/api/guestbook/delete?' + `state=${state}`,
    {
      method: 'POST',
      body: JSON.stringify({ ids: selectedEntriesAsNumbers }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.error);
  }
  revalidatePath(`/admin`);
  revalidatePath(`/guestbook`);
}

export async function saveUploadHistory(formData: FormData) {
  let session = await Session();
  let uuid = randomUUID();
  let name = formData.get('filename');
  let url = formData.get('fileurl');
  let size = formData.get('filesize');
  let uploaded_at = formData.get('uploaded_at');
  if (session.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  await queryBuilder
    .insertInto('uploads')
    // @ts-ignore
    .values({ id: uuid, name, size, url, uploaded_at })
    .execute();
  revalidatePath(`/upload`);
}

export async function saveVisitorLog({
  ip,
  location,
  path,
}: {
  ip: string;
  location: string;
  path: string;
}) {
  let uuid = randomUUID();
  await queryBuilder
    .insertInto('visitors')
    .values({ id: uuid, url: path, ip, location })
    .execute();
}

export async function sendEmail(formData: FormData) {
  const from = formData.get('from') || 'Kapil Chaudhary <hi@kapil.app>';
  const to = formData.get('to') as string;
  const subject = formData.get('subject') as string;
  const html = formData.get('html') as string;
  const fileurl = (formData.get('fileurl') as string) || null;
  const filename = (formData.get('filename') as string) || null;
  let body;
  if (!filename || !fileurl) {
    body = JSON.stringify({
      from,
      to,
      subject,
      html,
    });
  } else {
    body = JSON.stringify({
      from,
      to,
      subject,
      html,
      fileurl,
      filename,
    });
  }
  try {
    const token = await encryptToken(
      { subject },
      {
        expiresIn: '60s',
      },
    );
    const data = await fetch('https://api.kapil.app/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body,
      cache: 'no-store',
    });
    const response = await data.json();
    if (response.message) {
      cookies().set({
        name: 'email-sent-toast-msg',
        value: response.message,
        expires: new Date(Date.now() + 10 * 1000),
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function Login(formData: FormData) {
  let username = formData.get('username') as string;
  let password = formData.get('password') as string;
  cookies().set('state', generateState(), {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 60 * 1000),
  });
  const state = cookies().get('state')?.value as string;
  if (username.length < 3 || password.length < 3) {
    cookies().set({
      name: 'LoginCookie',
      value: 'Input both username and password',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 5 * 1000),
    });
  }
  try {
    if (username.length >= 3 && password.length >= 3) {
      const stateToken = await encryptToken(
        { state },
        {
          expiresIn: '60s',
        },
      );
      const data = await fetch(
        process.env.API_URL + '/api/user/login?' + `state=${state}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-state': stateToken as string,
            'x-user-agent': cookies().get('userAgent')?.value as string,
            'x-ipaddress': cookies().get('sessionIP')?.value as string,
            'x-location': cookies().get('sessionLocation')?.value as string,
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );
      const response = await data.json();
      if (response.ok) {
        const rstate = data.headers.get('x-state') as string;
        const dstate = (await decryptToken(rstate))?.state as string;
        const userid = (
          await verifyPasetoToken({
            token: response.token.access_token,
          })
        )?.id as string;
        if (dstate === state) {
          const sessionId = generateRandomUUID();
          const sessionData = await fetch(
            process.env.API_URL + '/api/session',
            {
              method: 'POST',
              body: JSON.stringify({
                sessionid: sessionId,
                usertype: 'Credentials',
                id: userid,
              }),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${response.token.access_token}`,
                'x-user-agent': cookies().get('userAgent')?.value as string,
                'x-ipaddress': cookies().get('sessionIP')?.value as string,
                'x-location': cookies().get('sessionLocation')?.value as string,
              },
            },
          );
          await sessionData.json();

          cookies().set({
            name: 'sessionId',
            value: sessionId,
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: new Date(response.token.refresh_expiry),
          });
          cookies().set({
            name: 'accessToken',
            value: response.token.access_token,
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: new Date(response.token.access_expiry),
          });
          cookies().set({
            name: 'refreshToken',
            value: response.token.refresh_token,
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: new Date(response.token.refresh_expiry),
          });
          cookies().set({
            name: 'profileToken',
            value: response.token.profile_token,
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production' ? true : false,
            expires: new Date(response.token.profile_expiry),
          });
          cookies().set({
            name: 'LoginCookie',
            value: 'Success',
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            expires: new Date(Date.now() + 10 * 1000),
          });
          cookies().delete('state');
        }
      } else {
        cookies().set({
          name: 'LoginCookie',
          value: response.error,
          httpOnly: process.env.NODE_ENV === 'production' ? true : false,
          expires: new Date(Date.now() + 10 * 1000),
        });
        cookies().delete('profileToken');
        cookies().delete('refreshToken');
        cookies().delete('accessToken');
        cookies().delete('state');
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function Register(formData: FormData) {
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();
  const email = formData.get('email')?.toString();
  const fullname = formData.get('full_name')?.toString();
  const state = generateState();
  cookies().set('state', state, {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 60 * 1000),
  });
  const avatar =
    formData.get('avatar')?.toString() ||
    `https://ui-avatars.com/api/?background=random&name=${fullname}`;
  const role = 'user';
  try {
    const stateToken = await encryptToken(
      { state },
      {
        expiresIn: '60s',
      },
    );
    const data = await fetch(
      process.env.API_URL + '/api/user/register?' + `state=${state}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-state': stateToken as string,
          'x-user-agent': cookies().get('userAgent')?.value as string,
          'x-ipaddress': cookies().get('sessionIP')?.value as string,
          'x-location': cookies().get('sessionLocation')?.value as string,
        },
        body: JSON.stringify({
          username,
          password,
          fullname,
          email,
          avatar,
          role,
        }),
      },
    );
    const response = await data.json();
    cookies().set({
      name: 'RegisterCookie',
      value: response.message || response.error || 'Something went wrong!',
      httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: new Date(Date.now() + 10 * 1000),
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function Logout({ callback }: { callback?: string }) {
  cookies().delete('refreshToken');
  cookies().delete('profileToken');
  cookies().delete('accessToken');
  cookies().delete('sessionId');
  cookies().delete('state');
  cookies().delete('csrfToken');
  redirect(callback || '/signin?success=succesfully logged out!');
  return;
}

export async function ChangePass(formData: FormData) {
  const oldPassword = formData.get('oldPass')?.toString();
  const newPassword = formData.get('newPass')?.toString();
  const accessToken = cookies()?.get('accessToken')?.value || '';

  const id = (await verifyPasetoToken({ token: accessToken }))?.id || '';
  try {
    const state = generateState();
    cookies().set('state', state, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 60 * 1000),
    });
    const stateToken = await encryptToken(
      { state },
      {
        expiresIn: '60s',
      },
    );
    const data = await fetch(
      process.env.API_URL! + '/api/user/password/change' + `?state=${state}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'x-state': stateToken as string,
          'x-user-agent': cookies().get('userAgent')?.value as string,
          'x-ipaddress': cookies().get('sessionIP')?.value as string,
          'x-location': cookies().get('sessionLocation')?.value as string,
        },
        body: JSON.stringify({
          id,
          oldPassword,
          newPassword,
        }),
      },
    );
    const response = await data.json();
    console.log(response);
    cookies().set({
      name: 'ChangePassCookie',
      value: response.message || response.error || 'Something went wrong!',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 10 * 1000),
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function ForgotPass(formData: FormData) {
  const username = formData.get('username')?.toString();
  try {
    const state = generateState();
    cookies().set('state', state, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 60 * 1000),
    });
    const stateToken = await encryptToken(
      { state },
      {
        expiresIn: '60s',
      },
    );
    const data = await fetch(
      process.env.API_URL + '/api/user/password/recovery' + `?state=${state}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-state': stateToken as string,
          'x-user-agent': cookies().get('userAgent')?.value as string,
          'x-ipaddress': cookies().get('sessionIP')?.value as string,
          'x-location': cookies().get('sessionLocation')?.value as string,
        },
        body: JSON.stringify({
          email: username,
        }),
      },
    );
    const response = await data.json();
    cookies().set({
      name: 'ForgotPassCookie',
      value: response.message || response.error || 'Something went wrong!',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 10 * 1000),
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function ResetPassword(formData: FormData) {
  const password = formData.get('password')?.toString();
  const token = formData.get('token')?.toString();
  try {
    const data = await fetch(
      process.env.API_URL! + `/api/user/password/reset?token=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-agent': cookies().get('userAgent')?.value as string,
          'x-ipaddress': cookies().get('sessionIP')?.value as string,
          'x-location': cookies().get('sessionLocation')?.value as string,
        },
        body: JSON.stringify({
          password,
        }),
      },
    );
    const response = await data.json();
    cookies().set({
      name: 'ResetPassCookie',
      value: response.message || response.error || 'Something went wrong!',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 10 * 1000),
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function OauthLogin(formData: FormData) {
  const callBackUrl = formData.get('callback')?.toString() || '/profile';
  const link = formData.get('link')?.toString() || '';
  if (!link) {
    throw new Error('Invalid Link');
  }
  const userAgent = cookies().get('userAgent')?.value || '';
  const sessionIP = cookies().get('sessionIP')?.value || '';
  const sessionLocation = cookies().get('sessionLocation')?.value || '';
  const csrfToken = generateState();
  try {
    cookies().set({
      name: 'csrfToken',
      value: csrfToken,
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      expires: new Date(Date.now() + 90 * 1000),
    });
  } catch (error: any) {
    throw new Error(error);
  }
  const payload = {
    csrfToken,
    callBackUrl,
    userAgent,
    sessionIP,
    sessionLocation,
  };
  const stateToken = await encryptToken(payload, { expiresIn: '60s' });
  const url = `${link}&state=${stateToken}`;
  redirect(url);
}

export async function OauthCallback({
  token,
  sessionId,
  next,
}: {
  token: string;
  sessionId: string;
  next: string;
}) {
  if (!token || !sessionId) {
    await Logout({
      callback: `/signin?error=invalid_token_or_session_id&callbackUrl=${next}`,
    });
  }
  const data = await verifyPasetoToken({ token });
  const csrfToken = cookies().get('csrfToken')?.value || '';
  if (data.csrfToken !== csrfToken || !data.csrfToken || !csrfToken) {
    await Logout({
      callback: `/signin?error=error_csrf_token&callbackUrl=${next}`,
    });
  }
  const payload = {
    id: data.id,
    oauth: data.oauth,
    oauth_id: data.oauth_id,
  };
  const accessToken = (await signPasetoToken({
    payload,
    options: {
      expiresIn: '7d',
    },
  })) as string;
  const refreshToken = (await signPasetoToken({
    payload,
    options: {
      expiresIn: '7d',
    },
  })) as string;
  const profilePayload = {
    username: data.username,
    email: data.email,
    full_name: data.name,
    avatar: data.avatar,
    role: data.oauth + 'user',
    verified: 'true',
    oauth: data.oauth,
  };
  const profileToken = await encryptToken(profilePayload, {
    expiresIn: '7d',
  });
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
    expiresIn: 606740 * 1000,
  };
  cookies().set({
    name: 'accessToken',
    value: accessToken,
    ...options,
  });
  cookies().set({
    name: 'refreshToken',
    value: refreshToken,
    ...options,
  });
  cookies().set({
    name: 'profileToken',
    value: profileToken as string,
    ...options,
  });
  cookies().set({
    name: 'sessionId',
    value: sessionId,
    ...options,
  });
  cookies().delete('csrfToken');
  redirect(next);
}
