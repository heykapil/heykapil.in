import { Login, OauthLogin } from 'app/db/actions';
import { cookies } from 'next/headers';
import { SubmitButton } from '../guestbook/SubmitButton';
import { redirect } from 'next/navigation';
import { Session } from 'app/components/helpers/session';
import { LoginForm } from './LoginForm';
export default async function LoginPage(props: any) {
  const callBackUrl: string =
    props?.searchParams?.callback?.toString() || '/profile';
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
      <LoginForm message={message} callBackUrl={callBackUrl} />
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
