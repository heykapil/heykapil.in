"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import style from "styles/ViewsAnimaion.module.css";
import type { Snippet } from "@/.contentlayer/generated";
const ViewCounter = dynamic(() => import("components/ViewCounter"));
export default function SnippetList({
  snippet,
  allViews,
}: {
  snippet: Snippet;
  allViews: any;
}) {
  return (
    <Link
      key={snippet.slug}
      className='flex group relative flex-row justify-between py-2 px-2 rounded-md hover:bg-gradient-to-r hover:from-rose-100/50 hover:via-pink-200/50 hover:to-orange-100/50 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/30 dark:hover:via-fuchsia-500/30 dark:hover:to-pink-500/30 transition-all duration-200'
      href={`/snippet/${snippet.slug}`}
    >
      <div className='w-full flex gap-2'>
        <aside className='text-base font-normal'>✤ {snippet.title}</aside>
        <span className='flex-shrind border-b border-dotted border-[var(--primary)] opacity-25 invisible lg:visible flex-grow group-hover:hidden h-3 mx-0' />
      </div>
      <div className={cn(style.animation, "w-1/6 max-w-1/5 flex-col flex")}>
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

        <div className='flex justify-end flex-row'>
          <span className='inline-flex items-center'>
            <ViewCounter
              allViews={allViews}
              slug={`snippet/${snippet.slug}`}
              trackView={false}
            />{" "}
            <EyeOpenIcon className='self-center rounded-full mx-1' />
          </span>
        </div>

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

        {/* 
                      Reserved for like counter 
                      
                      <div className=''>
                        <span>
                          {format(parseISO(post.publishedAt), "MMM dd")}
                        </span>
                      </div> */}
      </div>
    </Link>
  );
}
