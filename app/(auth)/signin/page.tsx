import { Login, OauthLogin } from 'app/db/actions';
import { cookies } from 'next/headers';
import { SubmitButton } from '../guestbook/SubmitButton';
import { redirect } from 'next/navigation';
import { Session } from 'app/components/helpers/session';
import Link from 'next/link';
export default async function LoginPage(props: any) {
  const callBackUrl = props?.searchParams?.callback?.toString() || '/profile';
  const error = props?.searchParams?.error?.toString() || '';
  const message = cookies().get('LoginCookie')?.value || '';
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  let callBackmsg = 'Kindly login to continue...';
  if (callBackUrl.includes('/admin')) {
    callBackmsg = 'Kindly login to continue to the admin panel!';
  }
  if (callBackUrl.includes('/blog')) {
    callBackmsg = 'Kindly login to read the blog post!';
  }
  if (callBackUrl.includes('/snippet')) {
    callBackmsg = 'Kindly login to read the snippet post!';
  }
  if (callBackUrl.includes('/guestbook')) {
    callBackmsg = 'Kindly login to sign the guestbook!';
  }
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter animate-fade-right">
        Welcome back!
      </h1>
      <p className="my-4 text-md font-medium text-neutral-700 dark:text-neutral-300 animate-bounce">
        {!!error || !!message ? (
          <span className="text-red-500 font-semibold">{error || message}</span>
        ) : (
          callBackmsg
        )}
      </p>

      <form action={Login} className="flex flex-col space-y-2 mb-10 mt-5">
        <div className="relative mb-2 max-w-lg">
          <input
            type="text"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            autoFocus
            name="username"
            minLength={3}
            maxLength={50}
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
        <div className="relative mb-6 max-w-lg">
          <input
            type="password"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            name="password"
            minLength={3}
            maxLength={50}
            placeholder="Password"
            required
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
          <div>
            <Link
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline hover:underline-offset-2"
              href="/forgot-pass"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-sm flex justify-between items-center">
            <Link
              className="px-3 py-2 border border-opacity-50 border-neutral-900 dark:border-pink-50 text-sm rounded-md font-semibold hover:border-black/[0.9] dark:hover:border-white/[0.9] hover:shadow-lg"
              href={`/register?callback=${callBackUrl}`}
            >
              Create account
            </Link>
            <SubmitButton
              type="submit"
              className="px-8 py-2  bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
              pendingState={<span className="mx-auto table">Loading...</span>}
            >
              Login
            </SubmitButton>
          </div>
        </div>
        <div className="text-sm mt-10">
          {!!message && message === 'Success' ? redirect(callBackUrl) : null}
        </div>
      </form>
      <div className="mb-6 max-w-lg border-t-2 border-opacity-50 border-neutral-500" />
      <p className="my-6 text-md font-medium text-neutral-700 dark:text-neutral-300">
        Or use your github or google account to continue...
      </p>
      <div className="flex flex-col md:flex-row justify-between max-w-lg gap-2 w-full">
        <form
          action={OauthLogin}
          className="px-8 py-2 my-0 mx-auto gap-3 w-full bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
        >
          <input
            type="hidden"
            name="link"
            value={`https://github.com/login/oauth/authorize?scope=user:email&client_id=631dc2729898da1ac8a4&redirect_uri=${process.env.API_URL}/api/callback/github`}
            required
            minLength={1}
          />
          <input type="hidden" name="callback" value={callBackUrl} />
          <SubmitButton
            type="submit"
            pendingState={
              <>
                <img
                  alt="GitHub logo"
                  src="/github.svg"
                  width="20"
                  height="20"
                  className="inline-block self-center place-self-center mr-2 invert dark:invert-0"
                />
                Waiting for github...
              </>
            }
          >
            <img
              alt="GitHub logo"
              src="/github.svg"
              width="20"
              height="20"
              className="inline-block self-center place-self-center mr-2 invert dark:invert-0"
            />
            Login with GitHub
          </SubmitButton>
        </form>

        <form
          action={OauthLogin}
          className="px-8 py-2 my-0 mx-auto gap-3 w-full bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
        >
          <input
            type="hidden"
            name="link"
            value={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&redirect_uri=${process.env.API_URL!}/callback/google&client_id=942887810322-f539im4rt338srvi20r3ed48dvaqd1b1.apps.googleusercontent.com`}
            required
            minLength={1}
          />
          <input type="hidden" name="callback" value={callBackUrl} />
          <SubmitButton
            type="submit"
            pendingState={
              <>
                <img
                  alt="Google logo"
                  src="/google.svg"
                  width="20"
                  height="20"
                  className="inline-block self-center place-self-center mr-2 invert dark:invert-0"
                />
                <span>Waiting for google...</span>
              </>
            }
          >
            <img
              alt="Google logo"
              src="/google.svg"
              width="20"
              height="20"
              className="inline-block self-center place-self-center mr-2 invert dark:invert-0"
            />
            Login with Google
          </SubmitButton>
        </form>

        {/* https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=/guestbook&redirect_uri=http%3A//localhost:3000/callback/google&client_id=942887810322-f539im4rt338srvi20r3ed48dvaqd1b1.apps.googleusercontent.com */}
      </div>
    </section>
  );
}
