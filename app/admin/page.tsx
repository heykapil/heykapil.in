import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
import { getGuestbookEntries } from "app/db/queries";
import { redirect } from "next/navigation";
import Form from "./Deleteform";
import { cookies } from "next/headers";
import Emailform from "./Emailform";
import UploadComponent from "./uploadFile";
import { UploadHistory } from "./uploadHistory";
export const metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  // let session = await getServerSession(authConfig);
  // if (session?.user?.email !== "kapilchaudhary@gujaratuniversity.ac.in") {
  //   redirect("/");
  // }
  const toastCookie = cookies().get("email-sent-toast-msg");
  let entries = await getGuestbookEntries();
  return (
    <>
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Admin</h1>
        <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
        <h2 className="font-medium text-lg my-8 tracking-tighter">
          Delete Guestbook Entries
        </h2>
        <Form entries={entries} />
        <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
        <h2 className="font-medium text-lg my-8 tracking-tighter">
          Send Email
        </h2>
        <Emailform />
        {!!toastCookie && (
          <p>{JSON.parse(JSON.stringify(toastCookie)).value as string}</p>
        )}
        <hr className="my-8 border-neutral-400 dark:border-neutral-600" />
        <h2 className="font-medium text-lg my-8 tracking-tighter">
          Upload to S3
        </h2>
        <UploadComponent />
        <UploadHistory />
      </section>
    </>
  );
}
