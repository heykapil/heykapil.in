import { auth } from "lib/auth";
import { queryBuilder } from "lib/db";
import { SignIn } from "app/guestbook/buttons";
import { Suspense } from "react";
import Image from "next/image";
import CommentForm from "./Form";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
async function getComment(slug: string) {
  const data = await queryBuilder
    .selectFrom("comment")
    .selectAll()
    .where("slug", "=", `${slug}`)
    .select(["body", "name", "image", "email", "id", "created_at"])
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
  try {
    const [commentRes, sessionRes] = await Promise.allSettled([
      getComment(slug),
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
      {session?.user ? (
        <>
          <CommentForm slug={slug} />
        </>
      ) : (
        <>
          <div className='flex flex-row justify-between'>
            <div>
              <span className=''>Sign in to comment!</span>
            </div>
            <SignIn />
          </div>
        </>
      )}
      <Suspense fallback={<div>Loading comments...</div>}>
        {entries === undefined ? (
          <p className='my-2'>No comments. Be the first one to comment.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className='border-b border-[var(--border)] my-4 prose dark:prose-invert'
            >
              <div className='grid grid-cols-12 w-full'>
                <div className='flex rounded-xl col-span-12'>
                  <div className='flex h-8 w-8 bg-[var(--offset)] items-center justify-center overflow-hidden rounded-full flex-shrink-0'>
                    {entry.image ? (
                      <Image
                        src={entry.image}
                        alt={entry.name}
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
                        className='w-[24px] h-[24px] self-centered'
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
                      <span className='font-semibold'>{entry.name}</span>
                      {format(
                        new Date(entry.created_at),
                        "MMM d, yy 'at' h:mm aa"
                      )}
                    </div>
                    <div className='mt-1'>
                      <MDXRemote source={entry.body} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Suspense>
    </>
  );
}
