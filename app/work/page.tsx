import type { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions.",
};

// async function Stars() {
//   let res = await fetch("https://api.github.com/repos/vercel/next.js");
//   let json = await res.json();
//   let count = Math.round(json.stargazers_count / 1000);
//   return `${count}k stars`;
// }

async function getScholarData() {
  const res = await fetch(
    `https://serpapi.com/search.json?engine=google_scholar_author&author_id=eL2sgQYAAAAJ&hl=en&api_key=${process.env.SERP_API_KEY}`,
    {
      next: { revalidate: 86400 },
    }
  );
  //   revalidatePath("/work");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function WorkPage() {
  let scholarData = await getScholarData();
  // console.log(scholarData["articles"]);
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>Hi, This is the collection of the work and all the contributions.</p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Research Articles
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Dec 2021 onwards
        </p>

        <Suspense fallback={<span className="h-8">Loading ...</span>}>
          <ol>
            {scholarData["articles"].map((data) => (
              <li key={data.title}>
                <a href={data.link} target="_blank">
                  {data.title}
                </a>{" "}
                <br />
                <span className="opacity-70 text-sm">
                  Authors: {data.authors}
                </span>
                <br />
                <span className="opacity-70 text-sm">
                  Journal: {data.publication}
                </span>
                <br />
                <span className="text-sm">
                  Citations:{" "}
                  {data.cited_by.value ? (
                    <a
                      href={`https://scholar.google.com/scholar?oi=bibs&hl=en&cites=${data.cited_by.cites_id}&as_sdt=5`}
                      target="_blank"
                    >
                      {data.cited_by.value}
                    </a>
                  ) : (
                    "0"
                  )}
                </span>
              </li>
            ))}
          </ol>
        </Suspense>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">Teaching</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Tutorials etc.
        </p>
      </div>
    </section>
  );
}
