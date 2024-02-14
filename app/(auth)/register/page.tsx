import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "../guestbook/SubmitButton";
import { Register } from "app/db/actions";
import { Session } from "app/components/helpers/session";
import Link from "next/link";
export default async function RegisterPage(props: any) {
  const callBackUrl = props?.searchParams?.callback?.toString() || "/profile";
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  const RegisterCookie = cookies().get("RegisterCookie");
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Register</h1>
      <p className="my-4 text-md font-medium text-neutral-500">
        Create an account!
      </p>
      <form action={Register} className="flex flex-col space-y-3 mb-10 my-4">
        <div className="relative mb-2">
          <input
            type="text"
            className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-teal-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-teal-300 focus:outline-none input active:outline-none"
            name="full_name"
            minLength={3}
            placeholder="full name"
            required
          />
        </div>
        <div className="relative mb-2">
          <input
            type="email"
            className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-teal-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-teal-300 focus:outline-none input active:outline-none"
            name="email"
            minLength={3}
            placeholder="Email address"
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
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
        <div className="relative mb-2">
          <input
            type="text"
            className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-teal-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-teal-300 focus:outline-none input active:outline-none"
            name="username"
            minLength={3}
            placeholder="username"
            required
          />
        </div>
        <div className="relative mb-2">
          <input
            type="password"
            className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-teal-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-teal-300 focus:outline-none input active:outline-none"
            name="password"
            minLength={3}
            placeholder="password"
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
        </div>
        <div className="space-y-9">
          <div>
            <a className="text-sm font-bold text-neutral-500" href="#">
              Strong password generator!
            </a>
          </div>
          <div className="text-sm">
            {!!RegisterCookie && (
              <span className="text-[#0000ff] dark:text-blue-200">
                {JSON.parse(JSON.stringify(RegisterCookie)).value as string}
              </span>
            )}
          </div>
          <div className="text-sm flex justify-between items-center">
            <Link
              className="font-bold text-neutral-700 dark:text-neutral-300 py-2 px-2 rounded -ml-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 "
              href={`/signin?callback=${callBackUrl}`}
            >
              Sign in
            </Link>
            <SubmitButton
              type="submit"
              className="py-2 px-6 rounded text-black dark:text-white bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700  dark:hover:bg-neutral-600"
              pendingState={<span>Loading...</span>}
            >
              Register
            </SubmitButton>
          </div>
        </div>

        {/* {!!accessCookie && redirect(callBackUrl)} */}
      </form>
    </section>
  );
}
