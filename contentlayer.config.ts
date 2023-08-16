import * as fs from "fs";
import * as path from "path";
import { ComputedFields, defineDocumentType } from 'contentlayer/source-files'
import { spawn } from 'node:child_process'
import { makeSource } from 'contentlayer/source-remote-files'
import readingTime from 'reading-time';
import  GitHubSlugger  from 'github-slugger';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
// import { rehypePrettyCodeClasses } from "./app/lib/rehype/rehypeoptions";
const slugger = new GitHubSlugger();
const headers_regex = /(#{1,6})\s+(.+)/g;
interface HeadingType {
  heading: number;
  text: string;
  slug: string;
  child: {
    heading: number;
    text: string;
    slug: string;
  }[];
};
const prettyCodeOptions: Partial<PrettyCodeOptions> = {
   theme : {
  dark: JSON.parse(
    fs.readFileSync(`${process.cwd()}/lib/rehype/dark.json`, "utf8")
  ),
light: JSON.parse(
    fs.readFileSync(`${process.cwd()}/lib/rehype/light.json`, "utf8")
  ),
},
}
const computedFields: ComputedFields = {
  structuredData: {
    type: 'nested',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://leerob.io${doc.image}`
        : `https://leerob.io/og?title=${doc.title}`,
      url: `https://leerob.io/blog/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'Kapil Chaudhary',
        },
      }),
    },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
  },
  readingTime: {
    type: 'string',
    resolve: (doc) => readingTime(doc.body.raw).text
  },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },
  headings: {
    type: 'json',
    resolve: async doc => {
      const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const headings = Array.from(doc.body.raw.matchAll(regXHeader)) as {
        groups: {
          flag: string;
          content: string;
        };
      }[];

      const enrichedHeadings: HeadingType[] = [];
      let parentHeading: HeadingType | null = null;

      headings.forEach((value, counter) => {
        const groups = value.groups;
        const flag = groups?.flag;
        const content = groups?.content;

        if (flag && flag.length === 2) {
          // If the heading is h2 (##), treat it as a parent
          parentHeading = {
            heading: flag.length,
            text: content,
            slug: content ? slugger.slug(content) : '',
            child: [],
          };
          enrichedHeadings.push(parentHeading);
        } else if (parentHeading) {
          // If the heading is not h2 (##) and there is a parent heading, treat it as a child
          parentHeading.child.push({
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : '',
          });
        }
      });

      parentHeading = null;
      return enrichedHeadings;
    },
  },
  externalLinks: {
    type: 'json',
    resolve: async doc => {
      // https://morioh.com/p/2f455138edf8
      const regXExternalLink =
        /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/gi;

      const externalLinks = Array.from(
        doc.body.raw.matchAll(regXExternalLink)
      ).map((value: any) => {
        const text = value[1];
        const url = value[2];
        if (!url) return;
        // Replacing all the / with @ to avoid folder structure
        const name = (url as string).replace(/[\/#]/g, '@');

        return {
          text,
          url,
          name,
        };
      });

      return externalLinks;
    },
  },
}
const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    image : {
      type: 'string',
      required: false,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: false,
    }
  },
  computedFields
}))

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    tag: { type: 'string', required: false },
    logo: { type: 'string', required: false }
  },
  computedFields
}))

const syncContentFromGit = async (contentDir: string) => {
  const syncRun = async () => {
    const gitUrl = 'https://github.com/heykapil/data-website.git'
    await runBashCommand(`
      if [ -d  "${contentDir}" ];
        then
          cd "${contentDir}"; git pull;
        else
          git clone --depth 1 --single-branch ${gitUrl} ${contentDir};
      fi
    `)
  }

  let wasCancelled = false
  let syncInterval: string | number | NodeJS.Timeout | undefined

  const syncLoop = async () => {
    console.log('Syncing content files from git')

    await syncRun()

    if (wasCancelled) return

    syncInterval = setTimeout(syncLoop, 1000 * 60)
  }

  // Block until the first sync is done
  await syncLoop()

  return () => {
    wasCancelled = true
    clearTimeout(syncInterval)
  }
}

const runBashCommand = (command: string) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, [], { shell: true })

    child.stdout.setEncoding('utf8')
    child.stdout.on('data', (data) => process.stdout.write(data))

    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (data) => process.stderr.write(data))

    child.on('close', function (code) {
      if (code === 0) {
        resolve(void 0)
      } else {
        reject(new Error(`Command failed with exit code ${code}`))
      }
    })
  })

export default makeSource({
  syncFiles: syncContentFromGit,
  contentDirPath: 'content',
  contentDirInclude: ['posts', 'snippets'],
  documentTypes: [Post, Snippet],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [ 
      [rehypeSlug],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
   
            if (codeEl.tagName !== "code") return;
   
            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [rehypePrettyCode, prettyCodeOptions],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }
   
            for (const child of node.children) {
              if (child.tagName === "pre") {
                child.properties["raw"] = node.raw;
              }
            }
          }
        });
      },
      [
        rehypeAutolinkHeadings,
        {
          behaviour: "wrap",
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})