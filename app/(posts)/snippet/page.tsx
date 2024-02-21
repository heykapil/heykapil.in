import Link from "next/link";
import { Suspense } from "react";
import { getViewsCount } from "app/db/queries";
import { getSnippetPosts } from "app/db/blog";
import ViewCounter from "app/(posts)/blog/view-counter";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { formatShortDate } from "app/components/helpers/format-date";

export const metadata = {
  title: "Snippets",
  description: "Read my thoughts on software development, design, and more.",
};

export default function SnippetPage() {
  let allSnippets = getSnippetPosts();

  return (
    <div>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter animate-fade-right">
        Snippets
      </h1>
      {/* <p className="mb-8 text-gray-500">
        Snippets are small pieces of code that I use in my projects. They are
        usually not big enough to be a blog post, but I still want to share them
        with the world.
      </p> */}
      <section className="group/section">
        <div className="group-hover/section:text-zinc-400 dark:group-hover/section:text-[#656565]">
          {allSnippets
            .sort((a, b) => {
              if (new Date(a.metadata.created) > new Date(b.metadata.created)) {
                return -1;
              }
              return 1;
            })
            .filter((post) => post.metadata.archived !== "true")
            .map((post) => (
              <Link
                key={post.slug}
                className="group flex border-b border-gray-500 border-opacity-20 flex-col space-y-1 py-4 group/item hover:text-black dark:hover:text-white  transition duration-[300ms] ease-out hover:duration-[50ms]"
                href={`/snippet/${post.slug}`}
              >
                <div className="w-full flex flex-col md:flex-row justify-between">
                  <p className="overflow-hidden whitespace-nowrap overflow-ellipsis tracking-tight">
                    {post.metadata.title}{" "}
                    {(post.metadata.private || post.metadata.archived) && (
                      <span className="ml-[-2]">🔐</span>
                    )}
                  </p>
                  <Suspense
                    fallback={
                      <div className="inline-flex">
                        <p className="h-5 animate-pulse bg-opacity-50 min-w-5" />
                        <span>views</span>
                      </div>
                    }
                  >
                    <div className="hidden md:inline-flex self-center items-center">
                      {formatShortDate(post.metadata.created)}
                      <span className="group-hover:animate-fade-left">
                        <svg
                          width="1em"
                          height="1em"
                          fill="none"
                          viewBox="0 0 256 256"
                          className="translate-x-2 hidden rotate-45 transition group-hover:block"
                        >
                          <rect width="256" height="256" fill="none" />
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
                {/* <Views slug={`snippet/${post.slug}`} /> */}
                {/* {post.metadata.created} */}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  noStore();
  let views: any;
  views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}
