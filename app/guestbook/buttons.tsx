"use client";

import { signIn, signOut } from "next-auth/react";
import Halo from "components/Halo";
import toast, { Toaster } from "react-hot-toast";
function GitHubIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_9914_10)'>
        <path
          d='M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_9914_10'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />{" "}
    </svg>
  );
}

export function SignOut() {
  return (
    <>
      <Toaster />
      <button
        className='border w-fit border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-md text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-3 cursor-pointer hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
        onClick={() => {
          signOut();
          toast.success(`You have been signed out.`);
        }}
      >
        <Halo
          className='flex items-center justify-between gap-2 px-4 py-2'
          size={120}
          strength={30}
        >
          Sign out
        </Halo>
      </button>
    </>
  );
}

export function SignIn() {
  return (
    <>
      <div className='flex gap-2'>
        <Toaster />
        <button
          className='border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 cursor-pointer hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
          onClick={() => {
            signIn("github");
            toast.loading(`Authenticating with Github`, {
              duration: 2000,
            });
          }}
        >
          <Halo
            className='flex items-center justify-between gap-2 px-4 py-2'
            size={120}
            strength={30}
          >
            <GitHubIcon />
            <div className='ml-3'>
              <span className='text-sm'>Sign in</span>
            </div>
          </Halo>
        </button>

        <Toaster />
        <button
          className='border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 cursor-pointer hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
          onClick={() => {
            signIn("google");
            toast.loading(`Authenticating with Google`, {
              duration: 2000,
            });
          }}
        >
          <Halo
            className='flex items-center justify-between gap-2 px-4 py-2'
            size={120}
            strength={30}
          >
            <GoogleIcon />
            <div className='ml-3'>
              <span className='text-sm'>Sign in</span>
            </div>
          </Halo>
        </button>
      </div>
    </>
  );
}
