import { components } from 'app/components/mdx';
import fs from 'fs';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
// Define the base path to your content inside the app directory
const BASE_PATH = path.join(process.cwd(), 'content');

export type Metadata = {
  title: string;
  created: string;
  updated: string;
  summary: string;
  slug: string;
  archived?: string;
  private?: boolean;
  image?: string;
};

// 1. Helper to read a directory
function getMDXFiles(dir: string) {
  const dirPath = path.join(BASE_PATH, dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter(file => path.extname(file) === '.md');
}

// 2. Get a List of Posts (Lightweight - used for listing pages)
// Only reads frontmatter, doesn't compile MDX
export function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);

  return mdxFiles.map(file => {
    let filePath = path.join(BASE_PATH, dir, file);
    let { data } = matter(fs.readFileSync(filePath, 'utf-8'));

    return {
      ...data,
      slug: path.basename(file, path.extname(file)),
    } as Metadata;
  });
}

// 3. Get a Single Post (Heavyweight - used for the [slug] page)
// Returns the compiled React Component + Metadata
export async function getPost(dir: string, slug: string) {
  const filePath = path.join(BASE_PATH, dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');

  // const options = {
  //   theme: 'one-dark-pro',
  //   defaultLang: 'plaintext',
  //   keepBackground: false,
  // };

  // compileMDX parses frontmatter AND turns markdown into React
  const { content, frontmatter } = await compileMDX<Metadata>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [],
      },
    },
    components: components,
  });

  return {
    content,
    metadata: { ...frontmatter, slug },
  };
}

export function getSnippetPosts() {
  return getMDXData('snippets');
}

export function getQuotes() {
  return getMDXData('quotes');
}

// Helper to get a specific snippet by slug directly
export async function getSnippet(slug: string) {
  return getPost('snippets', slug);
}

export function getExtraPosts() {
  return getMDXData('extra');
}

export function getBlogPosts() {
  return getMDXData('blog');
}

export async function getBlog(slug: string) {
  return getPost('blog', slug);
}
