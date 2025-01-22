+++
title = "Learning From Data Problem Set 5"
date = "2023-10-27"
description = "Learning From Data Lecture 5"
categories = [ "notes", ]
tags = [ "ml", "data", ]
series = ["Learning From Data"]
+++

[PDF of problems](https://work.caltech.edu/homework/hw5.pdf)

[Code Repository](https://github.com/lienzhuzhu/lfd)


### 1. [c]

Plugging in the values for $\mathbb{E}[E_{in}(\vec{w})] = \sigma^{2}(1 - \frac{d+1}{N}) \geq 0.008$:

$$
\begin{aligned}
\mathbb{E}[E_{in}(\vec{w})]     & =     \sigma^{2}(1 - \frac{d+1}{N}) \\ \\
                                & =     (0.1)^2(1 - \frac{9}{N}) \\ \\
0.01 - \frac{0.09}{N}           & \geq  0.008 \\ \\
0.002                           & \geq  \frac{0.09}{N} \\ \\
N                               & \geq  \frac{0.09}{0.002} \\ \\
N                               & \geq  45
\end{aligned}
$$


### 2. [d]

We need to think about how the features affect the labels of the regions.

For any given point, it seems the closer it is to the $x_1 = 0$ line, the more it tends to be positively labeled, so being further away is an attribute that would label it more negatively. So having $\tilde{w}_1 < 0$ makes sense.

It also seems the further away from $x_2 = 0$ a point is, the more it tends to be positively labeled, especially if we compare the size of the regions going up and down to infinity. So $\tilde{w}_2 > 0$.


### 3. [c]

Use the formula $\frac{Q(Q+3)}{2}$ with $Q=4$.


### 4. [e]

Just use chain rule.

$$
\begin{aligned}
\frac{\partial{E}}{\partial{u}} & = \frac{\partial{E}}{\partial{u}}(ue^v-2ve^{-u})^2 \\ \\
                                & = 2(ue^v - 2ve^{-u})(e^v + 2ve^{-u})
\end{aligned}
$$

Note that for the gradient descent implementation, we will need the other partial derivative as well, but this is just as easily calculated using chain rule, nothing crazy.


### Refer to the output for 5 and 6.

```zsh
❯ python3 hw5/descent.py
10
[0.04473629 0.02395871]
```

### 5. [d]

### 6. [e]


### 7. [a]

```zsh
❯ python3 hw5/coordinate.py
[ 6.2970759  -2.85230695]
0.13981379199615315
```


### Refer to the output for 8 and 9.

```zsh
❯ python3 hw5/logistic.py -N 100
E_out:   0.1042528510662979
Epochs:  333.6
```

### 8. [d]

### 9. [a]


### 10. [e]

The update rule for PLA is
$$
\vec{w}_t = \vec{w}_{t-1} + y_n\vec{x}_n
$$
where $(\vec{x}, y)_n$ is the misclassified point.

At first I thought the answer was [b] because the gradient of this error function would yield $-y_n\vec{w}^T\vec{x}_n$ which would fit with the SGD update rule

$$
\vec{w}_t = \vec{w}_{t-1} + \eta (-\nabla{e(\vec{w})})
$$

to get the PLA update rule.

But then I remembered, SGD goes over every point, not every point requires an update. So the adjustment must be 0 when the label and signal are in agreement, which is reflected in option [e].
