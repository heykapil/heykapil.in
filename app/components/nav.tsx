'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navItems = {
  '/': { name: 'home' },
  '/blog': { name: 'blog' },
  '/snippet': { name: 'snippet' },
};

export function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const isSnippetPost = segments[0] === 'snippet' && segments.length === 2;
  const isBlogPost = segments[0] === 'blog' && segments.length === 2;
  const showBack = isSnippetPost || isBlogPost;

  const [isVisible, setIsVisible] = useState(true);
  const [autoHideEnabled, setAutoHideEnabled] = useState(true);
  const [plumVisible, setPlumVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedAutoHide = localStorage.getItem('autoHideNavbar');
    if (storedAutoHide !== null) {
      setAutoHideEnabled(JSON.parse(storedAutoHide));
    }

    const storedPlum = localStorage.getItem('plumVisible');
    if (storedPlum !== null) {
      setPlumVisible(storedPlum !== 'false');
    }
  }, []);

  useEffect(() => {
    if (!autoHideEnabled) {
      setIsVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    startTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoHideEnabled, pathname]); // Reset on path change too

  const handleMouseEnter = () => {
    setIsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    if (!autoHideEnabled) return;
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const toggleAutoHide = () => {
    const newValue = !autoHideEnabled;
    setAutoHideEnabled(newValue);
    localStorage.setItem('autoHideNavbar', JSON.stringify(newValue));
    if (!newValue) {
      setIsVisible(true);
    }
  };

  const togglePlum = () => {
    const newValue = !plumVisible;
    setPlumVisible(newValue);
    localStorage.setItem('plumVisible', JSON.stringify(newValue));
    window.dispatchEvent(new Event('plum:toggle'));
  };

  return (
    <aside className="md:h-screen md:sticky md:top-0 -ml-[6px] md:-ml-0 tracking-tight md:w-[150px] shrink-0">
      <div className="h-full md:pt-8">
        <nav
          id="nav"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fade relative flex scroll-pr-6 flex-row md:flex-col items-start px-0 pb-0 md:relative md:overflow-auto transition-all duration-700 ease-in-out md:h-full ${isVisible
            ? 'opacity-100 translate-x-0 blur-0'
            : 'opacity-100 md:opacity-20 md:-translate-x-4 md:blur-sm'
            }`}
        >
          <div className="flex mt-8 border-neutral-200 dark:border-neutral-800 flex-row md:flex-col space-x-0 pr-10 mb-2 md:mt-0 md:space-y-2 md:flex-1">
            {showBack ? (
              <Link
                href={isSnippetPost ? '/snippet' : '/blog'}
                className="relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                <span className="flex-row flex items-center gap-2">
                  <svg
                    viewBox="0 0 57 57"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-2.5 h-2.5 fill:black dark:fill-white"
                  >
                    <path d="M0.0356445 42.8086C0.0356445 43.72 0.336737 44.4769 0.938924 45.0791C1.54119 45.6813 2.26549 45.9824 3.11182 45.9824C3.92562 45.9824 4.62549 45.6731 5.21142 45.0547C5.79736 44.4362 6.09032 43.7363 6.09032 42.9551V26.5977L5.55322 9.80078L11.7055 16.7344L51.0122 55.9922C51.6307 56.6107 52.3306 56.9199 53.1118 56.9199C53.9256 56.9199 54.6499 56.6025 55.2846 55.9677C55.9194 55.333 56.2368 54.5924 56.2368 53.7461C56.2368 52.9648 55.9276 52.2812 55.3091 51.6953L16.0512 12.3887L9.16652 6.23628L27.2817 6.72458H42.272C43.0858 6.72458 43.7938 6.43974 44.396 5.87008C44.9982 5.30041 45.2993 4.60868 45.2993 3.79488C45.2993 2.98108 45.0064 2.27308 44.4204 1.67088C43.8345 1.06868 43.0858 0.767578 42.1743 0.767578H3.30712C2.33059 0.767578 1.54936 1.06868 0.963425 1.67088C0.377458 2.27308 0.0844746 3.04618 0.0844746 3.99018L0.0356445 42.8086Z" />
                  </svg>
                  <span className="font-newsreader text-base italic">
                    {isSnippetPost ? 'Snippets' : 'Writings'}
                  </span>
                </span>
              </Link>
            ) : (
              Object.entries(navItems).map(([path, { name }]) => {
                const isActive =
                  pathname === path || (path !== '/' && pathname.startsWith(path));
                return (
                  <Link
                    key={path}
                    href={path}
                    className={`relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200 ${isActive
                      ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                  >
                    {name}
                  </Link>
                );
              })
            )}
          </div>
          <div className="p-2 md:mb-4">
            <button
              onClick={toggleAutoHide}
              className={`relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200 text-neutral-600 dark:text-neutral-400`}
              title={
                autoHideEnabled ? 'Disable auto-hide' : 'Enable auto-hide'
              }
            >
              {autoHideEnabled ? (
                <div className="hidden md:flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-green-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span className="text-sm hidden md:block">Auto-hide On</span>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-neutral-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="text-sm hidden md:block">Auto-hide Off</span>
                </div>
              )}
            </button>
            <button
              onClick={togglePlum}
              className={`relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200 text-neutral-600 dark:text-neutral-400`}
              title={
                plumVisible ? 'Disable background animation' : 'Enable background animation'
              }
            >
              {plumVisible ? (
                <div className="hidden md:flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-green-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span className="text-sm hidden md:block">Background On</span>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-neutral-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="text-sm hidden md:block">Background Off</span>
                </div>
              )}
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
