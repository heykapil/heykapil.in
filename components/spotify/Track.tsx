"use client";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const PlayPauseButton = dynamic(() => import("./PlayPauseButton"));

export default function Track(track: any) {
  const [isLoading, setLoading] = React.useState(false);
  return (
    <>
      {/* <div className='group mt-8 flex w-full max-w-3xl transform flex-row items-baseline border-b border-gray-200 transition-all hover:scale-[1.03] dark:border-gray-800'> */}
      <div className=''>
        <div className='container px-6'>
          <div className='sm:w-6/12 lg:w-5/12 py-2 '>
            <div className='border-b rounded-lg border-[var(--muted)]'>
              <div className='relative flex flex-col justify-end overflow-hidden rounded-b-xl'>
                <div className='group relative flex cursor-pointer justify-between rounded-xl before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-[var(--offset3)] before:opacity-0 before:transition before:duration-500 hover:before:opacity-100'>
                  <div className='relative  space-y-1 p-4'>
                    <h4 className='text-lg'>
                      {track.ranking}. {track.title}
                    </h4>
                    <div className='relative h-6 text-sm'>
                      <span className='transition duration-300 pl-5 group-hover:invisible group-hover:opacity-0'>
                        {track.artist}
                      </span>
                      <a
                        href={track.songUrl}
                        className='flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0'
                      >
                        <span className='text-xs pl-5'>Spotify</span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <Image
                    src={track.imageUrl}
                    width={200}
                    height={200}
                    alt=''
                    className={cn(
                      "absolute bottom-0 right-10 w-[5rem] transition duration-300 group-hover:scale-[1.2]",
                      isLoading
                        ? "rounded-lg scale-110 blur-2xl grayscale"
                        : "rounded-lg scale-100 blur-0 grayscale-0"
                    )}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <Suspense>
                    <PlayPauseButton audioUrl={track.audioUrl} />
                  </Suspense>
                  {/* {track.audioUrl} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
