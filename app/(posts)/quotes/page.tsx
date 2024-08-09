import Link from 'next/link';
import { getQuotes } from 'app/db/blog';

export const metadata = {
  title: 'Quotes',
  description: 'All quotes',
};

export default function BlogPage() {
  let allQuotes = getQuotes();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog Posts</h1>
      {allQuotes
        .sort((a, b) => {
          if (new Date(a.metadata.created) > new Date(b.metadata.created)) {
            return -1;
          }
          return 1;
        })
        .filter((post) => post.metadata.archived !== 'true')
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/quotes/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
