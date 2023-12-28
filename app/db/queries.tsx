import { queryBuilder } from "./db";
import { cache } from "react";

// const googleAuth = new google.auth.GoogleAuth({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY,
//   },
//   scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
// });

// const youtube = google.youtube({
//   version: "v3",
//   auth: googleAuth,
// });

export const getBlogViews = cache(async () => {
  // if (!process.env.DURL) {
  //   return 0;
  // }

  const data = await queryBuilder
    .selectFrom("views")
    .select(["count"])
    .execute();

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export const getViewsCount = cache(async () => {
  return queryBuilder.selectFrom("views").select(["slug", "count"]).execute();
});

export async function getGuestbookEntries() {
  const data = await queryBuilder
    .selectFrom("guestbook")
    .select(["id", "body", "created_by", "updated_at", "image", "email"])
    .orderBy("updated_at", "desc")
    .limit(100)
    .execute();
  return data;
}
export async function getUploadHistory() {
  const data = await queryBuilder
    .selectFrom("uploads")
    .select(["id", "name", "size", "uploaded_at", "url"])
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
