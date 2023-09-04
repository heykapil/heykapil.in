import { auth } from "lib/auth";
import { queryBuilder } from "lib/db";
import { Suspense, lazy } from "react";
import { formatDate } from "lib/posts/format-date";
import Image from "next/image";
const CommentForm = lazy(() => import("./Form"));
const MarkdownPreview = lazy(() => import("./Preview"));
const SignIn = lazy(() => import("@/app/guestbook/buttons"));
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
          <Suspense
            fallback={<span className='text-sm italic'>Loading...</span>}
          >
            <CommentForm slug={slug} />
          </Suspense>
        </>
      ) : (
        <>
          <div className='flex flex-row justify-between'>
            <div className='w-1/4 break-words'>
              <span className=''>Sign in to comment!</span>
            </div>
            <Suspense
              fallback={<span className='text-sm italic'>Loading...</span>}
            >
              <SignIn />
            </Suspense>
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
              className='py-4 border-b border-[var(--border)] rounded-md'
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
                      <span className='font-semibold opacity-70 text-sm capitalize'>
                        {entry.name}
                      </span>
                      <span className='truncate opacity-70 text-sm'>
                        {" "}
                        {formatDate(entry.created_at?.toISOString())}
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
    </>
  );
}
