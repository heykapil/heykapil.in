"use client";
import { marked } from "marked";
// import markedKatex from "marked-katex-extension";
// const optionsKatex = {
//   throwOnError: false,
// };
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
// marked.use(markedKatex(optionsKatex));
export default function MarkdownPreview({ markdown }) {
  return (
    <>
      <div
        className='preview w-full prose prose-quoteless prose-neutral dark:prose-invert'
        dangerouslySetInnerHTML={{
          __html: marked.parse(markdown),
        }}
      />
    </>
  );
}
