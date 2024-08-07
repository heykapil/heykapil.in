import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Session } from 'app/components/helpers/session';
import RegisterForm from './registerForm';
export default async function RegisterPage(props: any) {
  const callBackUrl: string =
    props?.searchParams?.callback?.toString() || '/profile';
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  const message = cookies().get('RegisterCookie')?.value || '';
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter animate-fade-right">
        Create account!
      </h1>
      <p className="my-4 text-md font-medium animate-fade-up text-neutral-700 dark:text-neutral-300 ">
        {!!message ? (
          <span className="font-semibold text-red-500">{message}</span>
        ) : (
          `Fill up the registration form to create a new account!`
        )}
      </p>
      <RegisterForm callBackUrl={callBackUrl} />
    </section>
  );
}
