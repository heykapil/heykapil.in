"use client";

import { useRef } from "react";
import { saveCommentEntry } from "lib/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { SignOut } from "app/guestbook/buttons";
import { useState, Suspense, lazy } from "react";
import Halo from "../Halo";
import Spinner from "../Spinner";

const MarkdownPreview = lazy(() => import("./Preview"));
export default function CommentForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [entry, setEntry] = useState("");
  // const [loading, setLoading] = useState(false);

  const { pending } = useFormStatus();
  return (
    <>
      <SignOut />
      <form
        id='comment-forn'
        style={{ opacity: !pending ? 1 : 0.5 }}
        className='w-full max-w-full mb-8 space-y-1'
        ref={formRef}
        action={async (formData: FormData) => {
          // setLoading(true);
          await saveCommentEntry(formData, slug);
          formRef.current?.reset();
          // setLoading(false);
        }}
      >
        <div>
          <div className='relative'>
            <textarea
              rows={3}
              placeholder='Enter your comment...'
              aria-label='Enter your comment...'
              disabled={pending}
              name='entry'
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              required
              className='p-2 w-full border border-[var(--border)] outline-[var(--border)] rounded-md bg-[var(--primaryforeground)] text-[var(--primary)]'
            />
            <div className='flex justify-between'>
              <div className='inline-flex items-center gap-2 mb-2'>
                <label className='relative flex cursor-pointer items-center rounded-full'>
                  <input
                    id='default-checkbox'
                    type='checkbox'
                    className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-none checked:rounded-full border border-[var(--foreground)] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                    checked={showPreview}
                    onChange={(e) => setShowPreview(e.target.checked)}
                  />
                  <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                </label>
                <span className='cursor-pointer opacity-80'>Preview</span>
              </div>

              <span className='flex justify-end text-xs text-[var(--secondaryforeground)] opacity-70 break-words'>
                Markdown and html tags are supported.
              </span>
            </div>
            {showPreview && (
              <Suspense
                fallback={<span className='text-sm italic'>Loading...</span>}
              >
                <div className='preview bg-[var(--offset)] p-2 rounded-md mb-2 text-[var(--foreground)]'>
                  <MarkdownPreview markdown={entry} />
                </div>
              </Suspense>
            )}

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
        <div className='flex items-center justify-between'>
          <button
            className='border w-fit border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-md text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-3 cursor-pointer hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
            disabled={pending}
            type='submit'
          >
            <Halo
              className='flex items-center justify-between gap-2 px-4 py-2'
              size={120}
              strength={30}
            >
              {pending ? <Spinner /> : "Submit"}
            </Halo>
          </button>
        </div>
      </form>
    </>
  );
}
