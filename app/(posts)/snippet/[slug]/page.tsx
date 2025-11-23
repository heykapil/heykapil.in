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
      <article className="mt-0">
        <header>
          <h1 className="animate-fade-right mb-8 text-2xl font-medium tracking-tighter">
            {metadata.title}
          </h1>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-neutral-500">
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
