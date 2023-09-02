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
      <Suspense fallback={<div>Loading...</div>}>
        {session?.user ? (
          <>
            <CommentForm slug={slug} />
          </>
        ) : (
          <>
            <div className='flex flex-row justify-between'>
              <div>
                <span className=''>Sign in to add comment!</span>
              </div>
              <SignIn />
            </div>
          </>
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {entries === undefined ? (
          <p className='my-2'>No comments. Be the first one to comment.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className='flex flex-col space-y-0 mb-4'>
              <div className='grid grid-cols-12'>
                <div className='flex rounded-xl  p-2 col-span-12'>
                  <div className='mx-1 flex h-fit w-fit items-center justify-center overflow-hidden rounded-full flex-shrink-0'>
                    {entry.image ? (
                      <Image
                        src={entry.image}
                        alt={entry.name}
                        width={25}
                        height={25}
                        className='rounded-full self-start'
                      />
                    ) : (
                      <svg
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[25px] h-[25px] self-start'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                        />
                      </svg>
                    )}
                  </div>

                  <div className='ml-4 w-full'>
                    <div className='flex w-full items-center justify-between'>
                      <p className='font-semibold'>{entry.name}</p>
                      {format(
                        new Date(entry.created_at),
                        "MMM d, yy 'at' h:mm aa"
                      )}
                    </div>
                    <div className='mt-4'>
                      <MDXRemote source={entry.body} />
                      {/* 
                      <div className='mt-4 space-x-2'>
                        <button className='px-4 py-2 rounded-xl bg-zinc-400 text-white font-medium'>
                          Reply
                        </button>

                        <button className='px-4 py-2 rounded-xl bg-sky-400 text-white font-medium'>
                          Edit
                        </button>

                        <button className='px-4 py-2 rounded-xl bg-red-400 text-white font-delete'>
                          Edit
                        </button>
                      </div> */}
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
