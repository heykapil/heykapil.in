"use client";
import { marked } from "marked";
marked.use({
  async: false,
  breaks: false,
  gfm: true,
  hooks: null,
  pedantic: false,
  silent: false,
  tokenizer: null,
  walkTokens: null,
});
export default function MarkdownPreview({ markdown }: { markdown: string }) {
  return (
    <>
      <div
        className="preview w-full prose prose-quoteless prose-neutral dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: marked.parse(markdown),
        }}
      />
    </>
  );
}
