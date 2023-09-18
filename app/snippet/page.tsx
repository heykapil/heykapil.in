import { Suspense } from "react";
import SnippetList from "@/components/blog/SnippetList";
import tagData from "@/app/tag-data-snippet.json";
import Link from "next/link";
// import searchData from "../../public/search-data-snippet.json";
// import { getViewsCount } from "@/lib/metrics";

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
export default function SnippetPage() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);
  return (
    <>
      <div className='sticky top-[70px] hidden h-[calc(100vh-70px)] w-[284px] md:flex md:shrink-0 md:flex-col border-r border-[var(--offset)]'>
        <div className='text-[var(--primary)] font-semibold text-lg underline font-newsreader'>
          Tags
        </div>
        <ul className='mt-2 text-sm'>
          {sortedTags.map((t) => {
            return (
              <li key={t} className='my-3'>
                <Link
                  href={`#${t}`}
                  className='py-2 px-3 uppercase text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500'
                  aria-label={`View posts tagged ${t}`}
                >
                  {`${t} (${tagCounts[t]})`}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Suspense>
        <nav className='order-last hidden w-56 shrink-0 lg:block'>
          <div className='sticky top-[126px] h-[calc(100vh-121px)]'></div>
        </nav>
      </Suspense>
      <section className='max-w-3xl w-full mx-auto'>
        <h1 className='font-bold text-2xl mb-8 tracking-tighter'>
          All snippets
        </h1>
        <div className='flex flex-col gap-6 w-full mt-4'>
          <div className='space-y-1 animated-list'>
            <Suspense>
              <SnippetList
              //  allViews={allViews}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
