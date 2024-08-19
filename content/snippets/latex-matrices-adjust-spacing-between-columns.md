---
title: Matrices adjust column spaces
description: Short code for adjusting column space in matrices.
logo: latex.svg
tags:
  - latex
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

```latex
\begin{align}
\begingroup
    % sets length between columns five points.
	\setlength\arraycolsep{5pt}
     \begin{bmatrix}
     ...
     \end{bmatrix}
\endgroup
\end{align}
```
