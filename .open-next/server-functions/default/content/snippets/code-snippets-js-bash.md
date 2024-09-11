---
id: 587e2682c9ca1229697538c75642c9c60174139fef0b0e2acd7405b5b7bb579c
description: code snippets important
logo: tsx.svg
tags:
  - database
  - Next.js
created: 2024-01-24T18:14
updated: 2024-01-24T18:14;
archived: true
title: Some import code bash and js snippets
---

The collection of the important snippets.

```bash
  openssl rand -hex 32
```

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "foo");
});
Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```
