"use client";

import { useRef } from "react";
import { saveCommentEntry } from "lib/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { SignOut } from "app/guestbook/buttons";
export default function CommentForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <>
      <SignOut />
      <form
        style={{ opacity: !pending ? 1 : 0.5 }}
        className='w-full max-w-full mb-8 space-y-1'
        ref={formRef}
        action={async (formData) => {
          await saveCommentEntry(formData, slug);
          formRef.current?.reset();
        }}
      >
        <div>
          <label className='sr-only'>Enter your comment...</label>
          <div className='relative'>
            <textarea
              rows={3}
              placeholder='Enter your comment'
              aria-label='Enter your comment...'
              disabled={pending}
              name='entry'
              required
              className='p-2 w-full border border-[var(--border)] outline-[var(--border)] rounded-md bg-[var(--primaryforeground)] text-[var(--primary)]'
            />
            {/* <span class='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-4 w-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span> */}
          </div>
        </div>
        <div className='flex items-center mt-2 justify-between'>
          <button
            className='inline-block px-2 py-1 bg-[var(--offset2)] bg-opacity-60	 rounded-lg text-sm cursor-pointer'
            disabled={pending}
            type='submit'
          >
            Submit{" "}
          </button>
          <span className='text-sm text-[var(--secondaryforeground)] opacity-70'>
            MDX is supported.
          </span>
        </div>
      </form>
    </>
  );
}
