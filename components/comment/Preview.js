import { Remarkable } from "remarkable";

const md = new Remarkable();

export default function MarkdownPreview({ markdown }) {
  return (
    <div
      className='preview w-full prose prose-quoteless prose-neutral dark:prose-invert'
      dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
    />
  );
}
