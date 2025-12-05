import { MetadataRoute } from 'next';
import {
  getBlogPosts,
  getExtraPosts,
  getQuotes,
  getSnippetPosts,
} from './db/blog';

export const dynamic = 'force-static';

// Helper to normalize dates into valid ISO 8601 format
const formatDate = (dateStr: string | undefined | null) => {
  if (!dateStr) return new Date().toISOString();
  
  // Clean up common typos (like the semicolon in your XML)
  const cleanStr = dateStr.toString().replace(/;/g, '').trim();
  
  const date = new Date(cleanStr);
  
  // If date is invalid, fallback to current date or specific default
  if (isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  
  return date.toISOString(); // Returns YYYY-MM-DDTHH:mm:ss.sssZ
};

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getBlogPosts();
  const allSnippets = getSnippetPosts();
  const allQuotes = getQuotes();
  const allExtraPosts = getExtraPosts();

  const blogs = allPosts.map(post => ({
    url: `https://kapil.app/blog/${post.slug}`,
    lastModified: formatDate(post.updated),
  }));

  const snippets = allSnippets.map(snippet => ({
    url: `https://kapil.app/snippet/${snippet.slug}`,
    lastModified: formatDate(snippet.updated),
  }));

  const quotes = allQuotes.map(quote => ({
    url: `https://kapil.app/quotes/${quote.slug}`,
    lastModified: formatDate(quote.created),
  }));

  const extraPosts = allExtraPosts.map(post => ({
    url: `https://kapil.app/extras/${post.slug}`,
    lastModified: formatDate(post.created),
  }));
  
  return [...blogs, ...snippets, ...quotes, ...extraPosts];
}