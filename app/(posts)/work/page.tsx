import type { Metadata } from "next";
import React, { Suspense } from "react";
import Link from "next/link";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { teachingData } from "./data";
export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions.",
};

async function getScholarData() {
  noStore();
  try {
    const res = await fetch(`https://api.kapil.app/api/scholar`, {
      next: { revalidate: 86400 },
    });
    revalidatePath("/work");
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to fetch scholar data");
  }
}

export default async function WorkPage() {
  let scholarData = await getScholarData();
  return (
    <section className="group/section">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div>
        <p>Hi, This is the collection of the work and all the contributions.</p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">
          Research Articles
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Dec 2021 onwards
        </p>

        <Suspense fallback={<span className="h-8">Loading ...</span>}>
          <div className="prose prose-neutral dark:prose-invert">
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
          </div>
        </Suspense>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">Teaching</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Currently teaching:
        </p>
        <div className="group-hover/section:text-[#a1a1aa] mt-8 dark:group-hover/section:text-[#656565]">
          {teachingData.map((data, index) => (
            <Link
              key={index}
              className="flex flex-col space-y-1 group/item mb-4 hover:text-black dark:hover:text-white transition duration-[250ms] ease-out hover:duration-[50ms]"
              href={"#"}
            >
              <div className="w-full flex flex-col md:flex-row justify-between">
                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis tracking-tight">
                  {data.code}: {data.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
