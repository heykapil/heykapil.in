'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = {
  '/': { name: 'home' },
  '/blog': { name: 'blog' },
  '/snippet': { name: 'snippet' },
};

export function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean); // removes empty strings

  const isSnippetPost = segments[0] === 'snippet' && segments.length === 2;
  const isBlogPost = segments[0] === 'blog' && segments.length === 2;

  const showBack = isSnippetPost || isBlogPost;

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          id="nav"
          className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {showBack ? (
              <Link
                href={isSnippetPost ? '/snippet' : '/blog'}
                className="relative font-medium flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                cd ..
              </Link>
            ) : (
              Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  className="relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  {name}
                </Link>
              ))
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
