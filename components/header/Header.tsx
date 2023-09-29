import dynamic from "next/dynamic";
import { Suspense } from "react";
import NowPlaying from "../spotify/nowPlaying";
const HeaderClient = dynamic(() => import("./HeaderClient"));
// const NowPlaying = dynamic(() => import("../spotify/nowPlaying"), {
//   loading: () => <span className='italic'>Loading...</span>,
// });
export default async function Header() {
  return (
    <>
      <header className='sticky top-0 z-10 py-1 backdrop-filter backdrop-blur dark:bg-primary dark:text-white'>
        <div className='relative mt-0 border-b border-[var(--border)] z-1 mx-auto rounded-lg w-full flex-row justify-between z-999999999 flex'>
          <Suspense>
            <HeaderClient />
          </Suspense>
          <div className='flex justify-end p-2 w-fit'>
            <Suspense>{/* <NowPlaying /> */}</Suspense>
            <NowPlaying />
          </div>
        </div>
      </header>
    </>
  );
}
