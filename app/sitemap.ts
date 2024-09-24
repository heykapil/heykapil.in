import { MetadataRoute } from 'next';
import {
  getSnippetPosts,
  getQuotes,
  getBlogPosts,
  getExtraPosts,
} from './db/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getBlogPosts();
  const allSnippets = getSnippetPosts();
  const allQuotes = getQuotes();
  const allExtraPosts = getExtraPosts();
  const blogs = allPosts.map((post) => ({
    url: `https://kapil.app/musing/${post.slug}`,
    title: post.metadata.title,
    lastModified: post.metadata.created,
  }));
  const snippets = allSnippets.map((snippet) => ({
    url: `https://kapil.app/snippet/${snippet.slug}`,
    title: snippet.metadata.title,
    lastModified: snippet.metadata.created,
  }));
  const quotes = allQuotes.map((quote) => ({
    url: `https://kapil.app/quotes/${quote.slug}`,
    title: quote.metadata.title,
    lastModified: quote.metadata.created,
  }));
  const extraPosts = allExtraPosts.map((post) => ({
    url: `https://kapil.app/extras/${post.slug}`,
    title: post.metadata.title,
    lastModified: post.metadata.created,
  }));
  const routes = [
    '',
    '/snippet',
    '/work',
    '/quotes',
    '/musing',
    '/guestbook',
    '/signin',
    '/register',
  ].map((route) => ({
    url: `https://kapil.app${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...snippets, ...quotes, ...extraPosts];
}
