import { formatShortDate } from 'app/components/helpers/format-date';
import { getBlogPosts } from 'app/db/blog';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();
  return (
    <div>
      <h1 className="animate-fade-right mb-8 text-2xl font-medium tracking-tighter">
        Blog
      </h1>
      <section className="group/section">
        <div className="group-hover/section:text-[#a1a1aa] dark:group-hover/section:text-[#656565]">
          {Object.entries(
            allBlogs
              .filter(post => post.archived !== 'true' && post.private !== true)
              .reduce((acc, post) => {
                const year = new Date(post.created).getFullYear();
                if (!acc[year]) {
                  acc[year] = [];
                }
                acc[year].push(post);
                return acc;
              }, {} as Record<number, typeof allBlogs>)
          )
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, posts]) => (
              <div key={year} className="flex flex-col">
                <div className="flex flex-col md:flex-row">
                  <div className="hidden md:block w-24 py-4 shrink-0">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {year}
                    </span>
                  </div>
                  <div className="flex-1">
                    {posts
                      .sort((a, b) => {
                        if (new Date(a.created) > new Date(b.created)) {
                          return -1;
                        }
                        return 1;
                      })
                      .map(post => (
                        <Link
                          key={post.slug}
                          className="group/item group flex flex-col space-y-1 border-b border-neutral-100 dark:border-neutral-900 py-4 transition duration-300 ease-out hover:text-black hover:duration-[50ms] dark:hover:text-white"
                          href={`/blog/${post.slug}`}
                        >
                          <div className="flex w-full flex-col justify-between md:flex-row">
                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap tracking-tight">
                              {post.title}
                            </p>
                            <Suspense
                              fallback={
                                <div className="inline-flex">
                                  <p className="h-5 min-w-5 animate-pulse bg-opacity-50" />
                                  <span>views</span>
                                </div>
                              }
                            >
                              <div className="hidden items-center self-center md:inline-flex">
                                {formatShortDate(post.created)}
                                <span className="group-hover:animate-fade-left">
                                  <svg
                                    width="1em"
                                    height="1em"
                                    fill="none"
                                    viewBox="0 0 256 256"
                                    className="hidden translate-x-2 rotate-45 transition group-hover:block"
                                  >
                                    <rect
                                      width="256"
                                      height="256"
                                      fill="none"
                                    />
                                    <path
                                      d="M168,112V100a20,20,0,0,0-40,0V36a20,20,0,0,0-40,0V157.3l-21.9-38a20,20,0,0,0-34.7,20C64,208,83.8,232,128,232a80,80,0,0,0,80-80V112a20,20,0,0,0-40,0Z"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="10"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </Suspense>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
