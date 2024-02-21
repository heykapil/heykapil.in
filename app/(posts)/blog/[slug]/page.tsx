import type { Metadata } from "next";
import { Suspense, lazy, cache } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { getViewsCount } from "app/db/queries";
import { getBlogPosts } from "app/db/blog";
import { increment } from "app/db/actions";
import { unstable_noStore as noStore } from "next/cache";
import { Session } from "app/components/helpers/session";
import { formatDate } from "app/components/helpers/format-date";
const ViewCounter = lazy(() => import("../view-counter"));

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    created: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `https://kapil.app${image}`
    : `https://og.kapil.app/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://kapil.app/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  // @ts-ignore
  let session = await Session();

  if (!post) {
    notFound();
  }
  if (post.metadata.private === `true` && session?.role !== "admin") {
    return (
      <div>
        <h2 className="text-2xl font-semibold animate-fade-right">
          Not Authorized!
        </h2>
        <p className="animate-fade-up">No permission to access this conent!</p>
        <p className="mt-10">
          Kindly{" "}
          <a
            className="font-medium underline underline-offset-2"
            href={`/signin?callback=/blog/${post.slug}`}
          >
            login
          </a>{" "}
          with admin role to access this content!
        </p>
      </div>
    );
  } else {
    return (
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.created,
              dateModified: post.metadata.updated,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `https://kapil.app${post.metadata.image}`
                : `https://kapil.app/og?title=${post.metadata.title}`,
              url: `https://kapil.app/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Kapil Chaudhary",
              },
            }),
          }}
        />
        <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px] animate-fade-right">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
          <Suspense
            fallback={
              <div className="inline-flex">
                <p className="h-5 animate-pulse bg-opacity-50 w-5" />
              </div>
            }
          >
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.created)}
            </p>
          </Suspense>
          <Suspense
            fallback={
              <div className="inline-flex">
                <p className="h-5 animate-pulse bg-opacity-50 w-5" />
              </div>
            }
          >
            <Views slug={`blog/${post.slug}`} />
          </Suspense>
        </div>
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          <CustomMDX source={post.content} />
        </article>
      </section>
    );
  }
}
let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  noStore();
  let views: any;
  views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}
