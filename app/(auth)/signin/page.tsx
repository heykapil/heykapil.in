import { Login } from "app/db/actions";
import { cookies } from "next/headers";
import { SubmitButton } from "../guestbook/SubmitButton";
import { redirect } from "next/navigation";
import { Session } from "app/components/helpers/session";
import Link from "next/link";
export default async function LoginPage(props: any) {
  const callBackUrl = props?.searchParams?.callback?.toString() || "/profile";
  const LoginCookie = cookies().get("LoginCookie");
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  let callBackmsg = "Kindly login to continue...";
  if (callBackUrl.includes("/admin")) {
    callBackmsg = "Kindly login to continue to the admin panel!";
  }
  if (callBackUrl.includes("/blog")) {
    callBackmsg = "Kindly login to read the blog post!";
  }
  if (callBackUrl.includes("/snippet")) {
    callBackmsg = "Kindly login to read the snippet post!";
  }
  if (callBackUrl.includes("/guestbook")) {
    callBackmsg = "Kindly login to sign the guestbook!";
  }
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Welcome back!
      </h1>
      <p className="my-4 text-md font-medium text-neutral-500">{callBackmsg}</p>
      <form action={Login} className="flex flex-col space-y-2 mb-10 mt-5">
        <div className="relative mb-2 max-w-lg">
          <input
            type="text"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            autoFocus
            name="username"
            minLength={3}
            required
            placeholder="Email or username"
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
        <div className="relative mb-6 max-w-lg">
          <input
            type="password"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            name="password"
            minLength={3}
            placeholder="Password"
            required
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
          {/* <label
            htmlFor="password"
            className="label bg-white dark:bg-black absolute mt-2 ml-3 leading-tighter text-base cursor-text"
          >
            Password
          </label> */}
        </div>
        <div className="space-y-9 max-w-lg">
          <div>
            <a className="text-sm font-bold text-neutral-500" href="#">
              Forgot password?
            </a>
          </div>
          <div className="text-sm flex justify-between items-center">
            <Link
              className="font-bold text-neutral-700 dark:text-neutral-300 py-2 px-2 rounded -ml-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 "
              href={`/register?callback=${callBackUrl}`}
            >
              Create account
            </Link>
            <SubmitButton
              type="submit"
              className="py-2 px-6 rounded text-black dark:text-white bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700  dark:hover:bg-neutral-600"
              pendingState={<span>Loading...</span>}
            >
              Sign in
            </SubmitButton>
          </div>
        </div>
        <div className="text-sm">
          {!!LoginCookie && (
            <span className="text-red-500 font-semibold">
              {JSON.parse(JSON.stringify(LoginCookie)).value as string} !
            </span>
          )}
          {!!LoginCookie &&
          (JSON.parse(JSON.stringify(LoginCookie)).value as string) ===
            "Success"
            ? redirect(callBackUrl)
            : null}
        </div>
      </form>
    </section>
  );
}
