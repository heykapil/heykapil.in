import format from "date-fns/format";
import Link from "next/link";
import LoginButton from "../user/LoginButton";
import DropdownMenuDemo from "./HeaderInfo";
export default function Header() {
  return (
    <header className='mt-0 mx-auto rounded-lg w-full flex-row mb-1 justify-between  hidden lg:flex'>
      <div className='flex'>
        <DropdownMenuDemo />
      </div>
      <div className='flex flex-row justify-center items-center'>
        <span suppressHydrationWarning={true} className='text-sm'>
          <Link
            href='https://en.wikipedia.org/wiki/Mathura'
            aria-label='mathura'
            className='hover:underline cursor-pointer'
            target='_blank'
          >
            Mathura, UP
          </Link>{" "}
          • {format(new Date(), "MMM dd, h:mm:ss b")}
        </span>
      </div>
      <div className='flex'>
        <LoginButton />
      </div>
    </header>
  );
}
