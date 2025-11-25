import ViewCounter from 'app/(posts)/blog/view-counter';
import { formatDate } from 'app/components/helpers/format-date';
import { getPost, getSnippetPosts } from 'app/db/blog';
import { notFound } from 'next/navigation';

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
      <article className="mt-0 relative">
        <div className="sticky top-0 z-50 -mx-6 px-6 backdrop-blur-md bg-white/80 dark:bg-[#111010]/80 border-b border-neutral-100 dark:border-neutral-900 mb-8 pt-4 pb-4 transition-all">
          <h1 className="animate-fade-right text-2xl  font-medium tracking-tighter">
            {metadata.title}
          </h1>
        </div>
        <header>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(metadata.created)}
            </p>
            <ViewCounter slug={`snippet,${metadata.slug}`} trackView={true} />
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
