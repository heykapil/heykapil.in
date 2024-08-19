---
title: Pros and Cons Card
description: Card components to show pros and cons in mdx post.
logo: mdx.svg
tags:
  - mdx
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

In this guide, we create Pros Card like this

```tsx
<ProsCard
  title="Title of Pros"
  pros={["Pros number 1.", "Pros number 2.", "Pros number 3.", "and so on."]}
/>
```

and Cons card like this.

```tsx
<ConsCard
  title="Title of Cons"
  cons={["Cons number 1.", "Cons number 2.", "Cons number 3.", "and so on."]}
/>
```

We will create two components `components/ProsCard.tsx` and `components/ConsCard.tsx`,then pass these through `components/MDXComponents.tsx`.

```tsx title="components/MDXComponents.tsx"
import ProsCard from 'components/ProsCard';
import ConsCard from 'components/ConsCard';
...

const MDXComponents = {
    ...
    ConsCard,
    ProsCard,
};
export default MDXComponents
```

Now, finally the code for the components

```tsx title="components/ProsCard.tsx" showLineNumbers
export default function ProsCard({ title, pros }) {
  return (
    <div className="border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900 rounded-xl p-6 my-4 w-full">
      <span>{`${title}`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

```tsx:components/ConsCard.tsx
export default function ConsCard({ title, cons }) {
  return (
    <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900 rounded-xl p-6 my-6 w-full">
      <span>{`${title}`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```
