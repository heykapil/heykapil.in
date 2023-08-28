import { Mdx } from "@/components/mdx";
import { allPosts } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import { formatDate } from "lib/posts/format-date";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }
  // const randomHex = Array.from({ length: 32 }, () =>
  //   "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
  // ).join("");
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
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
}
