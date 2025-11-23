import { formatDate } from 'app/components/helpers/format-date';
import { increment } from 'app/db/actions';
import { getBlogPosts, getPost } from 'app/db/blog';
import { getViewsCount } from 'app/db/queries';
import { unstable_noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import ViewCounter from '../view-counter';
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  let posts = getBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = await getPost('blog', params.slug);
  if (!post) return;
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function BlogPost(props: Props) {
  const params = await props.params;

  try {
    // @ts-ignore
    const { content, metadata } = await getPost('blog', params.slug);

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
            <Views slug={`musing,${metadata.slug}`} />
          </div>
        </header>
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none  prose-headings:font-semibold prose-headings:tracking-tighter prose-h1:text-3xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 prose-img:rounded-xl">
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
