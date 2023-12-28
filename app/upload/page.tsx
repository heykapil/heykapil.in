import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { UploadHistory } from "./uploadHistory";

const UploadComponent = dynamic(() => import("./uploadFile"));

export const metadata = {
  title: "Upload",
};

export default async function GuestbookPage() {
  let session = await getServerSession(authConfig);
  if (session?.user?.email !== "kapilchaudhary@gujaratuniversity.ac.in") {
    return (
      <div>
        <p>Not Authorized!</p>
      </div>
    );
  } else {
    return (
      <section>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          Upload files
        </h1>
        <Suspense fallback={<p className="h-6">Loading...</p>}>
          <UploadComponent />
        </Suspense>
        <UploadHistory />
      </section>
    );
  }
}
