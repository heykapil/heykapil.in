import Link from "next/link";
import { Suspense } from "react";
import { getViewsCount } from "app/db/queries";
import { getQuotes } from "app/db/blog";
import ViewCounter from "app/(posts)/blog/view-counter";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "Quotes",
  description: "All quotes",
};

export default function BlogPage() {
  let allQuotes = getQuotes();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog Posts</h1>
      {allQuotes
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
            className="flex flex-col space-y-1 mb-4"
            href={`/quotes/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <Suspense
                fallback={
                  <div className="inline-flex">
                    <p className="h-6 animate-pulse bg-slate-100 dark:bg-slate-900 bg-opacity-50 w-6" />
                    <span>views</span>
                  </div>
                }
              >
                <Views slug={`quotes/${post.slug}`} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  noStore();
  let views = await getViewsCount();

  return (
    // @ts-ignore
    <ViewCounter allViews={views} slug={slug} />
  );
}
