import { CopyButton } from "./CopyButton";
import * as React from "react";
type Props = {
  raw: string;
} & React.PropsWithChildren;

export const Pre = ({ children, raw, ...props }: Props) => {
  const lang = props["data-language"] || "shell";
  return (
    <pre {...props} className='group relative w-auto h-auto'>
      <div className='absolute invisible group-hover:visible w-auto top-0 right-0 px-2 bg-[#E6E3E1] bg-opacity-50 dark:bg-gray-900 flex items-center rounded-b-md text-black dark:text-white '>
        <CopyButton text={raw} language={lang} />
      </div>
      {children}
    </pre>
  );
};
