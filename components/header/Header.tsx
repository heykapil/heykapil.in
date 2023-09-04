"use client";
import format from "date-fns/format";
import dynamic from "next/dynamic";
const HeaderInfo = dynamic(() => import("./HeaderInfo"));
import { Suspense, useEffect, useState } from "react";

function getDisplayTime() {
  return format(new Date(), "MMM dd, hh:mm:ss b");
}
export default function Header() {
  const [clockText, setClockText] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockText(getDisplayTime());
    }, 1000);
    // If useEffect hook return a function - it will be called
    // when something in depsArray changed or when unmounting
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className='mt-0 mb-10 z-1 mx-auto rounded-lg w-full flex-row justify-between  hidden lg:flex'>
      <div className='flex'>
        <Suspense>
          <HeaderInfo />
        </Suspense>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <span className='text-sm' suppressHydrationWarning>
          {/* <Link
            href='https://en.wikipedia.org/wiki/Mathura'
            aria-label='mathura'
            className='hover:underline cursor-pointer'
            target='_blank'
          >
            Mathura, UP
          </Link>{" "}
          •  */}
          {clockText}
        </span>
      </div>
      <div className='flex'>.</div>
    </header>
  );
}
