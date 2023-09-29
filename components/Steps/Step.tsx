export default function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li
      data-te-stepper-step-ref
      className="relative h-fit font-bold after:absolute after:left-[1.3rem] after:top-[1.85rem] after:mt-px after:h-[calc(100%-0.45rem)] after:w-px after:bg-[var(--offset)] after:content-[''] "
    >
      <div
        data-te-stepper-head-ref
        className="flex cursor-pointer items-center leading-[1.3rem] no-underline after:bg-[#e0e0e0] after:content-[''] focus:outline-none dark:after:bg-neutral-600"
      >
        <span
          data-te-stepper-head-icon-ref
          className='mr-3 flex h-[1.938rem] w-[1.938rem] items-center font-medium justify-center rounded-full bg-[var(--offset)] text-sm text-[var(--primary)]'
        >
          {number}
        </span>
        <span
          data-te-stepper-head-text-ref
          className=' font-semibold after:absolute after:flex after:text-[0.8rem] after:content-[data-content]'
        >
          {title}
        </span>
      </div>
      <div
        data-te-stepper-content-ref
        className='transition-[height, margin-bottom, padding-top, padding-bottom] left-0 overflow-hidden pb-0 pl-[3.75rem] pr-3 duration-300 ease-in-out font-normal'
      >
        {children}
      </div>
    </li>
  );
}
