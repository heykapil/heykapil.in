"use client";
import React from "react";
export default function Steps({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className='relative m-0 w-full list-none font-semibold overflow-hidden p-0 transition-[height] duration-200 ease-in-out'
      data-te-stepper-init
      data-te-stepper-type='vertical'
    >
      {children}
    </ul>
  );
}
