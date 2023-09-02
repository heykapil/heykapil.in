import { Mdx } from "@/components/mdx";
import { allSnippets } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ViewCounter from "@/components/ViewCounter";
import { getViewsCount, getLikesCount } from "@/lib/metrics";
import LikeButton from "@/components/LikeButton";
import CommentPage from "@/components/comment/Page";
import style from "styles/LikeContainer.module.css";
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const snippet = allSnippets.find((snippet) => snippet.slug === params.slug);
  if (!snippet) {
    return;
  }

  // const randomHex = Array.from({ length: 32 }, () =>
  //   "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
  // ).join("");

  const { title, slug } = snippet;
  const ogImage = `https://heykapil.in/og?title=${title}&path=snippet/${slug}`;
  // || `https://heykapil.in/og-common.png` ;

  return {
    title,
    openGraph: {
      title,
      type: "article",
      url: `https://heykapil.in/snippet/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImage],
    },
  };
}
// function formatDate(date: string) {
//   const currentDate = new Date();
//   const targetDate = new Date(date);

//   const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
//   const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
//   const daysAgo = currentDate.getDate() - targetDate.getDate();

//   let formattedDate = '';

//   if (yearsAgo > 0) {
//     formattedDate = `${yearsAgo}y ago`;
//   } else if (monthsAgo > 0) {
//     formattedDate = `${monthsAgo}mo ago`;
//   } else if (daysAgo > 0) {
//     formattedDate = `${daysAgo}d ago`;
//   } else {
//     formattedDate = 'Today';
//   }

//   const fullDate = targetDate.toLocaleString('en-us', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//   });

//   return `${fullDate} (${formattedDate})`;
// }

export default async function Snippet({ params }: { params: any }) {
  const snippet = allSnippets.find((snippet) => snippet.slug === params.slug);
  const allViews = await getViewsCount();
  const allLikes = await getLikesCount();
  if (!snippet) {
    notFound();
  }

  // const [allViews, tweets] = await Promise.all([
  //   getViewsCount(),
  //   getTweets(post.tweetIds),
  // ]);

  return (
    <section className='pattern'>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(snippet.structuredData),
        }}
      ></script>
      <h1 className='font-bold text-2xl tracking-tighter max-w-[650px]'>
        <Balancer>{snippet.title}</Balancer>
      </h1>
      <div className='flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          <ViewCounter
            allViews={allViews}
            slug={`snippet/${snippet.slug}`}
            trackView={true}
          />{" "}
          views
        </p>
        <div className='mt-2 sm:mt-0'>
          <Image
            alt={snippet.title}
            height={48}
            width={48}
            src={`/logos/${snippet.logo}`}
            className='rounded-full'
          />
        </div>
      </div>
      <Mdx
        code={snippet.body.code}
        // tweets={tweets}
      />
      <div className={style.container}>
        <LikeButton allLikes={allLikes} slug={`snippet/${snippet.slug}`} />
      </div>
      <div className='mt-6 w-full flex flex-col border-b border-[var(--border)] rounded-lg py-2'>
        <div className='flex align-center justify-center items-center'>
          <span className='flex flex-grow border-t border-[var(--border)] h-1'></span>{" "}
          <h3 className='text-xl font-semibold mb-6'>Thoughts? 🤔</h3>
          <span className='flex flex-grow border-t border-[var(--border)] h-1'></span>
        </div>
        <CommentPage slug={`snippet/${snippet.slug}`} />
      </div>
    </section>
  );
}
