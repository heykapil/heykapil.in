"use server";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import styles from "styles/Music.module.css";
async function getNowPlaying() {
  const res = await fetch("https://heykapil.in/api/now-playing", {
    next: { revalidate: 10 },
    // cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// export const revalidate = 30; // revalidate at 30s
// export const dynamic = "force-dynamic";
// export const runtime = "edge";

export default async function NowPlayingServer() {
  const data = await getNowPlaying();
  revalidatePath("/api/now-playing");
  return (
    <>
      {/* <PlayPauseButton audioUrl={data.audioUrl} /> */}
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
