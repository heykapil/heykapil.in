---
title: python bifurcation
description: A short command to crop inserted image in latex
tags:
  - python
logo: python.svg
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

```python title="bifurcation.py"
from pylab import *
Dt = 0.01
def initialize():
  global x, xresult, y, yresult
  x = y = 0.1
  xresult = [x]
  yresult = [y]
def observe():
  global x, xresult, y, yresult
  xresult.append(x)
  yresult.append(y)
def initialize():
  global x, xresult, y, yresult
  x = y = 0.1
  xresult = [x]
  yresult = [y]
def observe():
  global x, xresult, y, yresult
  xresult.append(x)
  yresult.append(y)
def update():
  global x, xresult, y, yresult
  nextx= x + y*Dt
  nexty= y + (-r*(x**2 - 1)* y - x)*Dt
  x, y = nextx, nexty
def plot_phase_space():
  initialize()
  for t in range(10000):
    update()
    observe()
  plot (xresult, yresult)
  axis ('image')
  axis([-3, 3, -3, 3])
  title('r = ' + str(r))
rs = [- 1, - 0.1, 0, 0.1, 1]
for i in range(len(rs)):
  subplot(1, len (rs), i + 1 )
  r = rs[i]
  plot_phase_space()
show ()
```

Credits: [MathLibreText](<https://math.libretexts.org/Bookshelves/Scientific_Computing_Simulations_and_Modeling/Book%3A_Introduction_to_the_Modeling_and_Analysis_of_Complex_Systems_(Sayama)/08%3A_Bifurcations/8.03%3A_Hopf_Bifurcations_in_2-D_Continuous-Time_Models>)
