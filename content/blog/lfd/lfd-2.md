+++
author = "Lien Zhu"
title = "Learning From Data Problem Set 2"
date = "2023-10-20"
description = "Learning From Data Lecture 2"
categories = [ "notes", ]
tags = [ "ml", "data", ]
series = ["Learning From Data"]
+++


[PDF of problems](https://https://work.caltech.edu/homework/hw2.pdf)

[Code Repository](https://github.com/lienzhuzhu/lfd)


### Refer to the code repository above for problems 1 and 2.

```zsh
❯ python3 hw2/coin.py
Average value of ν_min: 0.037552
```

### 1. [b]

I get something in the range $[0.03, 0.04]$ for the average value of $\nu_{min}$ so the correct answer is pretty close to being 0.1 but alas it is still correct to say 0.01.


### 2. [d]

The graphs show us that the $c_{min}$ coin is not bounded by the Hoeffding bound as we would expect. This makes sense because the Hoeffding inequality only applies to situations where we decide on a strategy before working on the data. In the learning problem, we pick $g$ based on the performance of many $h$'s on the dataset.



### 3. [e]

The key point of the concept of noise is that sometimes $y \neq f(\vec{x})$, or in other words, $y$ does not correspond the $f(\vec{x})$ completely. 

We want to find $P(h(\vec{x}) \neq y)$. We know that $y = f(\vec{x})$ with probability $\lambda$ and does not match $f(\vec{x})$ with a probability of $1-\lambda$. We want to add together the probabilities of the instances where $h(\vec{x}) \neq y$, which is when $h(\vec{x}) = f(\vec{x})$ but $y \neq f(\vec{x})$, and $h(\vec{x}) \neq f(\vec{x})$ but $y = f(\vec{x})$.

Now that we've broken the question down, it becomes easier to put some math to it:

$$
\begin{aligned}
P(h(\vec{x}) \neq y)    & = P(y = f(\vec{x}) \cap h(\vec{x}) \neq f(\vec{x})) + P(y \neq f(\vec{x}) \cap h(\vec{x}) = f(\vec{x})) \\\
                        & = \lambda \mu + (1-\lambda)(1-\mu)
\end{aligned}
$$


### 4. [b]

When $\lambda = 0.5$, the correspondence between $y$ and $f(\vec{x})$ is basically random.


### Refer to the following output for 5 - 7.

```zsh
❯ python3 hw2/linregression.py -N 100
Iterations: 92.548
E_in actual: 0.0368600000
E_out estimate: 0.046408
```

```zsh
❯ python3 hw2/linregression.py -N 10
Iterations: 3.533
E_in actual: 0.0248000000
E_out estimate: 0.113239
```

### 5. [c]

### 6. [c]

### 7. [a]



Refer to the following output for 8 - 10.

```zsh
❯ python3 hw2/transform.py -N 1000
E_in actual: 0.5050290000
E_out estimate: 0.5175489999999999
Average Weights 0.04570844180055819, 0.0016592000474898905, -0.00043616224075597215
```

```zsh
❯ python3 hw2/transform.py -N 1000 --transform
E_in actual: 0.1236600000
E_out estimate: 0.125843
Average Weights -0.9927863729005009, -0.0003033668427597578, 0.001665119377568957, -0.000659864590567796, 1.5606316940261602, 1.558196435074335
```

### 8. [d]

`python3 hw2/transform.py -N 1000` has E_in really close to $0.5$.

The graph shows the original data points and the regression line from the last trial.


### 9. [a]

`python3 hw2/transform.py -N 1000 --transform` has the $1.5$ coefficients on the last two terms which affect the result the most, so I selected [a].


### 10. [b]
