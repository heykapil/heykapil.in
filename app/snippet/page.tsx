import Link from "next/link";
import { Suspense } from "react";
import { getViewsCount } from "app/db/queries";
import { getSnippetPosts } from "app/db/blog";
import ViewCounter from "app/blog/view-counter";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "Snippets",
  description: "Read my thoughts on software development, design, and more.",
};

export default function SnippetPage() {
  let allSnippets = getSnippetPosts();

  return (
    <div>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Snippets</h1>
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
                className="flex flex-col space-y-1 mb-4 group/item hover:text-black dark:hover:text-white  transition duration-[250ms] ease-out hover:duration-[50ms]"
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
                    <Views slug={`snippet/${post.slug}`} />
                  </Suspense>
                </div>
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
  let views = await getViewsCount();

  return (
    // @ts-ignore
    <ViewCounter allViews={views} slug={slug} />
  );
}
