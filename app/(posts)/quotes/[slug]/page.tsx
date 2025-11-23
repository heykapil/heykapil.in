import { formatDate } from 'app/components/helpers/format-date';
import { getPost, getQuotes } from 'app/db/blog';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  let posts = getQuotes();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = await getPost('quotes', params.slug);
  if (!post) return;
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function QuotesPost(props: Props) {
  const params = await props.params;

  try {
    // @ts-ignore
    const { content, metadata } = await getPost('quotes', params.slug);

    return (
      <article className="mt-0">
        <header>
          <h1 className="animate-fade-right mb-8 text-2xl font-medium tracking-tighter">
            {metadata.title}
          </h1>
          <p className="text-sm text-neutral-500">
            {formatDate(metadata.created)}
          </p>
        </header>
        <div className="prose prose-neutral dark:prose-invert mt-8">
          {content}
        </div>
      </article>
    );
  } catch (e) {
    notFound();
  }
}
