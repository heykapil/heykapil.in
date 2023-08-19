import format from "date-fns/format";
import LoginButton from "../user/LoginButton";
import DropdownMenuDemo from "./HeaderInfo";
export default function Header() {
    return (
       <header className="mt-0 mx-auto rounded-lg w-full flex-row mb-1 justify-between  hidden lg:flex">
        <div className="flex"><DropdownMenuDemo /></div>
        <div className="flex justify-center items-center">{format(new Date(), 'eeee, dd MMM, h:mm b')}</div>
         <div className="flex"><LoginButton /></div>
        </header>
    )
}
