import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
import { getGuestbookEntries } from "app/db/queries";
import { SignIn, SignOut } from "./buttons";
import { Suspense } from "react";
import Form from "./form";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export default function GuestbookPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter bg-gradient-to-r from-zinc-300 via-neutral-700 to-zinc-900  bg-clip-text text-transparent">
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
  let session = await getServerSession(authConfig);

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="inline-flex gap-1 items-baseline text-neutral-600 dark:text-neutral-400 mr-1">
          <img
            className="rounded-full w-4 h-4 self-center"
            src={entry.image}
            alt={entry.created_by}
          />
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}
