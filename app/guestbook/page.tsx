import type { Metadata } from "next";
import { auth } from "lib/auth";
import { queryBuilder } from "lib/db";
import SignIn from "./buttons";
import React, { Suspense, lazy } from "react";
const Form = lazy(() => import("./form"));
const Entry = lazy(() => import("./Entry"));
async function getGuestbook() {
  const data = await queryBuilder
    .selectFrom("guestbook")
    .select(["id", "body", "created_by", "updated_at", "image", "email"])
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
              <Suspense fallback={<div>Loading...</div>}>
                <Entry
                  id={entry.id}
                  created_at={entry.updated_at}
                  name={entry.created_by}
                  image={entry.image || ""}
                  email={entry.email}
                  body={entry.body}
                />
              </Suspense>
            </div>
          ))
        )}
      </Suspense>
    </section>
  );
}
