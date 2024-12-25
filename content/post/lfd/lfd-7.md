+++
title = "Learning From Data Problem Set 7"
date = "2023-11-04T22:03:50-07:00"
# description = ""

tags = ["notes", "ml"]
+++


[PDF of problems](https://work.caltech.edu/homework/hw7.pdf)

[Code Repository](https://github.com/lienzhuzhu/lfd)



<h3>
1 - 5
</h3

Refer to the output:

```
❯ python3 hw7/validation.py
Q = 3:  K = 10. E_val = 0.300 E_out = 0.420     K = 25: E_val = 0.280 E_out = 0.396
Q = 4:  K = 10. E_val = 0.500 E_out = 0.416     K = 25: E_val = 0.360 E_out = 0.388
Q = 5:  K = 10. E_val = 0.200 E_out = 0.188     K = 25: E_val = 0.200 E_out = 0.284
Q = 6:  K = 10. E_val = 0.000 E_out = 0.084     K = 25: E_val = 0.080 E_out = 0.192
Q = 7:  K = 10. E_val = 0.100 E_out = 0.072     K = 25: E_val = 0.120 E_out = 0.196
```



<h3>
6. [d]
</h3>

We can calculate this analytically. Let $X \sim \textrm{Uniform}(0,1)$ and $Y \sim \textrm{Uniform}(0,1)$. Then $Z=\textrm{min}(X, Y)$ and

$$
\begin{aligned}
P(Z \leq z) &= P(min(X,Y) \leq z) \\\ \\\
    &= 1 - P(X>z \cap Y>z) \\\ \\\
    &= 1 - P(X>z) \cdot P(Y>z) \\\ \\\
    &= 1 - (1-z)^2
\end{aligned}
$$

We differentiate to get the PDF

$$
\begin{aligned}
\frac{d}{dz}(1-(1-z)^2) &= -2(1-z)(-1) \\\ \\\
    &= 2(1-z) \\\ \\\
\end{aligned}
$$

Then find the expectation using the definition of expected value

$$
\begin{aligned}
\mathbb{E}(Z) &= \int_0^1 z \cdot 2(1-z) dz \\\ \\\
    &= 2\int_0^1 z - z^2 dz \\\ \\\
    &= 2\left[\left.\frac{1}{2}z^2 - \frac{1}{3}z^3 \right|^1_0\right] \\\ \\\
    &= \frac{1}{3}
\end{aligned}
$$



<h3>
7. [c]
</h3>


We need to find expressions for the cross-validation errors for each hypothesis set.

$$
E_{CV}(h_0) = \frac{1}{3}\left[e_1(h_0) + e_2(h_0) + e_3(h_0)\right]
$$

$e_1(h_0)$: Train on $(\rho,1)$ and $(1,0)$.
$$
g^-_1(x,y) = 0.5
$$

Then
$$
e_1(h_0) = (0-0.5)^2 = \frac{1}{4}
$$

Following this process, $e_2(h_0) = 1$ and $e_3(h_0) = \frac{1}{4}$.

Then we obtain
$$
\begin{aligned}
E_{CV}(h_0) &= \frac{0.25 + 1 + 0.25}{3} \\\ \\\
    &= \frac{1}{2}
\end{aligned}
$$

The process for $h_1$ is a bit more involved because we need to find expressions for some lines.

For $e_1(h_1)$, we obtain the slope of the line through $(\rho,1)$ and $(1,0)$
$$
m = \frac{1-0}{\rho - 1} = \frac{1}{\rho - 1} \\\
$$

Which means the line through these points is
$$
y = \frac{x-1}{\rho - 1}
$$

Now we need the error on the validation point $(-1,0)$
$$
\begin{aligned}
e_1(h_1) &= \left(0 - (\frac{-1-1}{\rho -1})\right)^2 \\\ \\\
    &= \frac{4}{(\rho -1)^2}
\end{aligned}
$$


We follow this process to get $e_2(h_1)$ and $e_3(h_1)$
$$
e_2(h_1) = 1 \textrm{ and } e_3(h_1) = \frac{4}{(\rho +1)^2}
$$


Now we are ready to find $\rho$.

$$
\begin{aligned}
E_{CV}(h_0) &= E_{CV}(h_1) \\\ \\\
\frac{1}{2} &= \frac{1}{3}\left[\frac{4}{(\rho -1)^2} + 1 + \frac{4}{(\rho +1)^2}\right] \\\ \\\
\frac{(\rho +1)^2 + (\rho -1)^2}{(\rho -1)^2(\rho +1)^2} &= \frac{1}{8} \\\ \\\
(\rho+1)^2 - \frac{1}{8}(\rho +1)^2(\rho -1)^2 + (\rho -1)^2 &= 0
\end{aligned}
$$

At this point I just plugged into a graphing calculator and found the positive zero at $\sqrt{9+4\sqrt{6}}$.



<h3>
8. [c]
</h3>

```
❯ python3 hw7/lin_svm.py -N 10
PLA E_out:               0.10657499999999999
SVM E_out:               0.088106
Primal E_out:            0.08810400000000002
Dual E_out:              0.08813800000000001

Support Vectors:         2.836 support vectors
Primal Vectors:          2.827 support vectors
Dual Vectors:            2.879 support vectors

SVM won                  0.623 times
Primal won               0.624 times
Dual won                 0.625 times
```



<h3>
For 9 and 10.
</h3>

```
❯ python3 hw7/lin_svm.py -N 100
PLA E_out:               0.013668000000000003
SVM E_out:               0.010621
Primal E_out:            0.010623
Dual E_out:              0.010740000000000001

Support Vectors:         3.0 support vectors
Primal Vectors:          2.998 support vectors
Dual Vectors:            3.151 support vectors

SVM won                  0.6 times
Primal won               0.6 times
Dual won                 0.598 times
```

<h3>
9. [d]
</h3>

Though, I noticed SVM wins very close to 60% of the time, sometimes going under 60%, so it's between [c] and [d]. The SVM hyperplane obtained from the primal problem solution seems to track the libsvm hyperplane better than the dual solution.

<h3>
10. [b]
</h3>

[Next Post](../lfd-8)
