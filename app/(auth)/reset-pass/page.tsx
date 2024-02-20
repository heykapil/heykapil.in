import { cookies } from "next/headers";
import { SubmitButton } from "app/(auth)/guestbook/SubmitButton";
import { redirect } from "next/navigation";
import { Session } from "app/components/helpers/session";
import Link from "next/link";
import { ResetPassword } from "app/db/actions";
import { getDataFromToken } from "app/components/helpers/jwt";
export default async function ForgotPassPage(props: any) {
  const callBackUrl = props?.searchParams?.callback?.toString() || "/profile";
  const token = props?.searchParams?.token?.toString() || "";
  const id = getDataFromToken({ token })?.id || "";
  if (!token || !id) redirect("/");
  const ResetPassCookie = cookies().get("ResetPassCookie");
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Reset password!
      </h1>
      <p className="my-4 text-md font-medium text-neutral-700 dark:text-neutral-300">
        Enter the new password!
      </p>
      <form
        action={ResetPassword}
        className="flex flex-col space-y-2 mb-10 mt-5"
      >
        <div className="relative mb-2 max-w-lg">
          <input
            type="text"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            autoFocus
            name="password"
            minLength={3}
            required
            placeholder="New password"
          />
          <input
            type="text"
            className="hidden"
            hidden
            name="token"
            value={token}
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
        <div className="space-y-10 max-w-lg mb-10">
          <div className="text-sm flex justify-between items-center">
            <Link
              className="px-3 py-2 border border-opacity-50 border-neutral-900 dark:border-pink-50 text-sm rounded-md font-semibold hover:border-black/[0.9] dark:hover:border-white/[0.9] hover:shadow-lg"
              href={`/signin?callback=${callBackUrl}`}
            >
              Sign in
            </Link>
            <SubmitButton
              type="submit"
              className="px-8 py-2  bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
              pendingState={<span>Loading...</span>}
            >
              Change Password
            </SubmitButton>
          </div>
        </div>
        <div className="text-sm mt-10">
          {!!ResetPassCookie && (
            <span className="text-red-500 font-semibold">
              {JSON.parse(JSON.stringify(ResetPassCookie)).value as string} !
            </span>
          )}
          {/* {!!ForgotPassCookie &&
          (JSON.parse(JSON.stringify(ForgotPassCookie)).value as string) ===
            "Success"
            ? redirect(callBackUrl)
            : null} */}
        </div>
      </form>
    </section>
  );
}
