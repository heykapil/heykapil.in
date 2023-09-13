import { allSnippets } from "contentlayer/generated";

export const sortedSnippets = allSnippets
  .filter((snippet) => snippet.status === "published")
  .sort((a, b) => `${a.logo}`.localeCompare(`${b.logo}`));
