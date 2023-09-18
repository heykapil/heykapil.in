"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import style from "styles/ViewsAnimaion.module.css";
import { sortedSnippets } from "lib/posts/sortedSnippets";
export default function SnippetList() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState(sortedSnippets);
  useEffect(() => {
    const filteredSnippetsByTitle = sortedSnippets.filter((snippet) => {
      return Object.values(snippet)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredResults(filteredSnippetsByTitle);
  }, [searchValue]);

  return (
    <>
      <div className='relative w-full mb-4'>
        <input
          aria-label='Search articles'
          id='searchInput'
          type='text'
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search snippets'
          className='block w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md  focus:border-transparent focus:outline focus:ring-pink-500 focus:border-pink-500'
        />
        <svg
          className='absolute w-5 h-5 right-3 top-3'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
      {!filteredResults.length && <p className='mb-4'>No snippets found.</p>}
      {filteredResults.map((snippet) => (
        <Link
          key={snippet.slug}
          className='flex group relative flex-row justify-between py-2 px-2 rounded-md hover:bg-gradient-to-r hover:from-rose-100/50 hover:via-pink-200/50 hover:to-orange-100/50 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/30 dark:hover:via-fuchsia-500/30 dark:hover:to-pink-500/30 transition-all duration-200'
          href={`/snippet/${snippet.slug}`}
        >
          <Suspense>
            <div className='w-full flex gap-2'>
              <aside className='text-base font-normal'>✤ {snippet.title}</aside>
              <span className='flex-shrind border-b border-dotted border-[var(--primary)] opacity-25 invisible lg:visible flex-grow group-hover:hidden h-3 mx-0' />
            </div>
            <div
              className={cn(style.animation, "w-1/6 max-w-1/5 flex-col flex")}
            >
              <div className='flex flex-row-reverse'>
                <span className='flex'>
                  <Image
                    alt={snippet.title}
                    className='self-center rounded-full ml-auto'
                    src={`/logos/${snippet.logo}`}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
              {/* <div className='flex justify-end flex-row'>
                <span className='inline-flex items-center'>
                  <ViewCounter
                    allViews={allViews}
                    slug={`snippet/${snippet.slug}`}
                    trackView={false}
                  />{" "}
                  <EyeOpenIcon className='self-center rounded-full mx-1' />
                </span>
              </div> */}

              <div className='flex flex-row-reverse'>
                <span className='flex'>
                  <Image
                    alt={snippet.title}
                    className='self-center rounded-full ml-auto'
                    src={`/logos/${snippet.logo}`}
                    width={25}
                    height={25}
                  />
                </span>
              </div>

              <div className='flex flex-row-reverse'>
                <span className='flex'>{snippet.tags}</span>
              </div>
            </div>
          </Suspense>
        </Link>
      ))}
    </>
  );
}
