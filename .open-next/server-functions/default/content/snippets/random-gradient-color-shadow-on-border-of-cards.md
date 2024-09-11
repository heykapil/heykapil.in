---
title: Card with Random Gradient Color Shadow on Border
logo: css.svg
description: Beautiful cards with gradient color shadows on border
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

Let us define some random gradient colors.

```js
const Gradient = {
  0: " from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]",
  1: " from-[#D8B4FE] to-[#818CF8]",
  2: " from-[#6EE7F9] to-[#6EE7B7]",
  3: " from-[#2E3192] to-[#1BFFFF]",
  4: " from-[#D4145A] to-[#FBB03B]",
  5: " from-[#009245] to-[#FCEE21]",
  6: " from-[#662D8C] to-[#ED1E79]",
  7: " from-[#EE9CA7] to-[#FFDDE1]",
  8: " from-[#D8B4FE] to-[#818CF8]",
  9: " from-[#FF512F] to-[#DD2476]",
  10: " from-[#C6EA8D] to-[#FE90AF]",
  11: " from-[#D8B5FF] to-[#1EAE98]",
  12: " from-[#FF61D2] to-[#FE9090]",
  13: " from-[#EE9CA7] to-[#FFDDE1]",
  14: " from-[#BFF098] to-[#6FD6FF]",
  15: " from-[#4E65FF] to-[#92EFFD]",
  16: " from-[#A9F1DF] to-[#FFBBBB]",
  17: " from-[#C33764] to-[#1D2671]",
  18: " from-[#93A5CF] to-[#E4EfE9]",
  19: " from-[#868F96] to-[#596164]",
  20: " from-[#09203F] to-[#537895]",
  21: " from-[#FFECD2] to-[#FCB69F]",
  22: " from-[#A1C4FD] to-[#C2E9FB]",
  23: " from-[#764BA2] to-[#667EEA]",
  24: " from-[#FDFCFB] to-[#E2D1C3]",
};
```

To pick any random color gradient from these,

```js
Gradient[Math.floor(Math.random() * 25)];
```

Now, create a card component

```tsx title="components/Card.tsx"
import Link from 'next/link'
import Gradient from './Gradient'


<Link href="#url">
      <a className="w-full group relative transition-all duration-500 hover:scale-[1.025] p-1">
        <div className="w-full transform transition-all">
        <div className={
                    `absolute inset-0 rounded-lg bg-gradient-to-r blur-sm transition duration-1000 group-hover:-inset-[0.5] group-hover:blur-md group-hover:duration-500`
                    +
                    Gradient[Math.floor(Math.random() * (25))
                  ]}>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 my-2 mt-4 sm:grid-cols-2 relative p-8 rounded-lg bg-gray-100 border border-neutral-200 text-gray-900 dark:bg-dark dark:text-gray-100 dark:border dark:border-neutral-800 hover:border-none">
            <div>
             Content of the Card
            </div>
        </div>
    </a>
</Link>
```
