"use client";
import format from "date-fns/format";
import Link from "next/link";
import LoginButton from "../user/LoginButton";
import HeaderInfo from "./HeaderInfo";
import { useEffect, useState } from "react";
function getDisplayTime() {
  return format(new Date(), "MMM dd, hh:mm:ss b");
}
export default function Header() {
  const [clockText, setClockText] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockText(getDisplayTime());
    }, 1000);
    // If useEffect hook return a function - it will be called
    // when something in depsArray changed or when unmounting
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className='mt-0 mx-auto rounded-lg w-full flex-row mb-1 justify-between  hidden lg:flex'>
      <div className='flex'>
        <HeaderInfo />
      </div>
      <div className='flex flex-row justify-center items-center'>
        <span className='text-sm' suppressHydrationWarning>
          <Link
            href='https://en.wikipedia.org/wiki/Mathura'
            aria-label='mathura'
            className='hover:underline cursor-pointer'
            target='_blank'
          >
            Mathura, UP
          </Link>{" "}
          • {clockText}
        </span>
      </div>
      <div className='flex'>
        <LoginButton />
      </div>
    </header>
  );
}
