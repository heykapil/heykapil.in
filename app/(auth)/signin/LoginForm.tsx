'use client';
import { useFormState } from 'react-dom';
import { Login } from 'app/db/actions';
import Link from 'next/link';
import { SubmitButton } from '../guestbook/SubmitButton';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { EMPTY_FORM_STATE } from 'app/components/helpers/to-form-state';
import { FieldError } from 'app/components/helpers/fieldError';
import { useToastMessage } from 'app/components/helpers/form-reset-toast';
import { useFormReset } from 'app/components/helpers/form-reset-toast';
export function LoginForm({
  message,
  callBackUrl,
}: {
  message: string;
  callBackUrl: string;
}) {
  const [formState, action] = useFormState(Login, EMPTY_FORM_STATE);
  const [hidden, setHidden] = useState<boolean>(true);
  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);
  return (
    <form
      action={action}
      ref={formRef}
      className="flex flex-col space-y-2 mb-10 mt-5"
    >
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

        <FieldError formState={formState} name="username" />
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
      </div>
      <div className="relative mb-6 max-w-lg">
        <input
          type={hidden ? 'password' : 'text'}
          className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          name="password"
          minLength={3}
          maxLength={50}
          placeholder="Password"
          required
        />

        <FieldError formState={formState} name="password" />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <button
            onClick={(e) => {
              e.preventDefault(), setHidden((bool) => !bool);
            }}
          >
            {hidden ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-zinc-500"
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
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="size-4 text-[#737373]"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6487 5.39489C14.4859 4.95254 13.2582 4.72021 12 4.72021C8.46997 4.72021 5.17997 6.54885 2.88997 9.71381C1.98997 10.9534 1.98997 13.037 2.88997 14.2766C3.34474 14.9051 3.83895 15.481 4.36664 16.0002M19.3248 7.69653C19.9692 8.28964 20.5676 8.96425 21.11 9.71381C22.01 10.9534 22.01 13.037 21.11 14.2766C18.82 17.4416 15.53 19.2702 12 19.2702C10.6143 19.2702 9.26561 18.9884 7.99988 18.4547"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12C15 13.6592 13.6592 15 12 15M14.0996 9.85541C13.5589 9.32599 12.8181 9 12 9C10.3408 9 9 10.3408 9 12C9 12.7293 9.25906 13.3971 9.69035 13.9166"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 21.0002L22 2.7002"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
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
      {noScriptFallback}
    </form>
  );
}
