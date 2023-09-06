import NowPlaying from "../spotify/nowPlaying";
import dynamic from "next/dynamic";
const HeaderClient = dynamic(() => import("./HeaderClient"));

export default async function Header() {
  return (
    <header className='mt-0 mb-10 z-1 mx-auto rounded-lg w-full flex-row justify-between flex'>
      <HeaderClient />
      <div className='flex justify-end p-2 w-fit'>
        <NowPlaying />
      </div>
    </header>
  );
}
