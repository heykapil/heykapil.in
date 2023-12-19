"use server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
import { type Session } from "next-auth";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { queryBuilder } from "./db";
import { randomUUID } from "crypto";

export async function increment(slug: string) {
  noStore();
  let id = slug.replace("/", "-");
  const data = await queryBuilder
    .selectFrom("views")
    .where("slug", "=", slug)
    .select(["count"])
    .execute();

  const views = !data.length ? 0 : Number(data[0].count);

  if (views === 0) {
    await queryBuilder
      .insertInto("views")
      .values({
        id: id,
        slug: slug,
        count: 1,
      })
      .execute();
  } else {
    await queryBuilder
      .updateTable("views")
      .set({
        count: views + 1,
      })
      .where("slug", "=", slug)
      .executeTakeFirst();
  }
  revalidatePath(`/${slug}`);
  return;
}

async function getSession(): Promise<Session> {
  let session = await getServerSession(authConfig);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession();
  let email = session.user?.email as string;
  let created_by = session.user?.name as string;
  let image = session.user?.image as string;
  let uuid = randomUUID();
  if (!session.user) {
    throw new Error("Unauthorized");
  }

  let entry = formData.get("entry")?.toString() || "";
  let body = entry.slice(0, 500);

  await queryBuilder
    .insertInto("guestbook")
    .values({ id: uuid, email, body, created_by, image })
    .execute();

  revalidatePath(`/guestbook`);
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

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (
    email !== "kapilchaudhary@gujaratuniversity.ac.in" &&
    email !== "contact@heykapil.in"
  ) {
    throw new Error("Unauthorized");
  }

  let selectedEntriesAsNumbers = selectedEntries;
  // let arrayLiteral = `{${selectedEntriesAsNumbers.join(",")}}`;

  await queryBuilder
    .deleteFrom("guestbook")
    .where("id", "in", selectedEntriesAsNumbers)
    .execute();

  revalidatePath(`/admin`);
  revalidatePath(`/guestbook`);
}
