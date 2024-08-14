import { Suspense } from 'react';
import Form from './form';
import { Session } from 'app/components/helpers/session';
import Link from 'next/link';

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

export default async function GuestbookPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter bg-gradient-to-r from-zinc-300 via-neutral-700 to-zinc-900  bg-clip-text text-transparent animate-fade-right">
        Sign my guestbook
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  );
}

async function GuestbookForm() {
  const session = await Session();
  return !session || !session?.email || !session.username ? (
    <p className="py-6">
      Kindly{' '}
      <Link className="underline" href="/signin?callback=/guestbook">
        login
      </Link>{' '}
      to leave a message here.
    </p>
  ) : (
    <>
      <Form />
      <a href={`/signout?callback=/signin`}>
        <button className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6 rounded-lg px-3 py-2 font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700">
          Sign Out
        </button>
      </a>
    </>
  );
}

async function GuestbookEntries() {
  const request = await fetch('https://api.kapil.app/api/guestbook/get');
  const data = await request.json();
  if (!data.ok) {
    return null;
  }

  const entries = data?.data;

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="inline-flex gap-1 items-baseline text-neutral-600 dark:text-neutral-400 mr-1">
          <img
            className="rounded-full w-4 h-4 self-center"
            src={entry.avatar}
            alt={entry.fullname}
          />
          {entry.fullname}:
        </span>
        {entry.message}
      </div>
    </div>
  ));
}
