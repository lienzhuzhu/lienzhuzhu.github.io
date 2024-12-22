+++
title = "Learning From Data Problem Set 1"
date = "2023-10-19T19:49:57-07:00"
# description = ""

tags = ["notes", "ml"]
+++


[PDF of problems](https://work.caltech.edu/homework/hw1.pdf)

[Code Repository](https://github.com/lienzhuzhu/lfd)


<h3>
1. [d]
</h3>

Scenario $(\texttt{i})$ is a design problem. Scenario $(\texttt{ii})$ is the typical supervised learning problem like the perceptron introduced in the first chapter. Scenario $(\texttt{iii})$ describes a reinforcement learning because it describes an agent learning to play a game with a reward or cost function.


<h3>
2. [a]
</h3>

$(\texttt{i})$ and $(\texttt{iii})$ describe problems where a mathematical equation can be found to describe the solution. So by process of elimination, the answer is [a].


<h3>
3. [d]
</h3>

This is a conditional probability and Baye's theorem problem with perhaps one more layer than most introductory stats classes will ask about because the probability of drawing a second black ball is dependent on the initial selection of a bag.

We have:

$$
P(\textrm{Second ball drawn is black } | \textrm{ First ball drawn is black}) = \frac{P(\textrm{Second ball drawn is black } \cap \textrm{ First ball drawn is black})}{P(\textrm{First ball drawn is black})}
$$


Okay, so what is the probability of drawing two black balls in a row? Well, the bag chosen must be the one with two black, which has a probability of $\frac{1}{2}$ of being chosen, then the probability from that point is 1. So the probability along that branch is $\frac{1}{2} \cdot 1$

The probability of drawing a black ball on the first draw is $\frac{1}{2} \cdot 1 + \frac{1}{2} \cdot \frac{1}{2}$. The first term is the same as the previous calculation, and the second term comes from the probability of drawing a black ball after choosing the half and half bag.

All together now:

$$
\begin{aligned}
P(\textrm{Second ball drawn is black } | \textrm{ First ball drawn is black})   & = \frac{\frac{1}{2}}{\frac{1}{2} \cdot 1 + \frac{1}{2} \cdot \frac{1}{2}} \\\ \\\
                                                                                & = \frac{2}{3}
\end{aligned}
$$


<h3>
4. [b]
</h3>

Use binomial distribution. Let $X \sim \text{Binom}(10, 0.55)$. Then the $P(X = 0)$ can be calculated:

$$
\begin{aligned}
P(X = 0)    & = \binom{10}{0}(0.55)^0(0.45)^10 \\\ \\\
            & = 3.405 \times 10^{-4}
\end{aligned}
$$


<h3>
5. [c]
</h3>

We again have to use binomial distribution, but craft our random variable carefully. We have to zoom out and rethink our definition of a Bernoulli trial. Let's have $Y$ be the number of samples (or experiments) of 10 marble draws that have a $\nu$ of 0, in other words, 0 red marbles out of 10 drawn.

Then, we can have $Y \sim \text{Binom}(1000, 3.405 \times 10^{-4})$ since we calculated the probability of any one sample having 0 red marbles out of 10 in the last problem.

$$
\begin{aligned}
P(Y \geq 1) & = 1 - P(Y = 0) \\\ \\\
            & = 1 - \binom{1000}{0}(3.405 \times 10^{-4})^0(1 - 3.405 \times 10^{-4})^{1000} \\\ \\\
            & = 0.2886
\end{aligned}
$$


<h3>
6. [e]
</h3>

Below is a table describing the remaining data points and the 8 possible target functions:

$$
\begin{array}{|c|c|c|c|c|c|c|c|c|}
\hline
x_n & f_1 & f_2 & f_3 & f_4 & f_5 & f_6 & f_7 & f_8 \\\
\hline
\text{1 0 1} & 0 & 0 & 0 & 0 & 1 & 1 & 1 & 1   \\\
\text{1 1 0} & 0 & 0 & 1 & 1 & 0 & 0 & 1 & 1   \\\
\text{1 1 1} & 0 & 1 & 0 & 1 & 0 & 1 & 0 & 1   \\\
\hline
\end{array}
$$


Now let's analyze each option for $g$:

[a]. $g(x_n) = 
\begin{bmatrix}
1 \\\
1 \\\
1
\end{bmatrix}
$

This $g$ matches $f_8$ for 3 points, $f_4$, $f_6$, $f_7$ for 2 points, and $f_2$, $f_3$, $f_5$ for 1 point. This is a total of **12** points.


[b]. $g(x_n) = 
\begin{bmatrix}
0 \\\
0 \\\
0
\end{bmatrix}
$

This $g$ matches $f_1$ for 3 points, $f_2$, $f_3$, $f_5$ for 2 points, and $f_4$, $f_6$, $f_7$ for 1 point. This is a total of **12** points.

[a] and [b] have the same score. So, we conclude that [e] must be the correct answer.



<h3>
Refer to the following output for 7 and 8. The graphs drawn are for the final experimental trial.
</h3>

```
❯ python3 hw1/pla.py -N 10
Iterations: 9.75
Disagreement: 0.106781
```

<h3>
7. [b]
</h3>

<h3>
8. [c]
</h3>



<h3>
Refer to the following output for 9 and 10.
</h3>

```
❯ python3 hw1/pla.py -N 100
Iterations: 110.169
Disagreement: 0.013299000000000004
```

<h3>
9. [b]
</h3>

<h3>
10. [b]
</h3>

[Next Post](../lfd-2)
