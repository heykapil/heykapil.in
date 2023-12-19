import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
import { getGuestbookEntries } from "app/db/queries";
import { redirect } from "next/navigation";
import Form from "./form";

export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  let session = await getServerSession(authConfig);
  if (session?.user?.email !== "kapilchaudhary@gujaratuniversity.ac.in") {
    redirect("/");
  }

  let entries = await getGuestbookEntries();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={entries} />
    </section>
  );
}
