import { cookies } from "next/headers";
import { SubmitButton } from "../guestbook/SubmitButton";
import { redirect } from "next/navigation";
import { Session } from "app/components/helpers/session";
import Link from "next/link";
import { ForgotPass } from "app/db/actions";
export default async function ForgotPassPage(props: any) {
  const callBackUrl = props?.searchParams?.callback?.toString() || "/profile";
  const ForgotPassCookie = cookies().get("ForgotPassCookie");
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Forgot password?
      </h1>
      <p className="my-4 text-md font-medium text-neutral-700 dark:text-neutral-300">
        Fill up the form to reset your password!
      </p>
      <form action={ForgotPass} className="flex flex-col space-y-2 mb-10 mt-5">
        <div className="relative mb-2 max-w-lg">
          <input
            type="text"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            autoFocus
            name="username"
            minLength={3}
            required
            placeholder="Email or username"
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
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
          {/* <label
            htmlFor="username"
            className="label bg-white dark:bg-black absolute mt-2 ml-3 leading-tighter text-base cursor-text"
          >
            Email or username
          </label> */}
        </div>
        <div className="space-y-10 max-w-lg mb-10">
          <div className="text-sm flex justify-between items-center">
            <Link
              className="px-3 py-2 border border-opacity-50 border-neutral-900 dark:border-pink-50 text-sm rounded-md font-semibold hover:border-black/[0.9] dark:hover:border-white/[0.9] hover:shadow-lg"
              href={`/signinr?callback=${callBackUrl}`}
            >
              Signin
            </Link>
            <SubmitButton
              type="submit"
              className="px-8 py-2  bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
              pendingState={<span>Loading...</span>}
            >
              Send Email
            </SubmitButton>
          </div>
        </div>
        <div className="text-sm mt-10">
          {!!ForgotPassCookie && (
            <span className="text-red-500 font-semibold">
              {JSON.parse(JSON.stringify(ForgotPassCookie)).value as string} !
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
