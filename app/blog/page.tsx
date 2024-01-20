import Link from "next/link";
import { Suspense } from "react";
import { getViewsCount } from "app/db/queries";
import { getBlogPosts } from "app/db/blog";
import ViewCounter from "./view-counter";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      <section className="group/section">
        <div className="group-hover/section:text-[#a1a1aa] dark:group-hover/section:text-[#656565]">
          {allBlogs
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
                className="flex flex-col space-y-1 mb-4 group/item hover:text-black dark:hover:text-white transition duration-[250ms] ease-out hover:duration-[50ms]"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-row justify-between">
                  <p className="overflow-hidden whitespace-nowrap overflow-ellipsis tracking-tight">
                    {post.metadata.title}{" "}
                    {(post.metadata.archived || post.metadata.private) && (
                      <span>🔐</span>
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
                    <Views slug={`blog/${post.slug}`} />
                  </Suspense>
                </div>
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
