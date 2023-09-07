import dynamic from "next/dynamic";
import { Suspense } from "react";
import NowPlayingServer from "../spotify/nowPlayingServer";
const HeaderClient = dynamic(() => import("./HeaderClient"));
// const NowPlaying = dynamic(() => import("../spotify/nowPlaying"), {
//   loading: () => <span className='italic'>Loading...</span>,
// });
export default async function Header() {
  return (
    <>
      <header className='sticky top-0 backdrop-blur supports-backdrop-blur:bg-[var(--offset)]'>
        <div className='mt-0 mb-10 border-b border-[var(--border)] z-1 mx-auto rounded-lg w-full flex-row justify-between z-999999999 flex'>
          <Suspense>
            <HeaderClient />
          </Suspense>
          <div className='flex justify-end p-2 w-fit'>
            <Suspense>{/* <NowPlaying /> */}</Suspense>
            <NowPlayingServer />
          </div>
        </div>
      </header>
    </>
  );
}
