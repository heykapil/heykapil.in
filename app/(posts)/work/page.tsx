import type { Metadata } from "next";
import React, { Suspense } from "react";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
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
                  <a target="_blank" href={data.link}>
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
          Dec 2021 onwards
        </p>
        <div className="flex flex-col mt-8 space-y-4">
          <details className="flex space-y-2 duration-150">
            <summary className="list-none cursor-pointer">
              MAT409 - Complex Analysis II
            </summary>
            <ul className="list-disc list-inside ml-4">
              <li>
                Book:{" "}
                <a
                  href="https://cdn.kapil.app/teaching/MAT409_ComplexII_2023-24/Course_Book.pdf"
                  className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                >
                  Complex Variables and applications (J. Brown & R. Churchil)
                  9th edition
                </a>
              </li>
              <li>
                <p>Lectures</p>
              </li>
              <li>
                <a
                  href="https://cdn.kapil.app/teaching/MAT409_ComplexII_2023-24/Unit_II_Assignment.pdf"
                  className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                >
                  Assignment
                </a>{" "}
                (Due date: Feb 19, 2024 at 2:00 PM)
              </li>
              <li>
                <a
                  href="https://cdn.kapil.app/teaching/MAT409_ComplexII_2023-24/Unit%20Test%20II.pdf"
                  className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                >
                  Unit test II
                </a>{" "}
                (Test date: Feb 14, 2024 at 3:30 PM)
              </li>
              <li>
                <a
                  href="https://cdn.kapil.app/teaching/MAT409_ComplexII_2023-24/Solution%20Unit%20Test%20II.pdf"
                  className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                >
                  Test solutions
                </a>
              </li>
            </ul>
          </details>
          <details className="flex space-y-2">
            <summary className="overflow-hidden whitespace-nowrap overflow-ellipsis tracking-tight">
              MAT405PR - Matrices & Linear algebra
            </summary>
            <ul className="list-disc list-inside ml-4">
              <details>
                <summary>Lecture notes</summary>
                <ul className="list-inside flex flex-row list-none space-x-4 ml-4">
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Notes%20-%2011-01.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      11 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Notes%20-%2012-01.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      12 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Notes%20-%2013-01.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      13 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Notes%20-%2018-01.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      18 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Notes%20-%2020-01.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      20 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Notes%20-%2021-01.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      21 Jan
                    </a>
                  </li>
                </ul>
              </details>
              <details>
                <summary>Practice problems</summary>
                <ul className="list-inside flex flex-row list-none space-x-4 ml-4">
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Practice%20Problems%20-11%20Jan.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      11 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Practice%20Problems%20-12%20Jan.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      12 Jan
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cdn.kapil.app/teaching/MAT405_Linear_2022-23/Practice%20Problems%20-13%20Jan.pdf"
                      className="underline text-[#0000ff] dark:text-[#F7CD5D]"
                    >
                      13 Jan
                    </a>
                  </li>
                </ul>
              </details>
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
