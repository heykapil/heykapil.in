import { CustomMDX } from 'app/components/mdx';
import { getExtraPosts } from 'app/db/blog';
import { notFound } from 'next/navigation';
export default function PrivacyPolicyPage() {
  let post = getExtraPosts().find((post) => post.slug === 'privacy-policy');
  if (!post) {
    return notFound();
  }
  return (
    <section>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
