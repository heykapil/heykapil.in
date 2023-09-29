import { Suspense } from "react";
import tagData from "@/lib/data/tag-data-snippet.json";
import { allSnippets } from "@/.contentlayer/generated";
import Link from "next/link";
import { getViewsCount } from "lib/metrics";
import style from "styles/ViewsAnimaion.module.css";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { EyeOpenIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import data from "../../lib/data/search-data-snippet.json";
const ViewCounter = dynamic(() => import("@/components/ViewCounter"));
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
export async function generateMetadata() {
  const ogImage = `https://heykapil.in/og?title=All snippets&path=snippet`;

  return {
    openGraph: {
      title: "All snippets",
      description: "available at https://heykapil.in/snippet",
      url: `https://heykapil.in/snippet`,
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "All snippets",
      description: "available at https://heykapil.in/snippet",
      // images: [ogImage],
    },
  };
}

function PostsByTags({ tag }: { tag: string }) {
  const filteredPostsByTags = data.filter((snippet) =>
    // @ts-ignore
    snippet.tags.includes(tag)
  );
  return (
    <>
      {filteredPostsByTags.map((snippet) => (
        <>
          <Link
            key={snippet.slug}
            className='flex group relative text-sm border-t border-[var(--muted)] capitalize flex-row-reverse justify-between py-2 px-2 rounded-md hover:bg-gradient-to-r hover:from-rose-100/50 hover:via-pink-200/50 hover:to-orange-100/50 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/30 dark:hover:via-fuchsia-500/30 dark:hover:to-pink-500/30 transition-all duration-200'
            href={`/snippet/${snippet.slug}`}
          >
            <ChevronRightIcon /> {snippet.title}
          </Link>
        </>
      ))}
    </>
  );
}
export default async function SnippetPage() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const allViews = await getViewsCount();
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <>
      <div className='sticky top-[70px] hidden h-[calc(100vh-70px)] w-[284px] md:flex md:shrink-0 md:flex-col border-r border-[var(--offset)]'>
        <div className='font-semibold text-lg mb-4 underline font-iowan'>
          All tags
        </div>
        {sortedTags.map((t) => {
          return (
            <Accordion key={t} type='single' collapsible className='w-full'>
              <AccordionItem value={t} className='border-[var(--muted)]'>
                <AccordionTrigger className='text-sm capitalize font-serif p-2'>
                  <div className='flex flex-row gap-1 font-medium'>
                    {/* <div className='flex self-center rounded-full w-2 h-2 bg-[var(--offset)]'></div>{" "} */}
                    {`# ${t} (${tagCounts[t]})`}
                  </div>
                </AccordionTrigger>
                <AccordionContent className='ml-2'>
                  <PostsByTags tag={t} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
      <Suspense>
        <nav className='order-last hidden w-56 shrink-0 lg:block'>
          <div className='sticky top-[20px] h-[calc(100vh-15px)]'></div>
        </nav>
      </Suspense>
      <section className='max-w-2xl w-full mx-auto'>
        <h1 className='font-bold text-2xl mb-8 tracking-tighter'>
          All snippets
        </h1>
        <div className='flex flex-col gap-6 w-full mt-4'>
          <div className='space-y-2 animated-list'>
            {allSnippets.map((snippet) => (
              <>
                <Link
                  key={snippet._id}
                  className='flex group relative flex-row justify-between py-2 px-2 rounded-md hover:bg-gradient-to-r hover:from-rose-100/50 hover:via-pink-200/50 hover:to-orange-100/50 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/30 dark:hover:via-fuchsia-500/30 dark:hover:to-pink-500/30 transition-all duration-200'
                  href={`/snippet/${snippet.slug}`}
                >
                  <Suspense>
                    <div className='w-full flex gap-2'>
                      <aside className='text-base font-normal'>
                        ✤ {snippet.title}
                      </aside>
                      <span className='flex-shrind border-b border-dotted border-[var(--primary)] opacity-25 invisible lg:visible flex-grow group-hover:hidden h-3 mx-0' />
                    </div>
                    <div
                      className={cn(
                        style.animation,
                        "w-1/6 max-w-1/5 flex-col flex"
                      )}
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
                      <div className='flex flex-row-reverse'>
                        <span className='flex'>{snippet.tags}</span>
                      </div>
                    </div>
                  </Suspense>
                </Link>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
