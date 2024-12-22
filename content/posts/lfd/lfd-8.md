+++
title = "Learning From Data Problem Set 8"
date = "2023-11-10T17:17:05-08:00"
# description = ""

tags = ["notes", "ml"]
+++

[PDF of problems](https://work.caltech.edu/homework/hw8.pdf)

[Code Repository](https://github.com/lienzhuzhu/lfd)


<h3>
1. [d]
</h3>

With the primal problem solves for the weights and the bias term directly, which makes $d+1$ variables of interest.


<h3>
For 2 - 4.
</h3>

```
❯ python3 hw8/poly_svm.py
0 versus all  E_in: 0.10588  E_out: 0.11161  SVs: 2179
1 versus all  E_in: 0.01440  E_out: 0.02192  SVs: 386
2 versus all  E_in: 0.10026  E_out: 0.09865  SVs: 1970
3 versus all  E_in: 0.09025  E_out: 0.08271  SVs: 1950
4 versus all  E_in: 0.08943  E_out: 0.09965  SVs: 1856
5 versus all  E_in: 0.07626  E_out: 0.07972  SVs: 1585
6 versus all  E_in: 0.09107  E_out: 0.08470  SVs: 1893
7 versus all  E_in: 0.08847  E_out: 0.07324  SVs: 1704
8 versus all  E_in: 0.07434  E_out: 0.08271  SVs: 1776
9 versus all  E_in: 0.08833  E_out: 0.08819  SVs: 1978
```

<h3>
2. [a]
</h3>


<h3>
3. [a]
</h3>

<h3>
4. [c]
</h3>

$$
2179 - 386 = 1793
$$



<h3>
For 5 and 6.
</h3>

```
❯ python3 hw8/poly_svm.py --digit=1 --other=5
Q = 2
C = 0.0001      1 versus 5  E_in: 0.00897  E_out: 0.01651  SVs: 236
C = 0.0010      1 versus 5  E_in: 0.00448  E_out: 0.01651  SVs: 76
C = 0.0100      1 versus 5  E_in: 0.00448  E_out: 0.01887  SVs: 34
C = 0.1000      1 versus 5  E_in: 0.00448  E_out: 0.01887  SVs: 24
C = 1.0000      1 versus 5  E_in: 0.00320  E_out: 0.01887  SVs: 24

Q = 5
C = 0.0001      1 versus 5  E_in: 0.00448  E_out: 0.01887  SVs: 26
C = 0.0010      1 versus 5  E_in: 0.00448  E_out: 0.02123  SVs: 25
C = 0.0100      1 versus 5  E_in: 0.00384  E_out: 0.02123  SVs: 23
C = 0.1000      1 versus 5  E_in: 0.00320  E_out: 0.01887  SVs: 25
C = 1.0000      1 versus 5  E_in: 0.00320  E_out: 0.02123  SVs: 21
```

<h3>
5. [d]
</h3>

<h3>
6. [b]
</h3>



<h3>
For 7 and 8.
</h3>

```
❯ python3 hw8/cv_poly_svm.py --digit=1 --other=5
The model with the most selections is C = 0.001
1 versus 5
E_cv:   0.004760
E_out:  0.016509
SVs:    76
```

<h3>
7. [c]
</h3>

<h3>
8. [c]
</h3>



<h3>
For 9 and 10.
</h3>

```
❯ python3 hw8/rbf_svm.py --digit=1 --other=5
C = 0.01        1 versus 5  E_in: 0.00384  E_out: 0.02358  SVs: 406
C = 1.00        1 versus 5  E_in: 0.00448  E_out: 0.02123  SVs: 31
C = 100.00      1 versus 5  E_in: 0.00320  E_out: 0.01887  SVs: 22
C = 10000.00    1 versus 5  E_in: 0.00256  E_out: 0.02358  SVs: 19
C = 1000000.00  1 versus 5  E_in: 0.00064  E_out: 0.02358  SVs: 17
```

<h3>
9. [e]
</h3>

<h3>
10. [c]
</h3>

[Next Post](../lfd-final)
