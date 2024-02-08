import { Login } from "app/db/actions";
import { cookies } from "next/headers";
import { SubmitButton } from "../guestbook/SubmitButton";
import { redirect } from "next/navigation";
import { Session } from "app/components/helpers/session";
export default async function LoginPage(props: any) {
  const callBackUrl = props?.searchParams?.callback?.toString() || "/profile";
  const LoginCookie = cookies().get("LoginCookie");
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  let callBackmsg = "Login";
  if (callBackUrl.includes("/admin")) {
    callBackmsg = "Kindly login to continue to admin page!";
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
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Login</h1>
      <p className="my-4 text-md font-medium">{callBackmsg}</p>
      <form action={Login} className="flex flex-col space-y-2">
        <input
          type="text"
          className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
          name="username"
          minLength={3}
          placeholder="username"
        />
        <input
          type="text"
          className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
          name="password"
          minLength={3}
          placeholder="password"
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
          <p className="">Login</p>
        </SubmitButton>
        {!!LoginCookie && (
          <span className="text-fuchsia-500">
            {JSON.parse(JSON.stringify(LoginCookie)).value as string}
          </span>
        )}
        {!!LoginCookie &&
        (JSON.parse(JSON.stringify(LoginCookie)).value as string) === "Success"
          ? redirect(callBackUrl)
          : null}
      </form>
    </section>
  );
}
