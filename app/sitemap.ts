import { allPosts, allSnippets } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allPosts.map((post) => ({
    url: `https://heykapil.in/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const snippets = allSnippets.map((snippet) => ({
    url: `https://heykapil.in/snippet/${snippet.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/snippet", "/blog", "/guestbook"].map((route) => ({
    url: `https://heykapil.in${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...snippets];
}
