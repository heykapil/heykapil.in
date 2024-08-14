import { queryBuilder } from './db';

export const getViewsCount = async (slug: string) => {
  const url = `https://kv.kapil.app/kv?key=pageviews,${slug}`;
  const response = await fetch(url);
  const data = await response.json();
  const count = data?.value?.value || 0;
  return count;
};

export async function getUploadHistory() {
  const data = await queryBuilder
    .selectFrom('uploads')
    .select(['id', 'name', 'size', 'uploaded_at', 'url'])
    .limit(100)
    .execute();
  return data;
}
