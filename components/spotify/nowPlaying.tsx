"use client";
// Credit of styles of music bars to  https://harshsingh.xyz/ and main idea of https://leerob.io/
import fetcher from "lib/fetcher";
import useSWR from "swr";
import { NowPlayingSong } from "types";
import clsx from "clsx";
import styles from "styles/Music.module.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const PlayPauseButton = dynamic(() => import("./PlayPauseButton"));
export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);
  // console.log(data);
  return (
    <>
      <Suspense>
        <PlayPauseButton audioUrl={data?.preview_url} />
      </Suspense>
      <div className={styles.music}>
        <div
          className={clsx(
            styles.line,
            styles.line1,
            data?.isPlaying === false && styles.offline
          )}
        />
        <div
          className={clsx(
            styles.line,
            styles.line2,
            data?.isPlaying === false && styles.offline
          )}
        />
        <div
          className={clsx(
            styles.line,
            styles.line3,
            data?.isPlaying === false && styles.offline
          )}
        />
        <p>
          {data?.songUrl ? (
            <span className='bg-green-500 w-2 h-2 rounded-full inline-block mr-2'></span>
          ) : (
            <span className='bg-[var(--primary)] opacity-50 w-2 h-2 rounded-full inline-block mr-3'></span>
          )}
          <a href={data?.songUrl} target='_blank' rel='noreferrer'>
            <span className='inline-block items-center'>
              <span>
                {data?.title ? (
                  data?.title
                ) : (
                  <span className='text-[var(--primary)] opacity-50 font-semibold'>
                    Offline
                  </span>
                )}{" "}
              </span>
              {/* <img className='w-4 h-4' src={data?.albumImageUrl} /> */}
              {/* <span className='truncate'>{data?.artist}</span> */}
            </span>
          </a>
        </p>
      </div>
    </>
  );
}
