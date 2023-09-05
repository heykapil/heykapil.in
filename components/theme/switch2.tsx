"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../Icons";
const ThemeSwitch2 = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const theme = localStorage.getItem("theme") || "light";
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <div
        className='flex h-full w-full items-center justify-center'
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        {mounted && (
          <>
            {theme === "dark" ? (
              <SunIcon className='relative h-4/5 w-4/5' />
            ) : (
              <MoonIcon className='relative h-4/5 w-4/5' />
            )}
          </>
        )}
      </div>
    </>
  );
};
export default ThemeSwitch2;
