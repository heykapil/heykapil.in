"use Client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>
          {/* User Image  */}
          {session.user?.image ? (
            <div className='w-[48px] h-[48px] inline-flex items-center justify-center'>
              <Image
                src={session.user?.image}
                alt={session.user?.name || ""}
                width={30}
                height={30}
                className='rounded-full outline-none'
              />
            </div>
          ) : (
            <svg
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
          )}
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        id='loginButton'
        aria-label='login'
        className='p-2 text-sm'
        onClick={() => signIn("github")}
      >
        {" "}
        Login{" "}
      </button>
    </div>
  );
}
