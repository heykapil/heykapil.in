import type { Metadata } from "next";
import { Suspense, lazy, cache } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { getViewsCount } from "app/db/queries";
import { getQuotes } from "app/db/blog";
import { increment } from "app/db/actions";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
const ViewCounter = lazy(() => import("app/blog/view-counter"));

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getQuotes().find((post) => post.slug === params.slug);
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
      url: `https://kapil.app/quotes/${post.slug}`,
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
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
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
  let post = getQuotes().find((post) => post.slug === params.slug);
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
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.created)}
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
