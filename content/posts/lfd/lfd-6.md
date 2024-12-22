+++
title = "Learning From Data Problem Set 6"
date = "2023-11-02T01:43:16-07:00"
# description = ""

tags = ["notes", "ml"]
+++


[PDF of problems](https://work.caltech.edu/homework/hw6.pdf)

[Code Repository](https://github.com/lienzhuzhu/lfd)


<h3>
1. [b]
</h3>

On average, the smaller hypothesis set will have a higher bias term, which corresponds to deterministic noise. It is true, however, that the smaller hypothesis set would have a decrease in variance that overwhelms the increase in bias.



<h3>
Use the following output for problems 2 - 6
</h3>

```
❯ python3 hw6/regularization.py
E_in with no regularization:     0.02857142857142857
E_out with no regularization:    0.084
K = -3,  E_in = 0.028571        E_out = 0.080000
K = -2,  E_in = 0.028571        E_out = 0.084000
K = -1,  E_in = 0.028571        E_out = 0.056000
K = 0,   E_in = 0.000000        E_out = 0.092000
K = 1,   E_in = 0.057143        E_out = 0.124000
K = 2,   E_in = 0.200000        E_out = 0.228000
K = 3,   E_in = 0.371429        E_out = 0.436000
```

<h3>
2. [a]
</h3>

This is sort of the baseline performance.

<h3>
3. [d]
</h3>

Small regularization parameter $\lambda$ corresponds to a large $C$, which barely applies any regularization. So, we get similar results to baseline.

<h3>
4. [e]
</h3>

Too much regularization leads us to underfit the data and target.

<h3>
5. [d]
</h3>

This is just enough regularization.

<h3>
6. [b]
</h3>

When $k=-1$, we get an $E_{out}$ of around $0.056$.


<h3>
7. [c]
</h3>

$$
\begin{aligned}
\mathcal{H}(10, 0, 3) &= w_0L_0 + w_1L_1 + w_2L_2 + 0 + \dots + 0 \\\
\mathcal{H}(10, 0, 4) &= w_0L_0 + w_1L_1 + w_2L_2 + w_3L_3 + 0 + \dots + 0 \\\
\end{aligned}
$$

The intersection of these sets will clearly just be the first 3 terms of $\mathcal{H}(10, 0, 3)$, which is the same as $\mathcal{H}_2$. The union of these is not $\mathcal{H}_4$ because that would require an $L_4$ term to survive, but it perishes in the union.


<h3>
8. [d]
</h3>

The operation $w_{ij}^{(l)}x_i^{(l-1)}$ is only used in forward propagation and does not appear in backpropagation.

There are $22$ total unique weights in this network and each will be updated during backpropagation. The $w_{ij}^{(l)}\delta_j^{(l)}$ term is used to get $\delta_i^{(l-1)}$ while $x_i^{(l-1)}\delta_j^{(l)}$ terms are used in the weight update step of SGD.

There are $22$ weights and $2$ types of operations of interest, so we would see $44$ of these operations.


<h3>
9. [a]
</h3>

We can achieve the minimum number of weights, or connections, by making each hidden layer have a single dimension. This would result in $10$ weights between the input layer and the first hidden layer, with $36$ weights from the first hidden layer to the final output layer.


<h3>
10. [e]
</h3

If laying all the units in a line yields the minimum, surely the opposite would give us the maximum right? Not exactly. If we have one hidden layer with $36$ units, then we get
$$
10 \times 35 + 36 \times 1 = 350 + 36 = 386 \textrm{ weights}
$$

which is far from what we can get with two hidden layers, each with $18$ units each

$$
10 \times 17 + 18 \times 17 + 18 \times 1 = 170 + 306 + 18 = 494 \textrm{ weights}
$$

So, I brute forced from two layers and reached $510$ with $22$ units in the first hidden layer and $14$ in the second

$$
10\times21 + 22\times13 + 14 = 210 + 286 + 14 = 510 \textrm{ weights}
$$

Note that the bias term has no weights going into it.

I have no idea how to do this analytically with optimization. Luckily, $510$ is the largest answer choice and using quadratic programming we get the following solution:

```
❯ python3 hw6/edges.py
L1 =  22
L2 =  14
Z =  510
```

Though we get kind of lucky here because this is non linear quadratic programming applied to a linear quadratic programming problem.

[Next Post](../lfd-7)
