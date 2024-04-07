import { getGuestbookEntries } from "app/db/queries";
import { Suspense } from "react";
import Form from "./form";
import { Session } from "app/components/helpers/session";
import { redirect } from "next/navigation";
import { SignOut } from "app/components/helpers/signout";
import Link from "next/link";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export default async function GuestbookPage() {
  const session = await Session();
  // console.log(session);
  if (!session || session === null || session === "") {
    redirect("/signin?callback=/guestbook");
  }
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
  // @ts-ignore
  let session = await Session();
  return session?.email ? (
    <>
      <Form />
      <SignOut callback={"/signin"} />
    </>
  ) : (
    <p className="py-6">
      Kindly{" "}
      <Link className="underline" href="/signin?callback=/guestbook">
        login
      </Link>{" "}
      to leave a message here.
    </p>
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
