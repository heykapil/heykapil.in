import { Mdx } from "@/components/mdx";
import { allPosts } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import { formatDate } from "lib/posts/format-date";
import { notFound } from "next/navigation";
import { getLikesCount, getViewsCount } from "@/lib/metrics";
import { Suspense } from "react";
import style from "styles/LikeContainer.module.css";
import LikeButton from "@/components/LikeButton/LikeButton";
import LikeButtonSkelton from "@/components/LikeButton/Skelton";
import CommentPage from "components/comment/Page";
import ViewCounter from "components/ViewCounter";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://heykapil.in/${image}`
    : `https://heykapil.in/og?title=${title}&path=blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://heykapil.in/blog/${slug}`,
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

export default async function Blog({ params }: { params: any }) {
  const post = allPosts.find((post) => post.slug === params.slug);
  const allViews = await getViewsCount();
  const allLikes = await getLikesCount();
  if (!post) {
    notFound();
  }
  return (
    <section>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <h1 className='font-bold text-2xl tracking-tighter max-w-[650px]'>
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className='flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {formatDate(post.publishedAt)}
        </p>
        <Suspense>
          <ViewCounter
            allViews={allViews}
            slug={`blog/${post.slug}`}
            trackView={true}
          />
        </Suspense>{" "}
        views
      </div>
      <Mdx code={post.body.code} />
      <div className={style.container}>
        <Suspense fallback={<LikeButtonSkelton />}>
          <LikeButton allLikes={allLikes} slug={`blog/${post.slug}`} />
        </Suspense>
      </div>
      <div className='mt-6 w-full flex flex-col border-b border-[var(--border)] rounded-lg py-2'>
        <div className='flex align-center justify-center items-center'>
          <span className='flex flex-grow border-t border-[var(--border)] h-1'></span>{" "}
          <h3 className='text-xl font-semibold mb-6'>Thoughts? 🤔</h3>
          <span className='flex flex-grow border-t border-[var(--border)] h-1'></span>
        </div>
        <Suspense>
          <CommentPage slug={`blog/${post.slug}`} />
        </Suspense>
      </div>
    </section>
  );
}
