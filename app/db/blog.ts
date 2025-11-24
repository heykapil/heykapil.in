import { components } from 'app/components/mdx';
import fs from 'fs';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
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

function getMDXFiles(dir: string) {
  const dirPath = path.join(BASE_PATH, dir);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter(file => path.extname(file) === '.md');
}

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

export async function getPost(dir: string, slug: string) {
  const filePath = path.join(BASE_PATH, dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
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
