import { Mdx } from "@/components/mdx";
import { allSnippets } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getViewsCount, getLikesCount } from "@/lib/metrics";
import style from "styles/LikeContainer.module.css";
import dynamic from "next/dynamic";
const ScrolltoTop = dynamic(() => import("@/components/blog/ScrolltoTop"));
const TableOfContents = dynamic(() => import("@/components/TableofContent"), {
  ssr: false,
});
const LikeButton = dynamic(() => import("@/components/LikeButton/LikeButton"), {
  ssr: false,
  loading: () => <span>...</span>,
});
const ViewCounter = dynamic(() => import("components/ViewCounter"), {
  ssr: false,
  loading: () => <span>...</span>,
});
const CommentPage = dynamic(() => import("components/comment/Page"), {
  ssr: false,
  loading: () => <p>Loading comments...</p>,
});
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

  const { title, slug, description } = snippet;
  const ogImage = `https://heykapil.in/og?title=${title}&path=snippet/${slug}`;
  // || `https://heykapil.in/og-common.png` ;

  return {
    title,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://heykapil.in/snippet/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // images: [ogImage],
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
  return (
    <>
      <div className='sticky top-[70px] hidden h-[calc(100vh-70px)] w-[284px] md:flex md:shrink-0 md:flex-col border-r border-[var(--offset)]'>
        <div className='text-[var(--primary)] font-semibold text-lg underline font-newsreader'>
          All snippets
        </div>
        <ul className='mt-2 text-sm'>
          {allSnippets
            // .sort((a: Snippet, b: Snippet) => {
            //   if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            //     return -1;
            //   }
            //   return 1;
            // })
            .map((s) => (
              <li
                key={s.slug}
                className={clsx(
                  "rounder-lg hover:bg-[var(--offset)] py-2 px-1 border-l pl-2",
                  s.slug === snippet.slug
                    ? "border-blue-500 bg-[var(--offset)]"
                    : "border-[var(--muted)]"
                )}
              >
                <Link
                  className={clsx(
                    "rounded-md animated-list",
                    s.slug === snippet.slug ? "font-semibold text-blue-500" : ""
                  )}
                  href={`/snippet/${s.slug}`}
                >
                  {s.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Suspense>
        <nav className='order-last hidden w-56 shrink-0 lg:block'>
          <div className='sticky top-[126px] h-[calc(100vh-121px)]'>
            {snippet?.toc !== false ? (
              <>
                <div className='mb-1 mt-[7px] text-sm font-bold'>
                  On this page
                </div>
                <div className='relative' data-docs-table-of-contents=''>
                  <div
                    aria-hidden='true'
                    className='from-gray-0 z-1 absolute top-0 left-0 h-3 w-full bg-gradient-to-b'
                  ></div>
                  <div
                    aria-hidden='true'
                    className='from-gray-0 absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t'
                  ></div>
                  <ul className='styled-scrollbar max-h-[70vh] overflow-y-auto text-sm'>
                    <TableOfContents source={snippet.body.raw} />
                  </ul>
                </div>
                <div className='mt-3 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-900 dark:border-gray-300'></div>
                <a
                  className=' mb-3 flex items-center gap-x-1.5 text-sm  transition-opacity'
                  href={`https://github.com/heykapil/data-website/blob/main/snippets/${snippet.slug}.mdx`}
                >
                  Suggest changes
                  <svg
                    className='with-icon_icon__MHUeb'
                    fill='none'
                    height='20'
                    shapeRendering='geometricPrecision'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    viewBox='0 0 24 24'
                    width='20'
                  >
                    <path d='M7 17L17 7'></path>
                    <path d='M7 7h10v10'></path>
                  </svg>
                </a>
              </>
            ) : (
              ""
            )}
            <Suspense>
              <ScrolltoTop />
            </Suspense>
          </div>
        </nav>
      </Suspense>
      <section className='w-full min-w-0 max-w-3xl md:px-6 mx-auto px-4'>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(snippet.structuredData),
          }}
        ></script>
        <h1 className='font-bold text-2xl tracking-tighter'>
          <Balancer>{snippet.title}</Balancer>
        </h1>
        <div className='flex justify-between items-center mt-2 mb-8 text-sm mx-auto'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            <Suspense>
              <ViewCounter
                allViews={allViews}
                slug={`snippet/${snippet.slug}`}
                trackView={true}
              />{" "}
              views
            </Suspense>
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
          <Suspense>
            <LikeButton allLikes={allLikes} slug={`snippet/${snippet.slug}`} />
          </Suspense>
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
    </>
  );
}
