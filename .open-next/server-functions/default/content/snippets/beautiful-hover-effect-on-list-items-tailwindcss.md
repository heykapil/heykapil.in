---
id: FwjLQ68ChmMxY6OWJfid
title: Beautiful hover effect on list items
description: Na.
datetimeCreate: 2023-01-21 14:31:13
datetimeUpdate: 2023-01-21 17:24:18
logo: next.svg
created: 2023-01-21T18:14
updated: 2023-01-21T18:14
---

```tsx
<section className="group/section">
  <div className="group-hover/section:text-zinc-400 dark:group-hover/section:text-[#656565]">
    {allSnippets.map((post) => (
      <Link
        key={post.slug}
        className="flex flex-col space-y-1 mb-4 group/item hover:text-black dark:hover:text-white  transition duration-[250ms] ease-out hover:duration-[50ms]"
        href={`/snippet/${post.slug}`}
      >
        <div className="w-full flex flex-col">
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis tracking-tight">
            {post.metadata.title}
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>
```
