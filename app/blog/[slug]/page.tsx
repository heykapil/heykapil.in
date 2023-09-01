import { Mdx } from "@/components/mdx";
import { allPosts } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import { formatDate } from "lib/posts/format-date";
import { notFound } from "next/navigation";
import ViewCounter from "@/components/ViewCounter";
import { getLikesCount, getViewsCount } from "@/lib/metrics";
import LikeButton from "@/components/LikeButton";
import CommentPage from "@/components/comment/Page";
import style from "styles/LikeContainer.module.css";
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }
 
  // console.log(randomHex);
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
        <ViewCounter
          allViews={allViews}
          slug={`blog/${post.slug}`}
          trackView={true}
        />{" "}
        views
      </div>
      <Mdx code={post.body.code} />
      <div className={style.container}>
        <LikeButton allLikes={allLikes} slug={`blog/${post.slug}`} />
      </div>
      <div className='mt-10'>
        <CommentPage slug={`blog/${post.slug}`} />
      </div>
    </section>
  );
}
