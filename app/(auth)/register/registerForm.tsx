'use client';
import { useFormState } from 'react-dom';
import { Register } from 'app/db/actions';
import { SubmitButton } from '../guestbook/SubmitButton';
import Link from 'next/link';
import { EMPTY_FORM_STATE } from 'app/components/helpers/to-form-state';
import { FieldError } from 'app/components/helpers/fieldError';
import { useToastMessage } from 'app/components/helpers/form-reset-toast';
import { useFormReset } from 'app/components/helpers/form-reset-toast';
const RegisterForm = ({ callBackUrl }: { callBackUrl: string }) => {
  const [formState, action] = useFormState(Register, EMPTY_FORM_STATE);
  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);
  return (
    <>
      <form
        action={action}
        ref={formRef}
        className="flex flex-col space-y-1 mb-10 my-2 gap-2 max-w-lg"
      >
        <div className="relative">
          <input
            type="text"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            name="full_name"
            minLength={3}
            maxLength={50}
            placeholder="John Doe"
            required
            autoFocus
          />
          <FieldError formState={formState} name="title" />
        </div>
        <div className="relative">
          <input
            type="email"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            name="email"
            minLength={3}
            maxLength={50}
            placeholder="my-name@email.com"
            required
          />
          <FieldError formState={formState} name="email" />
        </div>
        <div className="relative">
          <input
            type="text"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            name="username"
            minLength={5}
            placeholder="john123"
            required
          />
          <FieldError formState={formState} name="username" />
        </div>
        <div className="relative">
          <input
            type="password"
            className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            name="password"
            minLength={8}
            maxLength={50}
            placeholder="123abc!@#"
            required
          />
          <FieldError formState={formState} name="password" />
        </div>
        <div className="space-y-0">
          <div className="mb-10">
            <a
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline hover:underline-offset-2"
              href="https://1password.com/password-generator"
              target="_blank"
            >
              Strong password generator ↗
            </a>
          </div>
          <div className="text-sm flex justify-between items-center">
            <Link
              className="text-md font-semibold rounded-md  opacity-80 hover:underline hover:opacity-100"
              href={`/signin?callback=${callBackUrl}`}
            >
              Have an account? Sign in
            </Link>
            <SubmitButton
              type="submit"
              className="px-8 py-2  bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
              pendingState={<span>Registering...</span>}
            >
              Register
            </SubmitButton>
          </div>
        </div>
        {noScriptFallback}
      </form>
      <div className="mb-6 max-w-lg border-t-2 border-opacity-50 border-neutral-500" />
      <p className="my-6 text-md font-medium text-neutral-700 dark:text-neutral-300">
        Or use your github or google account to continue...
      </p>
      <div className="flex flex-col md:flex-row justify-between max-w-lg gap-2 w-full">
        <Link
          className="px-8 py-2 my-0 mx-auto w-full bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
          href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=631dc2729898da1ac8a4&redirect_uri=https%3A%2F%2Fapi.kapil.app%2Fapi%2Fcallback%2Fgithub%3Fnext%3D${callBackUrl}`}
        >
          <img
            alt="GitHub logo"
            src="/github.svg"
            width="20"
            height="20"
            className="inline-block self-center place-self-center mr-2 invert dark:invert-0"
          />
          Login with GitHub
        </Link>

        <Link
          className="px-8 py-2 my-0 mx-auto gap-3 w-full bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&state=${callBackUrl}&redirect_uri=https%3A//api.kapil.app/callback/google&client_id=942887810322-f539im4rt338srvi20r3ed48dvaqd1b1.apps.googleusercontent.com`}
        >
          <img
            alt="Google logo"
            src="/google.svg"
            width="20"
            height="20"
            className="inline-block mr-2 self-center invert dark:invert-0"
          />
          Login with Google
        </Link>

        {/* https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=/guestbook&redirect_uri=http%3A//localhost:3000/callback/google&client_id=942887810322-f539im4rt338srvi20r3ed48dvaqd1b1.apps.googleusercontent.com */}
      </div>
    </>
  );
};

export default RegisterForm;
