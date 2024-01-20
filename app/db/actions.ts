"use server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "pages/api/auth/[...nextauth]";
import { type Session } from "next-auth";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { queryBuilder } from "./db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
  const secret = process.env.SECRET! as string;
  const secret2 = process.env.SECRET2! as string;
  const hash = await bcrypt.hash(secret2, 10);
  const token = await jwt.sign(hash, secret);
  try {
    const html = `<p>name ${created_by}</p><p>email ${email}</p><p>message ${body}</p>`;
    const data = await fetch(
      `https://api.kapil.app/api/sendEmail?token=${token}&from=hi@kapil.app&to=hi@kapil.app&subject=New guestbook entry&html=${html}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await data.json();
    console.log("Email Sent", response);
  } catch (error: any) {
    throw new Error(error.message);
  }
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

  await queryBuilder
    .deleteFrom("guestbook")
    .where("id", "in", selectedEntriesAsNumbers)
    .execute();

  revalidatePath(`/admin`);
  revalidatePath(`/guestbook`);
}

export async function saveUploadHistory(formData: FormData) {
  let session = await getSession();
  let uuid = randomUUID();
  let name = formData.get("filename");
  let url = formData.get("fileurl");
  let size = formData.get("filesize");
  let uploaded_at = formData.get("uploaded_at");
  if (!session.user) {
    throw new Error("Unauthorized");
  }

  await queryBuilder
    .insertInto("uploads")
    // @ts-ignore
    .values({ id: uuid, name, size, url, uploaded_at })
    .execute();
  revalidatePath(`/upload`);
}

export async function saveVisitorLog({
  ip,
  location,
  path,
}: {
  ip: string;
  location: string;
  path: string;
}) {
  let uuid = randomUUID();
  await queryBuilder
    .insertInto("visitors")
    .values({ id: uuid, url: path, ip, location })
    .execute();
}

export async function sendEmail(formData: FormData) {
  const from = formData.get("from") || "Kapil Chaudhary <hi@kapil.app>";
  const to = formData.get("to") as string;
  const subject = formData.get("subject") as string;
  const html = formData.get("html") as string;
  const fileurl = (formData.get("fileurl") as string) || null;
  const filename = (formData.get("filename") as string) || null;
  const secret = process.env.SECRET! as string;
  const secret2 = process.env.SECRET2! as string;
  const hash = await bcrypt.hash(secret2, 10);
  const token = await jwt.sign(hash, secret);
  let fetchUrl: string;

  if (!filename || !fileurl) {
    fetchUrl = `https://api.kapil.app/api/sendEmail?token=${token}&from=${from}&to=${to}&subject=${subject}&html=${html}`;
  } else {
    fetchUrl = `https://api.kapil.app/api/sendEmail?token=${token}&from=${from}&to=${to}&subject=${subject}&html=${html}&filename=${filename}&fileurl=${fileurl}`;
  }
  try {
    const data = await fetch(fetchUrl, {
      method: "GET",
    });
    const response = await data.json();
    if (response.message) {
      cookies().set(
        "email-sent-toast-msg",
        response.message,
        { expires: new Date(Date.now() + 10 * 1000) } // 10 seconds
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
