import { Suspense } from "react";
import SnippetList from "@/components/blog/SnippetList";
// import { getViewsCount } from "@/lib/metrics";

export async function generateMetadata() {
  const ogImage = `https://heykapil.in/og?title=All snippets&path=snippet`;

  return {
    openGraph: {
      title: "All snippets",
      description: "available at https://heykapil.in/snippet",
      url: `https://heykapil.in/snippet`,
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
      title: "All snippets",
      description: "available at https://heykapil.in/snippet",
      // images: [ogImage],
    },
  };
}
export default function SnippetPage() {
  // const allViews = await getViewsCount();
  return (
    <section className='max-w-2xl w-full mx-auto'>
      <h1 className='font-bold text-2xl mb-8 tracking-tighter'>All snippets</h1>
      <div className='flex flex-col gap-6 w-full mt-4'>
        <div className='space-y-1 animated-list'>
          <Suspense>
            <SnippetList
            //  allViews={allViews}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
