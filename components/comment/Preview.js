"use client";
import { Remarkable } from "remarkable";
// import { linkify } from "remarkable/linkify";

const md = new Remarkable("full", {
  html: true,
  typographer: true,
  xhtmlOut: true,
  breaks: true,
  quotes: "“”‘’",
  // highlight: function (str, lang) {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return hljs.highlight(lang, str).value;
  //     } catch (err) {}
  //   }

  //   try {
  //     return hljs.highlightAuto(str).value;
  //   } catch (err) {}

  //   return "";
  // },
});
// .use(linkify);

export default function MarkdownPreview({ markdown }) {
  return (
    <>
      <div
        className='preview w-full prose prose-quoteless prose-neutral dark:prose-invert'
        dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
      />
    </>
  );
}
