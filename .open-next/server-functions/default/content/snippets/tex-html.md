---
title: TeX to html
logo: latex.svg
description: Convert latex documents to beautiful web browsing
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

We will make use of make4ht and pdf2svg to convert the tex document to web html.

1. Convert all the images (xyz-eps-converted-to-pdf.pdf) to svg/png formats. we will use a bash script [prep.sh](/prep.sh) that uses pdf2svg to convert images to svg format. The following command converts all the pdfs inside `figures` folder to `svg`.

   ```bash
   bash prep.sh "figures/*.pdf"
   ```

```bash
# prep.sh
#!/bin/bash
  set -x
  for file in $1; do
  filename=${file%.*}
  pdfcrop --margins 10 --clip "$filename.pdf" "$filename.pdf"
  pdf2svg "$filename.pdf" "$filename.svg"
  done
```

2. Conversion of tex to html

Now run the following command that will convert `example.tex` to a html file `example.html` along with `example.css`.

- with mathjax (preferred)
  ```bash
  make4ht -f html5 example.tex "mathjax"
  ```
- without mathjax (using svgs for images) or using custom configuration file [my.cfg](/my.cfg)
  ```bash
  make4ht --lua -u -c my.cfg -e main.mk4 example.tex "htm,pic-align,notoc*"
  ```

3. Debug the html file

- if content after image is shrinking, search for `<figure>` commands and replace those with `<div>`.
- use svgs for image sources and fix sizes of `<img>`.
- fix references and labels `\label{label1}` for labeling and `\(\ref{label1}\)` for equations references.
- Custom stylesheet (why not? )

  ```html
  <link
    rel="stylesheet"
    type="text/css"
    href="http://cdn1.netlify.app/resources.css"
  />
  ```

- Make long mathjax equations responsive for mobile.

  ```css
  html,
  body {
    overflow-x: hidden;
    padding: 0.25em;
  }
  mjx-container[display="true"] {
    overflow-x: auto !important;
    overflow-y: hidden !important;
    max-width: 100% !important;
  }
  @media only screen and (max-width: 600px) {
    .MathJax_Display,
    .MJXc-display,
    .MathJax_SVG_Display {
      padding: 0.25em;
      overflow-x: auto !important;
      overflow-y: hidden;
    }
    .MathJax {
      min-width: 0 !important;
      /* padding: 8px 7px 5px 15px; */
      border-radius: 7px;
    }
    :root {
      --scroll-bar-color: #c5c5c5;
      --scroll-bar-bg-color: #f6f6f6;
    }
    ::-webkit-scrollbar-corner {
      background: rgba(0, 0, 0, 0.5);
    }

    * {
      scrollbar-width: thin;
      scrollbar-color: var(--scroll-bar-color) var(--scroll-bar-bg-color);
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    *::-webkit-scrollbar-track {
      background: var(--scroll-bar-bg-color);
    }

    *::-webkit-scrollbar-thumb {
      background-color: var(--scroll-bar-color);
      border-radius: 20px;
      border: 3px solid var(--scroll-bar-bg-color);
    }
  }
  ```

Here is the result of my first paper that i convered from tex to [paper.html](https://heykapil.in/paper1/ch12.html).
