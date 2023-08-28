"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DockContextType } from "types";
import { HomeIcon, BlogIcon, GalleryIcon, FileIcon } from "../Icons";
import { MouseProvider } from "../context/MouseProvider";
import DockItem from "./DockItem";
import ThemeSwitch from "../theme/switch";
import { usePathname } from "next/navigation";
import clsx from "clsx";
const DockContext = createContext<DockContextType | null>(null);
export const useDock = () => {
  return useContext(DockContext);
};

const Dock = () => {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState<number | undefined>();
  const pathname = usePathname();
  const activepath = pathname.split("/")[1];
  useEffect(() => {
    setWidth(ref?.current?.clientWidth);
  }, []);

  return (
    <MouseProvider>
      <footer className='fixed inset-x-0 bottom-1 z-40 flex w-full mx-auto rounded justify-center'>
        <DockContext.Provider value={{ hovered, width }}>
          <nav
            ref={ref}
            className='border-b border-gray-300 dark:border-gray-700 rounded-full flex justify-center p-2 bg-white dark:bg-zinc-900 backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:backdrop-blur dark:drop-shadow-lg drop-shadow-lg'
            // "visible md:invisible" --- add these classname to hide dock on mobile
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
          >
            <ul className='flex h-10 items-end justify-center space-x-2'>
              <DockItem>
                <a
                  className='relative flex h-full w-full items-center justify-center'
                  aria-label='home'
                  href='/'
                  rel='internal'
                >
                  <HomeIcon
                    className='relative h-3/5 w-3/5'
                    aria-hidden='true'
                  />
                  <span
                    className={clsx(
                      "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                      {
                        ["bg-none"]: "/" !== pathname,
                      },
                      {
                        ["bg-green-500"]: "/" === pathname,
                      }
                    )}
                  ></span>
                </a>
              </DockItem>
              <DockItem>
                <a
                  className='relative flex h-full w-full items-center justify-center'
                  aria-label='blog'
                  href='/blog'
                  rel='internal'
                >
                  <BlogIcon
                    className='relative h-3/5 w-3/5'
                    aria-hidden='true'
                  />
                  <span
                    className={clsx(
                      "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                      {
                        ["bg-none"]: "blog" !== activepath,
                      },
                      {
                        ["bg-green-500"]: "blog" === activepath,
                      }
                    )}
                  ></span>
                </a>
              </DockItem>
              <DockItem>
                <a
                  className='relative flex h-full w-full items-center justify-center'
                  aria-label='snippet'
                  href='/snippet'
                  rel='internal'
                >
                  <FileIcon
                    className='relative h-4/5 w-4/5'
                    aria-hidden='true'
                  />
                  <span
                    className={clsx(
                      "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                      {
                        ["bg-none"]: "snippet" !== activepath,
                      },
                      {
                        ["bg-green-500"]: "snippet" === activepath,
                      }
                    )}
                  ></span>
                </a>
              </DockItem>
              <DockItem>
                <a
                  className='relative flex h-full w-full items-center justify-center'
                  aria-label='gallery'
                  href='https://gallery.heykapil.in'
                  rel='external'
                  target='_blank'
                >
                  <GalleryIcon
                    className='relative h-4/5 w-4/5'
                    aria-hidden='true'
                  />
                </a>
              </DockItem>
              <li className='self-center' aria-hidden='true'>
                <hr className='!mx-2 h-12 w-px border-none bg-[hsl(0,0%,50%)] hidden lg:block' />
              </li>
              {/* <DockItem>
                <a
                  className="relative flex h-full w-full items-center justify-center"
                  aria-label="Email me"
                  href="mailto:contact@heykapil.in"
                  rel="external nofollow noopener noreferrer"
                  target="_blank"
                >
                  <MailIcon className="relative h-3/5 w-3/5" aria-hidden="true" />
                </a>
              </DockItem>
              <DockItem>
                <a
                  className="relative flex h-full w-full items-center justify-center"
                  aria-label="View on GitHub"
                  href="https://github.com/heykapil"
                  rel="external nofollow noopener noreferrer"
                  target="_blank"
                >
                  <GitHubIcon className="relative h-3/5 w-3/5" aria-hidden="true" />
                </a>
              </DockItem>
              <DockItem>
                <a
                  className="relative flex h-full w-full items-center justify-center"
                  aria-label="Star this project on GitHub"
                  href="https://twitter.com/kapiljch"
                  rel="external nofollow noopener noreferrer"
                  target="_blank"
                >
                  <TwitterIcon className="relative h-3/5 w-3/5" aria-hidden="true" />
                </a>
              </DockItem>  */}
              <DockItem>
                <ThemeSwitch />
              </DockItem>
              {/* <div className='hidden lg:block'>
              <DockItem>
                <KeyNav />
              </DockItem> 
              </div> */}
            </ul>
          </nav>
        </DockContext.Provider>
        {/* <div className='justify-between fixed bottom-1 right-1 hidden lg:flex'><KeyNav /></div> */}
      </footer>
    </MouseProvider>
  );
};

export default Dock;
