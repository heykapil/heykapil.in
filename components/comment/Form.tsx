"use client";

import { useRef } from "react";
import { saveCommentEntry } from "lib/actions";
import { SignOut } from "app/guestbook/buttons";
import { useState, Suspense, lazy } from "react";
import Halo from "../Halo";
import { FormSubmitButton } from "./FormSubmitButton";
const MarkdownPreview = lazy(() => import("./Preview"));
export default function CommentForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [entry, setEntry] = useState("");
  return (
    <>
      <SignOut />
      <form
        id='comment-forn'
        style={{ opacity: 1 }}
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
              // disabled={pending}
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

              <span className='flex space-x-1.5 text-gray-500 self-start rounded-md justify-end'>
                <svg
                  width={25}
                  height={25}
                  viewBox='0 0 32 32'
                  id='icon'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g fill='currentColor'>
                    <polygon points='28 19 28 11 26 11 26 21 32 21 32 19 28 19'></polygon>
                    <polygon points='24 11 22 11 20.5 15 19 11 17 11 17 21 19 21 19 14 20.5 18 22 14 22 21 24 21 24 11'></polygon>
                    <polygon points='9 13 11 13 11 21 13 21 13 13 15 13 15 11 9 11 9 13'></polygon>
                    <polygon points='5 11 5 15 2 15 2 11 0 11 0 21 2 21 2 17 5 17 5 21 7 21 7 11 5 11'></polygon>
                  </g>
                </svg>
                <svg
                  fill='currentColor'
                  width={25}
                  height={25}
                  viewBox='0 0 32 32'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g>
                    <path d='M11.333,13.122c-.128-1.562-.241-2.756-2.287-2.756H7.91v8.4h2.145v.611l-3.083-.029-3.082.029v-.611H6.034v-8.4H4.884c-2.046,0-2.159,1.208-2.287,2.756H2l.284-3.367h9.362l.284,3.367h-.6Z'></path>
                    <path d='M19.289,22.53H10.41V21.92h1.506V13.467H10.41v-.611h8.637l.412,3.367h-.6c-.213-1.833-.682-2.756-2.855-2.756H13.791V17.2h.838c1.364,0,1.505-.6,1.505-1.662h.6v3.935h-.6c0-1.08-.142-1.662-1.505-1.662h-.838v4.106h2.216c2.472,0,3-1.108,3.3-3.225h.6Z'></path>
                    <path d='M27.727,19.186c-.54,0-1.96,0-2.415.029V18.6h1.179l-2.557-3.552-2.529,3.381A4.1,4.1,0,0,0,22.7,18.6v.611c-.355-.029-1.576-.029-2.017-.029-.4,0-1.548,0-1.875.029V18.6h.383a7.459,7.459,0,0,0,.824-.043c.5-.043.54-.085.667-.256L23.536,14.5l-3.153-4.418H19V9.47c.384.028,1.79.028,2.273.028.582,0,1.918,0,2.429-.028v.611H22.528l2.117,2.955,2.074-2.784a4.1,4.1,0,0,0-1.293-.17V9.47c.356.028,1.591.028,2.032.028.4,0,1.534,0,1.861-.028v.611h-.369a5.264,5.264,0,0,0-.838.043c-.469.043-.526.071-.667.256l-2.4,3.21L28.636,18.6H30v.611C29.645,19.186,28.182,19.186,27.727,19.186Z'></path>
                  </g>
                </svg>
                <svg
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  width={25}
                  height={25}
                >
                  <g>
                    <path d='M2,16V8H4l3,3,3-3h2v8H10V10.83l-3,3-3-3V16H2M16,8h3v4h2.5l-4,4.5-4-4.5H16Z'></path>
                  </g>
                </svg>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  width={25}
                  height={25}
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      opacity='0'
                      d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z'
                      fill='currentColor'
                    ></path>
                    <path
                      d='M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z'
                      fill='#22c55e'
                    ></path>
                  </g>
                </svg>
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
          <FormSubmitButton
            pendingState={
              <Halo
                className='flex items-center justify-between gap-2 px-4 py-2'
                size={120}
                strength={30}
              >
                Submitting...
              </Halo>
            }
            className='border w-fit border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-md text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-3 cursor-pointer hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
            // disabled={pending}
            type='submit'
          >
            <Halo
              className='flex items-center justify-between gap-2 px-4 py-2'
              size={120}
              strength={30}
            >
              Submit
            </Halo>
          </FormSubmitButton>
        </div>
      </form>
    </>
  );
}
