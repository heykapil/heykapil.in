import { getBlogPosts } from "app/db/blog";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `https://kapil.app/blog/${post.slug}`,
    lastModified: post.metadata.updated,
  }));

  let routes = ["", "/blog", "/guestbook", "/uses", "/work"].map((route) => ({
    url: `https://kapil.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
