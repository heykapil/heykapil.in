import type { Metadata } from "next";
import { Suspense, lazy, cache } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { getViewsCount } from "app/db/queries";
import { getBlogPosts } from "app/db/blog";
import { increment } from "app/db/actions";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
const ViewCounter = lazy(() => import("app/blog/view-counter"));

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

function formatDate(date: string) {
  noStore();
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);
  let daysDiff = Math.round(
    currentDate.getTime() - targetDate.getTime() / (1000 * 3600 * 24)
  );
  let yearsAgo = 0,
    monthsAgo = 0,
    weeksAgo = 0,
    daysAgo = 0;
  while (daysDiff) {
    if (daysDiff >= 365) {
      yearsAgo++;
      daysDiff -= 365;
    } else if (daysDiff >= 30) {
      monthsAgo++;
      daysDiff -= 30;
    } else if (daysDiff >= 7) {
      weeksAgo++;
      daysDiff -= 7;
    } else {
      daysAgo++;
      daysDiff--;
    }
  }
  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (weeksAgo > 0) {
    formattedDate = `${weeksAgo}w ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  let session = await getServerSession(authConfig);

  if (!post) {
    notFound();
  }
  if (
    post.metadata.private === `true` &&
    session?.user?.email !== "kapilchaudhary@gujaratuniversity.ac.in"
  ) {
    return (
      <div>
        <h2 className="text-2xl">Not Authorized!</h2>
        <p>The content is made private or hidden.</p>
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
        <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
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
                <span>views</span>
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
  let views = await getViewsCount();
  incrementViews(slug);
  return (
    // @ts-ignore
    <ViewCounter allViews={views} slug={slug} />
  );
}
