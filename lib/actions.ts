"use server";

import { auth } from "lib/auth";
import { type Session } from "next-auth";
import { queryBuilder } from "lib/db";
import { revalidatePath } from "next/cache";
export async function incrementview(slug: string) {
  const data = await queryBuilder
    .selectFrom("views")
    .where("slug", "=", slug)
    .select(["count"])
    .execute();

  const views = !data.length ? 0 : Number(data[0].count);

  await queryBuilder
    .insertInto("views")
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute();
  revalidatePath("/${slug}");
  return;
}

export async function incrementlike(slug: string) {
  const data = await queryBuilder
    .selectFrom("likes")
    .where("slug", "=", slug)
    .select(["count"])
    .execute();

  const likes = !data.length ? 0 : Number(data[0].count);

  await queryBuilder
    .insertInto("likes")
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: likes + 1 })
    .execute();
  // revalidatePath("/${slug}");
  return;
}

async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveCommentEntry(formData: FormData, slug: string) {
  const session = await getSession();
  const email = session.user?.email as string;
  const name = session.user?.name as string;
  const image = session.user?.image as string;
  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await queryBuilder
    .insertInto("comment")
    .values({ email, body, name, image, slug })
    .execute();

  revalidatePath(`/${slug}`);
  const data = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "comments@heykapil.in",
      to: "contact@heykapil.in",
      subject: "New Comment on website",
      html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Article: https://heykapil.in/${slug}</p>
      <p>Comment: ${body}</p>`,
    }),
  });
  const response = await data.json();
  console.log("Email Sent", response);
}

export async function updateComment(id: number, slug: string, body: string) {
  await queryBuilder
    .updateTable("comment")
    .set({
      body: body,
    })
    .where("id", "=", id)
    .execute();
  revalidatePath(`/${slug}`);
}

export async function deleteComment(id: number, slug: string) {
  await queryBuilder.deleteFrom("comment").where("id", "=", id).execute();
  revalidatePath(`/${slug}`);
}

export async function deleteGuestbookEntry(id: number) {
  await queryBuilder.deleteFrom("guestbook").where("id", "=", id).execute();
  revalidatePath("/guestbook");
}

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession();
  const email = session.user?.email as string;
  const created_by = session.user?.name as string;
  const image = session.user?.image as string;
  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await queryBuilder
    .insertInto("guestbook")
    .values({ email, body, created_by, image })
    .execute();

  revalidatePath("/guestbook");
  const data = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "guestbook@heykapil.in",
      to: "contact@heykapil.in",
      subject: "New Guestbook Entry",
      html: `
      <p>Name: ${created_by}</p>
      <p>Email: ${email}</p>
      <p>Message: ${body}</p>`,
    }),
  });
  const response = await data.json();
  console.log("Email Sent", response);
}
