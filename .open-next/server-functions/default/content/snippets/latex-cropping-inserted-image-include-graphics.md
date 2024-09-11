---
title: Crop inserted image in LaTeX
description: A short command to crop inserted image in latex
logo: latex.svg
tags:
  - latex
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

```latex
\includegrahics[trim={<left> <lower> <right> <upper>},clip]{path-to-image}
```

```latex title="example.tex"
\documentclass{article}

\usepackage{graphicx}

\begin{document}
...

\begin{figure}[...]
    ...
     % trim 5cm from left edge
    \includegraphics[trim={5cm 0 0 0},clip]{path-to-image}
    % trim 5cm from right edge
    \includegraphics[trim={0 0 5cm 0},clip]{path-to-image}
      \caption{default}
      \label{default}
    ...
\end{figure}
...
\end{document}
```
