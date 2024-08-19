---
title: Grainy Background
logo: css.svg
tags:
  - svg
  - mdx
description: Beautiful Grainy Background using svg
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
private: true
---

Credits to [Pedro Duarte](https://ped.ro) and [Delba](https://delba.dev) for this.

```tsx showLineNumbers {1-3,5,6} {"id"}
<svg
  className="pointer-events-none fixed top-0 left-0 isolate z-50 opacity-25 dark:opacity-[0.15] mix-blend-normal"
  width="100%"
  height="100%"
>
  <filter id="pedroduarteisalegend">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.80"
      numOctaves="4"
      stitchTiles="stitch"
    />
    <feColorMatrix type="saturate" values="0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#pedroduarteisalegend)"></rect>
</svg>
```

The background effect is awesome, you can feel on this site.
