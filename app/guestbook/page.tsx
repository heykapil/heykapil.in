import type { Metadata } from "next";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { queryBuilder } from "lib/db";
import { SignIn, SignOut } from "./buttons";
import Form from "./form";
import { getServerSession } from "next-auth";
import Image from "next/image";
async function getGuestbook() {
  const data = await queryBuilder
    .selectFrom("guestbook")
    .select(["id", "body", "created_by", "updated_at", "image", "username"])
    .orderBy("updated_at", "desc")
    .limit(100)
    .execute();

  return data;
}

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function GuestbookPage() {
  let entries;
  let session;

  try {
    const [guestbookRes, sessionRes] = await Promise.allSettled([
      getGuestbook(),
      getServerSession(authOptions),
    ]);

    if (guestbookRes.status === "fulfilled" && guestbookRes.value[0]) {
      entries = guestbookRes.value;
    } else {
      console.error(guestbookRes);
    }

    if (sessionRes.status === "fulfilled") {
      session = sessionRes.value;
    } else {
      console.error(sessionRes);
    }
  } catch (error) {
    console.error(error);
  }
  return (
    <section>
      <h1 className='font-bold text-2xl mb-4 tracking-tighter'>Guestbook</h1>
      <p className='mb-12 text-sm'>
        Leave a comment below. It could be anything – appreciation, information,
        wisdom, or even humor.
      </p>
      {session?.user ? (
        <>
          <Form />
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
      {entries.map((entry) => (
        <div key={entry.id} className='flex flex-col space-y-1 mb-4'>
          <div className='flex items-center space-x-2'>
            {entry.image ? (
              <Image
                src={entry.image}
                alt={entry.created_by}
                width={18}
                height={18}
                className='rounded-full'
              />
            ) : (
              <svg
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-2 h-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
            )}
            <p className='break-words'>
              <span className='text-xs capitalize	opacity-50'>
                {entry.created_by}:{" "}
              </span>
              <span className='text-sm opacity-100'>{entry.body}</span>
            </p>
            {/* <span className=' text-gray-200 dark:text-gray-800'>•</span>
            <p className='text-sm text-gray-400 dark:text-gray-600'>
              {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}
            </p> */}
          </div>
        </div>
      ))}
    </section>
  );
}
