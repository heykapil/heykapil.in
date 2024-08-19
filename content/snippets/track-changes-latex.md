---
title: Track changes in latex
tags:
  - latex
logo: latex.svg
description: Track changes using latexdiff
updated: 2023-12-14T18:14
created: 2023-10-03T20:09
---

To track changes in latex, we will use the following perl script [`latexdiff`](https://www.ctan.org/tex-archive/support/latexdiff)

To compare two documents simply run `latexdiff` in the command line like so:

```bash
latexdiff draft.tex revision.tex > diff.tex
```

where `draft.tex` and `revision.tex` are original and changed versions of your document, and `diff.tex` is where the markup is stored. The above command provides latexdiff with the two comparison files and the filename for the resulting marked .tex file. If the two input files you provide are valid .tex files, the resulting `diff.tex` will also be a .tex file. This marked file can now be compiled with your choice of TeX compiler (pdfLaTeX etc.).
