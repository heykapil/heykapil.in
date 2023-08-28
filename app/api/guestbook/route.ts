import { getServerSession } from "next-auth/next";

import { queryBuilder } from "lib/db";
import { BadRequest, Unauthorized } from "lib/api";

import { authOptions } from "lib/nextauth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email || !session.user.name) {
    return Unauthorized();
  }

  const { email, name } = session.user;
  const { value } = await req.json();

  if (typeof value !== "string" || value.trim().length === 0 || !value) {
    return BadRequest("Invalid body");
  }

  const newEntry = await queryBuilder
    .insertInto("guestbook")
    .values({
      email,
      body: (value || "").slice(0, 500),
      created_by: name,
    })
    .execute();

  if (!newEntry[0]) {
    return BadRequest("Could not create entry");
  }

  return new Response(
    JSON.stringify({
      id: Number(newEntry[0].insertId),
      body: (value || "").slice(0, 500),
      created_by: name,
      updated_at: Date.now(),
    }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !Number(id)) {
    return BadRequest("Invalid id");
  }

  const entryResult = await queryBuilder
    .selectFrom("guestbook")
    .selectAll()
    .where("id", "=", Number(id))
    .execute();

  const entry = entryResult[0];

  if (!entry) {
    return BadRequest("Entry not found");
  }

  if (!session || !session.user || session.user.email !== entry.email) {
    return Unauthorized();
  }

  await queryBuilder
    .deleteFrom("guestbook")
    .where("id", "=", Number(id))
    .where("email", "=", session.user.email)
    .execute();

  return new Response(JSON.stringify({ message: `Deleted entry ${id}` }), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
