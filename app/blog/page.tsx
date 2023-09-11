import Link from "next/link";
import { Post, allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { categorizePostsByYear } from "lib/posts/filter-by-year";
import { Suspense } from "react";
import { getViewsCount } from "lib/metrics";
import style from "styles/ViewsAnimaion.module.css";
import dynamic from "next/dynamic";
const ViewCounter = dynamic(() => import("@/components/ViewCounter"));
export async function generateMetadata() {
  const ogImage = `https://heykapil.in/og?title=Blog Posts&path=blog`;

  return {
    openGraph: {
      title: "Blog Posts",
      description: "available at https://heykapil.in/blog",
      url: `https://heykapil.in/blog`,
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
      title: "Blog Posts",
      description: "available at https://heykapil.in/blog",
      // images: [ogImage],
    },
  };
}

function getSortedPosts(posts: Post[]) {
  return posts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );
}

export default async function BlogPage() {
  const postbyyear = categorizePostsByYear(allPosts);
  const allViews = await getViewsCount();
  return (
    <section className=''>
      <h1 className='font-bold text-2xl mb-8 tracking-tighter'>Blog posts</h1>
      {postbyyear.map((postsOfYear) => (
        <div key={postsOfYear.year} className='flex flex-col gap-6 w-full mt-4'>
          <div className='w-full flex gap-2'>
            <aside className='font-bold group text-xl'>
              {postsOfYear.year}
            </aside>
            <span className='flex-grow flex-shrind border-b dark:border-slate-600 h-6' />
          </div>
          <div className='space-y-2 animated-list'>
            {getSortedPosts(postsOfYear.posts).map((post, key) => (
              <>
                <Link
                  className='flex flex-row justify-between py-2 px-2 rounded-md hover:bg-opacity-10 dark:hover:bg-opacity-30 hover:bg-gradient-to-r hover:from-rose-100/50 hover:via-pink-200/50 hover:to-orange-100/50 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/30 dark:hover:via-fuchsia-500/30 dark:hover:to-pink-500/30 transition-all duration-200'
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                >
                  <div className='flex-grow text-secondary' key={key}>
                    <aside className='text-base font-normal'>
                      ✤ {post.title}
                    </aside>
                  </div>
                  <span className='text-tertiary flex-shrink-0'></span>
                  <div className={style.animation}>
                    <div className=''>
                      <span className='flex justify-end flex-row'>
                        {format(parseISO(post.publishedAt), "MMM dd")}
                      </span>
                    </div>
                    <div className=''>
                      <span className='flex justify-end flex-row'>
                        <Suspense fallback={<span>...</span>}>
                          <ViewCounter
                            allViews={allViews}
                            slug={`blog/${post.slug}`}
                            trackView={false}
                          />{" "}
                          views
                        </Suspense>
                      </span>
                    </div>
                    <div className=''>
                      <span className='flex justify-end flex-row'>
                        {format(parseISO(post.publishedAt), "MMM dd")}
                      </span>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
