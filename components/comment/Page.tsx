import { auth } from "lib/auth";
import { queryBuilder } from "lib/db";
import { Suspense, lazy } from "react";
const CommentForm = lazy(() => import("./Form"));
const SignIn = lazy(() => import("@/app/guestbook/buttons"));
const CommentEntry = lazy(() => import("./Entry"));
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
              <Suspense fallback={<div>Loading...</div>}>
                <CommentEntry
                  id={entry.id}
                  slug={slug}
                  email={entry.email}
                  body={entry.body}
                  created_at={entry.created_at}
                  name={entry.name}
                  image={entry?.image || ""}
                />
              </Suspense>
            </div>
          ))
        )}
      </Suspense>
    </>
  );
}
