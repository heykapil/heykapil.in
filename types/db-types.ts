import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type comments = {
  id: string;
  slug: string;
  name: string;
  body: string;
  email: string;
  image: string | null;
  created_at: Generated<Timestamp>;
};
export type guestbook = {
  id: Generated<number>;
  email: string;
  username: string | null;
  body: string;
  image: string | null;
  created_by: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
};
export type likes = {
  slug: string;
  count: Generated<number>;
};
export type views = {
  slug: string;
  count: Generated<number>;
};
export type DB = {
  comments: comments;
  guestbook: guestbook;
  likes: likes;
  views: views;
};
