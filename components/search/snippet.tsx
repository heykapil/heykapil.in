"use client";
import React, { useState } from "react";
import data from "../../lib/data/search-data-snippet.json";
import clsx from "clsx";
import Link from "next/link";
const SearchBarFilterSnippet = ({ currentslug }: { currentslug: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const filterData = (searchTerm: string) => {
    const filteredData = data.filter((snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  return (
    <div className='mt-0'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        className='block w-full px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded-md  focus:border-transparent focus:outline focus:ring-pink-500 focus:border-pink-500'
        onChange={handleInputChange}
      />

      <ul className='mt-2 text-sm'>
        {!filterData.length && <p className='mb-4'>No snippets found.</p>}
        {filteredData.map((snippet) => (
          <li
            key={snippet.slug}
            className={clsx(
              "rounder-lg hover:bg-[var(--offset)] py-2 px-1 border-none pl-2",
              snippet.slug === currentslug
                ? "border-blue-500 bg-[var(--offset)]"
                : "border-[var(--muted)]"
            )}
          >
            <Link
              className={clsx(
                "rounded-md animated-list",
                snippet.slug === currentslug
                  ? "font-semibold text-blue-500"
                  : ""
              )}
              href={`/snippet/${snippet.slug}`}
            >
              {snippet.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBarFilterSnippet;
