import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { allSnippets } from 'contentlayer/generated';
export const metadata: Metadata = {
  title: 'Snippets',
  description: 'Read my thoughts on software development, design, and more.',
};
// function getSortedSnippets(snippets: Snippet[]) {
//   return snippets.map(
//     (s) => s.tag)
//     .flat()
//     .filter(Boolean)
// }
export default async function SnippetPage() {
  return (
    <section>
      <Suspense fallback={<p>Loading snippets...</p>}>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">All snippets</h1>
      <div className='flex flex-col gap-6 w-full mt-4'>
      <div className='space-y-1 animated-list'>
      {allSnippets
        .sort((a: any, b: any) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((snippet) => (
          <Link
            key={snippet.slug}
            className="flex relative flex-row justify-between py-2 px-2 rounded-md hover:bg-gradient-to-r hover:from-rose-100/50 hover:via-pink-200/50 hover:to-orange-100/50 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/30 dark:hover:via-fuchsia-500/30 dark:hover:to-pink-500/30 transition-all duration-200"
            href={`/snippet/${snippet.slug}`}
          >
              <span className="flex-grow truncate text-secondary">
                    ✤ {snippet.title} 
              </span>
              <span className="text-tertiary flex-shrink-0">
              </span>
          <Image 
           alt={snippet.title} 
           className='flex items-end'
           src={`/logos/${snippet.logo}`} 
           width={25}
           height={25}
           />
          </Link>
        ))}
      </div>
      </div>
      </Suspense>
    </section>
  );
}