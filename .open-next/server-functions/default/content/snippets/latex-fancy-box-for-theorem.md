---
title: Fancy theorem boxes in LaTeX
logo: latex.svg
description: Creating beautiful fancy theorem/lemma boxes for beamer presentation.
tags:
  - latex
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

We will make use of `mdframed` package.

```latex
\usepackage{mdframed,amsthm,tikz}
```

Setting the counter according to sections. Input this code in preamble.

```latex title="preamble.tex"
\newcounter{theo}[section]\setcounter{theo}{0}
\renewcommand{\thetheo}{\arabic{section}.\arabic{theo}}
\newenvironment{theo}[2][]{%
\refstepcounter{theo}%
\ifstrempty{#1}%
{\mdfsetup{%
frametitle={%
\tikz[baseline=(current bounding box.east),outer sep=0pt]
\node[anchor=east,rectangle,fill=blue!30]
{\strut Theorem~\thetheo};}}
}%
{\mdfsetup{%
frametitle={%
\tikz[baseline=(current bounding box.east),outer sep=0pt]
\node[anchor=east,rectangle,fill=blue!50]
{\strut Theorem~\thetheo:~#1};}}%
}%
\mdfsetup{innertopmargin=10pt,linecolor=blue!50,%
linewidth=1pt,topline=true,%
frametitleaboveskip=\dimexpr-\ht\strutbox\relax
}
```

Now, the theorem box can be made by simply inserting

```latex
\begin{thetheo}

The statement of theorem

\end{thetheo}
```
