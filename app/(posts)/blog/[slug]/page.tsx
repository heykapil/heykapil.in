import { formatDate } from 'app/components/helpers/format-date';
import { getBlogPosts, getPost } from 'app/db/blog';
import { notFound } from 'next/navigation';
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
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(metadata.created)}
            </p>
            <ViewCounter slug={`musing,${metadata.slug}`} trackView={true} />
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
