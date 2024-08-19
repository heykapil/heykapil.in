---
title: Markdown to html using Texme
logo: mdx.svg
description: Texme can render markdown with math to html
tags:
  - mdx
  - mathjax
  - html
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

## Procedure

Suppose you have some markdown document with math in it.

```markdown
## Billinear forms

1. Write down the following billinear forms in vector matrix notation $uAv^{T}$.
   - $\phi(u,v) = 3x_1y_1 -2x_1y_3 +5x_2y_1+7x_2y_2-8x_2y_3+4x_3y_2-6x_3y_3$.
   - $\phi(u,v) = -5x_1y_1 +6x_1y_2 -2x_1y_3+3x_2y_2-6x_2y_3$.
   - $\phi(u,v) = 2x_1y_3 -3x_3y_1+4x_3y_4$.
   - $\phi(u,v) = 4x_1y_1+2x_1y_2-2x_2y_1+3x_2y_2$.
   - $\phi(u,v) = 2x_1y_1-3x_1y_3+2x_2y_2$.

and so on...
```

Now to render the markdown to the the html, add the below code that loads texme javascript just above the markdown and save the file with `.html` extension.

```html title="filename.html" {1-5}
<!DOCTYPE html>
<title>Title of the Page</title>
<!-- <script>window.texme = { style: 'plain' }</script> -->
<script src="https://heykapil.in/script/texme@1.2.2.js"></script>
<textarea>

## Billinear forms

1. Write down the following billinear forms in vector matrix notation $uAv^{T}$.
    - $\phi(u,v) = 3x_1y_1 -2x_1y_3 +5x_2y_1+7x_2y_2-8x_2y_3+4x_3y_2-6x_3y_3$.
    - $\phi(u,v) = -5x_1y_1 +6x_1y_2 -2x_1y_3+3x_2y_2-6x_2y_3$.
    - $\phi(u,v) = 2x_1y_3 -3x_3y_1+4x_3y_4$.
    - $\phi(u,v) = 4x_1y_1+2x_1y_2-2x_2y_1+3x_2y_2$.
    - $\phi(u,v) = 2x_1y_1-3x_1y_3+2x_2y_2$.

 and so on...
```

This will be rendered as [here](/html/practice-questions.html)

## Styling
