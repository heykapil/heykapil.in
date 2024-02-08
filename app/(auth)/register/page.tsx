import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "../guestbook/SubmitButton";
import { Register } from "app/db/actions";
import { Session } from "app/components/helpers/session";
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
      <form action={Register} className="flex flex-col space-y-2 ">
        <input
          type="text"
          className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
          name="username"
          minLength={3}
          placeholder="username"
        />
        <input
          type="email"
          className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
          name="email"
          minLength={3}
          placeholder="email"
        />
        <input
          type="password"
          className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
          name="password"
          minLength={3}
          placeholder="password"
        />
        <input
          type="text"
          className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
          name="full_name"
          minLength={3}
          placeholder="full name"
        />
        <SubmitButton
          className="px-3 py-2 w-fit border-b dark:border-gray-800-neutral-200 dark:border-b ring-offset-0 outline-none border-gray-200 dark:border-gray-800-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 transition-all',
         disabled:opacity-50"
          pendingState={
            <p className="flex items-center gap-1">
              Submitting... <span className="loading loading-dots"></span>
            </p>
          }
          // disabled={!u}
          type="submit"
        >
          <p className="">Register</p>
        </SubmitButton>
        {!!RegisterCookie && (
          <span className="text-[#0000ff] dark:text-blue-200">
            {JSON.parse(JSON.stringify(RegisterCookie)).value as string}
          </span>
        )}
        {/* {!!accessCookie && redirect(callBackUrl)} */}
      </form>
    </section>
  );
}
