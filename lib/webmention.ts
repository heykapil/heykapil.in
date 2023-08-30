export const getMentionsForSlug = async (path: string) => {
  const webmentions = await fetch(
    `https://webmention.io/api/mentions?target=https://heykapil.in/${path}&per-page=10000`
  );
  const mentions = await webmentions.json();
  const numberOfmentions = mentions?.links?.length;

  return numberOfmentions > 0 ? numberOfmentions : 0;
};
