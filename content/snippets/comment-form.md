---
title: Comment form with database
description: comment form
logo: tsx.svg
tags:
  - database
  - Next.js
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

We will store the comments data in the [planetscale](https://planetscale.com) database table. So create a [new database](https://app.planetscale.com/) and generate the credentials of database url to connect to it. If you have existing database, you will require a new table to the database. 

### Install dependencies

```
pnpm add prisma prisma-kysely kysely kysely-planetscale use-server
```

### Connection to database

We will connect to the database to create a new table for storing the data of the comments.

Go to your planetscale dashboard and copy the generated database url and paste in the `.env` file variable, it should look like `DATABASE_URL: "mysql://...."`.

```
\\ prisma/scheme.prisma

datasource db {
    provider     = "mysql"
    url          = env("DATABASE_URL")
    relationMode = "prisma"
}

generator kysely {
    provider = "prisma-kysely"
    output   = "../types"
    fileName = "db-types.ts"
}

model comment {
    id    BigInt @id @default(autoincrement())
    slug  String @db.VarChar(128)
    name String @db.VarChar(50)
    body String @db.VarChar(700)
    email String
    image String?
    created_at DateTime @default(now()) @db.DateTime(6)
}
```

- Run `npx prisma db push`
- This will generate a file named `types/db-types.ts`

### Query to database

- Create a new file which exports `queryBuilder` to query the database in the app.

```typescript title="lib/db.ts"
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { DB } from "types/db-types";

export const queryBuilder = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
```

### Comment form

```typescript title="components/comment/Form.tsx"
"use client";

import { useRef } from "react";
import { saveCommentEntry } from "lib/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
export default function CommentForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <>
      <form
        style={{ opacity: !pending ? 1 : 0.5 }}
        className='w-full max-w-full mb-8 space-y-1'
        ref={formRef}
        action={async (formData) => {
          await saveCommentEntry(formData, slug);
          formRef.current?.reset();
        }}
      >
        <div>
          <div className='relative'>
            <input
              type='text'
              placeholder='Enter your name'
              aria-label='Enter your name'
              disabled={pending}
              name='name'
              required
              className='p-2 w-full border border-[var(--border)] outline-[var(--border)] rounded-md bg-[var(--primaryforeground)] text-[var(--primary)]'
            />
            <input
              type='email'
              placeholder='Enter your email'
              aria-label='Enter your email'
              disabled={pending}
              name='email'
              required
              className='p-2 w-full border border-[var(--border)] outline-[var(--border)] rounded-md bg-[var(--primaryforeground)] text-[var(--primary)]'
            />
            <input
              type='text'
              placeholder='Enter your image url'
              aria-label='Image'
              disabled={pending}
              name='image'
              // required
              className='p-2 w-full border border-[var(--border)] outline-[var(--border)] rounded-md bg-[var(--primaryforeground)] text-[var(--primary)]'
            />
            <textarea
              rows={3}
              placeholder='Enter your comment'
              aria-label='Enter your comment...'
              disabled={pending}
              name='entry'
              required
              className='p-2 w-full border border-[var(--border)] outline-[var(--border)] rounded-md bg-[var(--primaryforeground)] text-[var(--primary)]'
            />
          </div>
        </div>
        <div className='flex items-center mt-2 justify-between'>
          <button
            className='inline-block px-2 py-1 bg-[var(--offset2)] bg-opacity-60	 rounded-lg text-sm cursor-pointer'
            disabled={pending}
            type='submit'
          >
            Submit{" "}
          </button>
        </div>
      </form>
    </>
  );
}
```

Now create a function which pushes the comment form entries to the database.

```typescript title="lib/actions.ts"
"use server";

import { queryBuilder } from "lib/db";
import { revalidatePath } from "next/cache";
export async function saveCommentEntry(formData: FormData, slug: string) {
  const nameentry = formData.get("name")?.toString() || "";
  const emailentry = formData.get("email")?.toString() || "";
  const imageentry = formData.get("image")?.toString() || "";
  const entry = formData.get("entry")?.toString() || "";

  const name = nameentry.slice(0, 100);
  const email = emailentry.slice(0, 100);
  const image = emailentry.slice(0, 500);
  const body = entry.slice(0, 500);

  await queryBuilder
    .insertInto("comment")
    .values({ email, body, name, image, slug })
    .execute();

  revalidatePath(`/${slug}`);
}
```

Final componet which displays comment form and comment entries.

```typescript title="components/comment/Box.tsx"
import { queryBuilder } from "lib/db";
import { Suspense } from "react";
import Image from "next/image";
import CommentForm from "./Form";
async function getComment(slug: string) {
  const data = await queryBuilder
    .selectFrom("comment")
    .selectAll()
    .where("slug", "=", `${slug}`)
    .select(["body", "name", "image", "email", "id", "created_at"])
    .orderBy("created_at", "desc")
    .limit(100)
    .execute();
  return data;
}

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function CommentBox({ slug }: { slug: string }) {
  let entries;
  try {
    const [commentRes] = await Promise.allSettled([getComment(slug)]);

    if (commentRes.status === "fulfilled" && commentRes.value[0]) {
      entries = commentRes.value;
    } else {
      console.error(commentRes);
    }
  } catch (error) {
    console.error(error);
  }
  return (
    <>
      <CommentForm slug={slug} />

      <Suspense fallback={<p>Loading comments...</p>}>
        {entries === undefined ? (
          <p className='my-2'>No comments. Be the first one to comment.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className='border-b border-[var(--border)] my-4 prose dark:prose-invert'
            >
              <div className='grid grid-cols-12 w-full'>
                <div className='flex rounded-xl col-span-12'>
                  <div className='flex h-8 w-8 bg-[var(--offset)] items-center justify-center overflow-hidden rounded-full flex-shrink-0'>
                    {entry.image ? (
                      <Image
                        src={entry.image}
                        alt={entry.name}
                        width={28}
                        height={28}
                        className='rounded-full self-centered'
                      />
                    ) : (
                      <svg
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[24px] h-[24px] self-centered'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                        />
                      </svg>
                    )}
                  </div>
                  <div className='ml-2 w-full'>
                    <div className='flex w-full items-start justify-between'>
                      <span className='font-semibold'>{entry.name}</span>
                      <Date> {entry.created_at} </Date>
                    </div>
                    <div className='mt-1'>{entry.body}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Suspense>
    </>
  );
}
```

Include the component as `<CommentBox slug={slug} />` in your blog page.
