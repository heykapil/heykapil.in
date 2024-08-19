---
title: Hindi in LaTeX
logo: latex.svg
description: Typesetting your latex document in other language
tags:
  - latex
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---


Install required font from web into your local device. Here in this example, i have installed `Lohit Devanagari.ttf` font for typesetting Hindi and Sanskrit.  
```latex
\documentclass[11pt]{article}
\usepackage{polyglossia}
\setdefaultlanguage{english}
\setotherlanguage{hindi,sanskrit}
% Hindi and Sanskrit both uses same font Devanagari
\usepackage{fontspec}
\setmainfont{Times New Roman}
\newfontfamily{\devanagarifont}[Script=Devanagari]{Lohit Devanagari.ttf}

\begin{document}

\begin{hindi} 
...
\end{hindi}
% inline
\texthindi{}


% for sanskrit
\begin{sanskrit}
...
\end{sanskrit}

%inline
\textsanskrit{}

\end{document}
```

Compile using `xelatex` engine.
