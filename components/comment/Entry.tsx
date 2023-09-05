"use client";
import { Suspense, lazy, useState } from "react";
import { formatDate } from "lib/posts/format-date";
import Image from "next/image";
import { deleteComment } from "@/lib/actions";
import { Spinner } from "../Spinner";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
const MarkdownPreview = lazy(() => import("./Preview"));
export default function CommentEntry({
  name,
  image,
  created_at,
  body,
  email,
  id,
  slug,
}: {
  name: string;
  image?: string;
  created_at: Date;
  body: string;
  email: string;
  id: number;
  slug: string;
}) {
  const [isDeleting, setisDeleting] = useState(false);
  const { data: session } = useSession();
  const onDelete = async () => {
    setisDeleting(true);
    await deleteComment(id, slug);
    toast.success(`Deleted!`, {
      duration: 1000,
      icon: "🗑️",
    });
    setisDeleting(false);
  };
  //   const onUpdate = async () => {
  //     setisLoading(true);
  //     await updateComment(id, slug, body);
  //   };
  return (
    <div className='grid grid-cols-12 w-full'>
      <Toaster />
      <div className='flex rounded-xl col-span-12'>
        <div className='flex h-8 w-8 bg-[var(--offset)] items-center justify-center overflow-hidden rounded-full flex-shrink-0'>
          {image ? (
            <Image
              src={image}
              alt={name}
              width={28}
              height={28}
              className='rounded-full self-centered'
            />
          ) : (
            <svg
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-[24px] h-[24px] self-centered'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          )}
        </div>
        <div className='ml-2 w-full'>
          <div className='flex w-full items-start justify-between'>
            <span className='font-semibold opacity-70 text-sm capitalize'>
              {name}
            </span>
            <span className='truncate opacity-70 text-sm'>
              {" "}
              {formatDate(created_at?.toISOString())}
            </span>
          </div>
          <div className='mt-1 prose prose-quoteless prose-neutral dark:prose-invert'>
            <Suspense
              fallback={<span className='text-sm italic'>Loading...</span>}
            >
              <MarkdownPreview markdown={body} />
            </Suspense>
          </div>
          {
           ( session?.user?.email === email &&
            session.user.name === name ) ?  (
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={onDelete}
                className='text-[var(--foreground)] text-sm cursor-pointer p-1 px-2 bg-white dark:bg-teal-500 rounded-lg'
              >
                {isDeleting ? (
                  <Spinner />
                ) : (
                  <span className='inline-flex justify-between gap-1'>
                    Delete{" "}
                    <svg
                      width='20px'
                      height='20px'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M10 15L10 12'
                        stroke='currentColor'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                      />
                      <path
                        d='M14 15L14 12'
                        stroke='currentColor'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                      />
                      <path
                        d='M3 7H21C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7Z'
                        fill='currentColor'
                        fillOpacity='0.24'
                        stroke='currentColor'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                      />
                      <path
                        d='M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059'
                        stroke='curetColor'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </span>
                )}
              </button>
              {/* <button
                type='button'
                onClick={onUpdate}
                className='text-blue-500 text-sm cursor-pointer'
              >
                {isLoading ? <Spinner /> : "Update"}
              </button> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
