import { auth } from "lib/auth";
import { queryBuilder } from "lib/db";
import { SignIn } from "app/guestbook/buttons";
import { Suspense } from "react";
import Image from "next/image";
import CommentForm from "./Form";
async function getComment() {
  const data = await queryBuilder
    .selectFrom("comments")
    .select(["body", "name", "image", "email"])
    .orderBy("created_at", "desc")
    .limit(100)
    .execute();

  return data;
}

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function CommentPage({ slug }: { slug: string }) {
  let entries;
  let session;
  const randomHex = Array.from({ length: 32 }, () =>
    "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
  ).join("");
  try {
    const [commentRes, sessionRes] = await Promise.allSettled([
      getComment(),
      auth(),
    ]);

    if (commentRes.status === "fulfilled" && commentRes.value[0]) {
      entries = commentRes.value;
    } else {
      console.error(commentRes);
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
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {session?.user ? (
          <>
            <CommentForm slug={slug} />
          </>
        ) : (
          <SignIn />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {entries.map((entry) => (
          <div key={randomHex} className='flex flex-col space-y-1 mb-4'>
            <div className='flex items-center space-x-2'>
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.name}
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
                  {entry.name}:{" "}
                </span>
                <span className='text-sm opacity-100'>{entry.body}</span>
              </p>
            </div>
          </div>
        ))}
      </Suspense>
    </>
  );
}
