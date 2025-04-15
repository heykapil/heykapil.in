import { queryBuilder } from './db';
import { generateState } from 'app/components/helpers/random';
import { signPasetoToken } from 'app/components/helpers/paseto';
export const getViewsCount = async (slug: string) => {
  const state = generateState();
  const payload = { state };
  const hash = await signPasetoToken({ payload });
  const token = hash ? `v4.public.${hash}` : '';
  const url = `https://kv.kapil.app/kv?key=pageviews,${slug}&state=${state}&token=${token}`;
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
