import type { Metadata } from "next";
import { auth } from "lib/auth";
import { queryBuilder } from "lib/db";
import SignIn from "./buttons";
import { formatDate } from "@/lib/posts/format-date";
import React, { Suspense, lazy } from "react";
import Form from "./form";
import Image from "next/image";
const MarkdownPreview = lazy(() => import("@/components/comment/Preview"));

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
      auth(),
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
        </>
      ) : (
        <SignIn />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        {entries === undefined ? (
          <p className='my-2'>No entry. Be the first one to add an entry.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className='py-4 border-b border-[var(--border)] rounded-md'
            >
              <div className='grid grid-cols-12 w-full'>
                <div className='flex rounded-xl col-span-12'>
                  <div className='flex h-8 w-8 bg-[var(--offset)] items-center justify-center overflow-hidden rounded-full flex-shrink-0'>
                    {entry.image ? (
                      <Image
                        src={entry.image}
                        alt={entry.created_by}
                        width={28}
                        height={28}
                        className='rounded-full self-centered'
                      />
                    ) : (
                      <svg
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[28px] h-[28px] self-centered'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                        />
                      </svg>
                    )}
                  </div>
                  <div className='ml-2 w-full'>
                    <div className='flex w-full items-start justify-between'>
                      <span className='font-semibold opacity-70 text-sm capitalize'>
                        {entry.created_by}
                      </span>
                      <span className='truncate opacity-70 text-sm'>
                        {" "}
                        {formatDate(entry.updated_at?.toISOString())}
                      </span>
                    </div>
                    <div className='mt-1 prose prose-quoteless prose-neutral dark:prose-invert'>
                      <Suspense
                        fallback={
                          <span className='text-sm italic'>Loading...</span>
                        }
                      >
                        <MarkdownPreview markdown={entry.body} />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Suspense>
    </section>
  );
}
