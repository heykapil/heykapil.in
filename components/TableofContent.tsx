"use client";

import { clsx } from "clsx";
// import { Disclosure } from "@headlessui/react";
import GithubSlugger from "github-slugger";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
// import { RiArrowDownSLine } from "react-icons/ri";

interface TOCProps {
  source: string;
}

const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<string | undefined>>
) => {
  const headingElementsRef: any = useRef({});

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2,h3,h4"));
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce(
        (
          map: { [x: string]: any },
          headingElement: { target: { id: string | number } }
        ) => {
          map[headingElement.target.id] = headingElement;

          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: any[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(b.target.id) - getIndexFromId(a.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -70% 0px",
    });

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const TableOfContents = ({ source }: TOCProps) => {
  const headingLines = source
    .split("\n")
    .filter((line) => line.match(/^###*\s/));

  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.slice(0, 3) === "###" ? 3 : 2;
    const slugger = new GithubSlugger();

    return {
      text,
      level,
      id: slugger.slug(text),
    };
  });

  const [activeId, setActiveId] = useState<string>();

  useIntersectionObserver(setActiveId);

  return (
    <>
      {headings.map((heading, index) => {
        return (
          <li
            key={index}
            className={clsx(
              heading.id === activeId
                ? "font-bold text-blue-500 border-l border-blue-500 bg-[var(--offset)]"
                : "font-normal",
              heading.level === 2 ? "pl-3" : "pl-6",
              "hover:underline hover:text-blue-500 py-2 border-l border-[var(--muted)]"
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector<any>(`#${heading.id}`).scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </>
  );
};

export default TableOfContents;
