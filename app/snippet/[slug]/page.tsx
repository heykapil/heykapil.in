import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { getViewsCount } from "app/db/queries";
import { getSnippetPosts } from "app/db/blog";
import { increment } from "app/db/actions";
import ViewCounter from "app/blog/view-counter";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getSnippetPosts().find((post) => post.slug === params.slug);
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
      url: `https://kapil.app/snippet/${post.slug}`,
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
  let timeDiff = currentDate.getTime() - targetDate.getTime();
  let daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (daysDiff) {
    if (daysDiff >= 365) {
      years++;
      daysDiff -= 365;
    } else if (daysDiff >= 30) {
      months++;
      daysDiff -= 30;
    } else if (daysDiff >= 7) {
      weeks++;
      daysDiff -= 7;
    } else {
      days++;
      daysDiff--;
    }
  }
  let formattedDate = "";
  if (years > 0) {
    formattedDate = `${years}y ago`;
  } else if (months > 0) {
    formattedDate = `${months}mo ago`;
  } else if (weeks > 0) {
    formattedDate = `${weeks}w ago`;
  } else if (days > 0) {
    formattedDate = `${days}d ago`;
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

export default async function Snippet({ params }) {
  let session = await getServerSession(authConfig);
  let post = getSnippetPosts().find((post) => post.slug === params.slug);

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
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.created)}
            </p>
          </Suspense>
          <Suspense
            fallback={
              <div className="inline-flex">
                <p className="h-5 animate-pulse  bg-opacity-50 w-5" />
                <span>views</span>
              </div>
            }
          >
            <Views slug={`snippet/${post.slug}`} />
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
