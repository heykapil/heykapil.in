import { queryBuilder } from './db';

// export const getBlogViews = cache(async () => {
//   // if (!process.env.DURL) {
//   //   return 0;
//   // }

//   const data = await queryBuilder
//     .selectFrom('views')
//     .select(['count'])
//     .execute();

//   return data.reduce((acc, curr) => acc + Number(curr.count), 0);
// });

export const getViewsCount = async (slug: string) => {
  const url = `https://kv.kapil.app/kv?key=pageviews,${slug}`;
  const response = await fetch(url);
  const data = await response.json();
  const count = data?.value?.value || 0;
  return count;
};

export async function getGuestbookEntries() {
  const data = await queryBuilder
    .selectFrom('guestbook')
    .select(['id', 'body', 'created_by', 'updated_at', 'image', 'email'])
    .orderBy('updated_at', 'desc')
    .limit(100)
    .execute();
  return data;
}
export async function getUploadHistory() {
  const data = await queryBuilder
    .selectFrom('uploads')
    .select(['id', 'name', 'size', 'uploaded_at', 'url'])
    .limit(100)
    .execute();
  return data;
}
// export const getLikesCount = cache(async () => {
//   return queryBuilder.selectFrom("likes").select(["slug", "count"]).execute();
// });

// export const getLeeYouTubeSubs = cache(async () => {
//   const response = await youtube.channels.list({
//     id: ["UCZMli3czZnd1uoc1ShTouQw"],
//     part: ["statistics"],
//   });

//   let channel = response.data.items![0];
//   return Number(channel?.statistics?.subscriberCount);
// });

// export const getVercelYouTubeSubs = cache(async () => {
//   const response = await youtube.channels.list({
//     id: ["UCLq8gNoee7oXM7MvTdjyQvA"],
//     part: ["statistics"],
//   });

//   let channel = response.data.items![0];
//   return Number(channel?.statistics?.subscriberCount);
// });
