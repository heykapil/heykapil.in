// Credit of styles of music bars to  https://harshsingh.xyz/ and main idea of https://leerob.io/
import styles from "styles/Music.module.css";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
async function getNowPlaying() {
  revalidatePath("/api/now-playing");
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/now-playing", {
    next: { revalidate: 180 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  revalidatePath("/api/now-playing");

  return res.json();
}

export default async function NowPlaying() {
  const data = await getNowPlaying();
  console.log(data);
  return (
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
          <span className='inline-block w-30 items-center'>
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
  );
}
