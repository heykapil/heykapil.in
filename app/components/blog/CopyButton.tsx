"use client";

import { useState } from "react";

export const CopyButton = ({ text, language } : {text: string, language: string}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <button disabled={isCopied} onClick={copy}>
      {isCopied ? "Copied!" : 
      <>
      <span className="text-black dark:text-white">Copy</span> <span className="text-rose-500">{language}</span>
      </>
      }
    </button>
  );
};
