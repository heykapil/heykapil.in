import format from "date-fns/format";
const Header = () => {
    return (
       <header className="mt-0 mx-auto bg-gray-200/10 dark:bg-zinc-900 rounded-lg w-fit px-2 py-1 mb-1 max-w-fit">
        {format(new Date(), 'eeee, dd MMM, h:mm b')}
        </header>
    )
}

export default Header;
