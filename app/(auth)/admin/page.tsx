import { redirect } from 'next/navigation';
import Form from './Deleteform';
import { cookies } from 'next/headers';
import Emailform from './Emailform';
import UploadComponent from './uploadFile';
import { UploadHistory } from './uploadHistory';
import { Suspense } from 'react';
import { Session } from 'app/components/helpers/session';

export const metadata = {
  title: 'Admin',
};

export default async function GuestbookPage() {
  const session = await Session();
  if (!session || session === null || session === '') {
    redirect('/signin?callback=/admin');
  }
  if (session && session.role !== 'admin') {
    redirect('/profile');
  }
  const msgCookie = cookies().get('email-sent-toast-msg');
  const request = await fetch('https://api.kapil.app/api/guestbook/get');
  const data = await request.json();
  if (!data.ok) {
    return null;
  }

  const entries = data?.data;
  return (
    <section>
      <h1 className="font-medium text-xl mb-8 tracking-tighter">
        Hi,
        {session?.fullname.toUpperCase()}
      </h1>
      <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
      <GetKVList />
      <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
      <h2 className="text-lg my-8"># Delete Guestbook Entries</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Form entries={entries} />
      </Suspense>
      <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
      <h2 className="text-xl my-8"># Send Email</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Emailform />
        {!!msgCookie && (
          <span>{JSON.parse(JSON.stringify(msgCookie)).value as string}</span>
        )}
      </Suspense>
      <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
      <h2 className="text-xl my-8"># Upload to S3</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <UploadComponent />
        <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
        <UploadHistory />
      </Suspense>
    </section>
  );
}

async function GetKVList() {
  try {
    const data = await fetch('https://kv.kapil.app/kv/list?prefix=pageviews');
    const list = await data.json();
    return (
      <div>
        <h2 className="text-lg my-8"># KV pageviews details</h2>
        <div className="border-separate overflow-clip rounded-sm border-y overflow-y-auto h-96">
          <div className="sticky top-0">
            <div className="flex flex-col w-full min-w-full">
              <table className="min-w-full text-left rtl:text-right">
                <thead className="flex min-w-full border-[#737373] border-b bg-zinc-50 dark:bg-zinc-900">
                  <tr className="flex flex-row w-full justify-between">
                    <th className="px-4 py-2 flex">Slug</th>
                    <th className="px-4 py-2 flex">Views</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full min-w-full">
            <table className="w-full min-w-full text-left rtl:text-right">
              <tbody className="flex flex-col min-w-full">
                {list.map((item: any) => (
                  <tr
                    key={item.key}
                    className="flex flex-row justify-between w-full space-x-2"
                  >
                    <td className="px-4 py-2 flex">
                      <a
                        href={item.key.join('/').replace('pageviews', '')}
                        className="hover:underline hover:cursor-pointer hover:text-blue-500"
                      >
                        {item.key.join('/').replace('pageviews', '')}
                      </a>
                    </td>
                    <td className="px-4 py-2 flex">{item.value.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    throw new Error(error);
  }
}
