"use client";
import format from "date-fns/format";
import dynamic from "next/dynamic";
const HeaderInfo = dynamic(() => import("./HeaderInfo"));
import { Fragment, Suspense, useEffect, useState } from "react";
// import { useOnlineStatus } from "lib/hooks/useOnlineStatus";

function getDisplayTime() {
  return format(new Date(), "MMM dd, hh:mm:ss b");
}
export default function HeaderClient() {
  const [clockText, setClockText] = useState("");
  // let onlineStatus = useOnlineStatus();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockText(getDisplayTime());
    }, 1000);
    // If useEffect hook return a function - it will be called
    // when something in depsArray changed or when unmounting
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Fragment>
      <div className='hidden lg:flex'>
        <Suspense>
          <HeaderInfo />
        </Suspense>
      </div>
      <div className='flex lg:hidden'></div>

      <div className='hidden lg:flex flex-row justify-center items-center'>
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
      {/* <div className='flex p-2'>
        {onlineStatus ? (
          <div className='bg-green-500 w-4 h-4 rounded-full' />
        ) : (
          <div className='bg-red-500 w-4 h-4 rounded-full' />
        )}
      </div> */}
    </Fragment>
  );
}
