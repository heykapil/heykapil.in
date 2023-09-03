export default function HeaderSkelton() {
  return (
    <header className='mt-0 mb-10 z-1 mx-auto rounded-lg w-full flex-row justify-between  hidden lg:flex animate-pulse'>
      <div className='flex'>
        {" "}
        <span className='rounded-full w-[48px] h-[48px] inline-flex items-center justify-center outline-none bg-gray-200 dark:bg-gray-700'></span>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <span className='w-48 h-6 block mt-1 bg-gray-200 rounded-md dark:bg-gray-700'></span>
      </div>
      <div className='flex'>
        <span className='w-[48px] h-[48px] inline-flex items-center justify-center bg-gray-200 rounded-full dark:bg-gray-700'></span>
      </div>
    </header>
  );
}
