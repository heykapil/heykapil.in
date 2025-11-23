import ViewCounter from 'app/(posts)/blog/view-counter';
import { formatDate } from 'app/components/helpers/format-date';
import { increment } from 'app/db/actions';
import { getPost, getSnippetPosts } from 'app/db/blog';
import { getViewsCount } from 'app/db/queries';
import { unstable_noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  let posts = getSnippetPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = await getPost('snippets', params.slug);
  if (!post) return;
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function SnippetPost(props: Props) {
  const params = await props.params;

  try {
    // @ts-ignore
    const { content, metadata } = await getPost('snippets', params.slug);

    return (
      <article className="mt-0">
        <header>
          <h1 className="animate-fade-right mb-8 text-2xl font-medium tracking-tighter">
            {metadata.title}
          </h1>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-neutral-500">
              {formatDate(metadata.created)}
            </p>
            <Views slug={`snippet,${metadata.slug}`} />
          </div>
        </header>
        <div className="prose prose-neutral dark:prose-invert mt-8 w-full max-w-none">
          {content}
        </div>
      </article>
    );
  } catch (e) {
    notFound();
  }
}

let incrementViews = cache(increment);
async function Views({ slug }: { slug: string }) {
  unstable_noStore();
  let views = await getViewsCount(slug);
  incrementViews(slug);
  return (
    <>
      <ViewCounter slug={slug} trackView={true} />
      <p className="text-sm text-neutral-500 animate-flip-up">{views} views</p>
    </>
  );
}
