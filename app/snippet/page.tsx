import Link from "next/link";
import { Suspense, lazy } from "react";
import { getViewsCount } from "app/db/queries";
import { getSnippetPosts } from "app/db/blog";

const ViewCounter = lazy(() => import("app/blog/view-counter"));
export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function SnippetPage() {
  let allSnippets = getSnippetPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
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
            className="flex flex-col space-y-1 mb-4"
            href={`/snippet/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <Suspense fallback={<p className="h-6" />}>
                <Views slug={`snippet/${post.slug}`} />
              </Suspense>
            </div>
          </Link>
        ))}
    </section>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();

  return (
    // @ts-ignore
    <ViewCounter allViews={views} slug={slug} />
  );
}
