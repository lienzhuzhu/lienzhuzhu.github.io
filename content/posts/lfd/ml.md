+++
title = "Learning From Data Book Notes"
date = "2023-10-18T19:49:57-07:00"
# description = ""

tags = ["notes", "ml"]
+++


<h3>Linear Regression To Obtain A Perceptron</h3>

The lectures mentioned using the analytic linear regression algorithm to obtain a perceptron, or at least an initial weight vector, but it wasn't immediately obvious to me from the language of the video how we fit the data with the added dimension of the output, particularly because if you look at a perceptron, it splits the points in half, it doesn't go through them as we expect for a linear regression line of best fit.

The lecture describes the process at a high level but I want to elaborate on what it looks like at a lower level. A problem with two features has points in $\mathbb{R}^2$ and the labels are denoted using plus signs and crosses or whatnot, but when using linear regression we need to consider the label as a real number output. So we do just that and plot the points in the $XY$ plane against +1 and -1 as outputs. Then we fit a hyperplane which in this case will be a plane that goes through the points as best as possible, a plane in this case because now we are in $\mathbb{R}^4$ thanks to the added dimension of the output. But where's our perceptron? We need to take the $Z=0$ or $XY$ plane and intersect it with the plane of best fit to find our perceptron, which is a hyperplane in the dimension one smaller than when we had the labels as outputs, since in classification we denote the label using some indicator like symbols or color.

That is where the perceptron can be found using linear regression. The intersection of two planes is generally going to be a line, unless they are parallel or have a shared basis. The plane $z = 0$ is the threshold $y = 0$.


<h3>Perceptron Weight Vector Is Normal To The Perceptron</h3>

The perceptron is basically the equation $x_1w_1 + x_2w_2 + \dots + x_dw_d + x_{d+1}w_{d+1} = 0$, so every $\vec{x}$ that satisfies this equation is in the the separating plane or line. But the inner product of every such vector with the weight vector is 0, which means $\vec{w} \perp \\{\vec{x} : \vec{x} \in \textrm{ perceptron}\\}$.


<h3>Loosening the Hoeffding Inequality for $g$</h3>

The Hoeffding Inequality for any particular hypothesis $h$ bounds the deviation between $E_{in}$ and $E_{out}$ as
$$
\mathbb{P}(|E_{in}(h) - E_{out}(h)| > \epsilon) \leq 2e^{-2\epsilon^2N}
$$


**Small problem**

When bounding the approximation of $E_{out}(g)$ by $E_{in}(g)$, we cannot just plug in $g$ for $h$. This is because $g$ is selected after applying the hypothesis set $\mathcal{H}$ onto the data, so $g$ is cherry-picked based on performance of the hypotheses. 

Instead, we have to use the implication and addition rule of probability. 

**The solution**

If $A \implies B$, then $\mathbb{P}(A) \leq \mathbb{P}(B)$, since event $B$ always occurs whenever $A$ occurs, but may also occur when $A$ does not occur.

Also, $\mathbb{P}(A \cup B) = \mathbb{P}(A) + \mathbb{P}(B) - \mathbb{P}(A \cap B)$ by the addition rule of probability. In fact, we can derive what's called the _Union Bound_ from this rule:

$$
\begin{aligned}
\mathbb{P}(A \cup B)    & =     \mathbb{P}(A) + \mathbb{P}(B) - \mathbb{P}(A \cap B) \\\
                        & \leq  \mathbb{P}(A) + \mathbb{P}(B)
\end{aligned}
$$

Basically, if $A$ and $B$ are disjoint, then by definition $\mathbb{P}(A \cap B) = 0$, $i.e.$ there is no overlap between $A$ and $B$. This means in general, the union of any two events, disjoint or not, is less than or equal the probability of the disjoint case.

**Translating to our problem**

Because $g$ is one of the $h_M$'s, we know this implication holds true:

$$
|E_{in}(g) - E_{out}(g)| > \epsilon \quad\implies\quad |E_{in}(h_1) - E_{out}(h_1)| > \epsilon \textbf{ or } |E_{in}(h_2) - E_{out}(h_2)| > \epsilon \dots \textbf{ or } |E_{in}(h_M) - E_{out}(h_M)| > \epsilon \\\ \\\
$$

$$
\therefore \mathbb{P}(|E_{in}(g) - E_{out}(g)| > \epsilon) \quad\leq\quad \mathbb{P}[|E_{in}(h_1) - E_{out}(h_1)| > \epsilon \textbf{ or } |E_{in}(h_2) - E_{out}(h_2)| > \epsilon \dots \textbf{ or } |E_{in}(h_M) - E_{out}(h_M)| > \epsilon]
$$


The RHS of that expression follows the addition rule:
$$
\begin{aligned}
\mathbb{P}[|E_{in}(h_1) - E_{out}(h_1)| > \epsilon \textbf{ or } |E_{in}(h_2) - E_{out}(h_2)| > \epsilon \dots \textbf{ or } |E_{in}(h_M) - E_{out}(h_M)| > \epsilon]   & \quad\leq\quad    \sum_{m=1}^{M}\mathbb{P}(|E_{in}(h_m) - E_{out}(h_m)| > \epsilon) \\\ \\\
                                                                                                                                                                        & \quad=\quad       2Me^{-2\epsilon^2N}
\end{aligned}
$$


Which leaves us with
$$
\mathbb{P}(|E_{in}(g) - E_{out}(g)| > \epsilon) \quad\leq\quad 2Me^{-2\epsilon^2N} \quad\blacksquare
$$

**Discussion on this bound**

We can already see that if the cardinality of the hypothesis space, $|\mathcal{H}| = M$, is infinite, the bound is useless, it is too loose because it considers the worst case that no hypotheses will overlap in their classifications on $\mathcal{D}$. In reality, for any given $\mathcal{D}$, many hypotheses will output the same classifications. Take for instance the perceptron and let's say we have two points, one of which is $+1$ the other $-1$. There are basically an infinite number of $h$'s that would classify these two examples in $\mathcal{D}$ correctly!

Later, we'll see how we can tighten this bound by taking into account these overlapping, or effectively equal, hypotheses.



<h3>Generalization Bound</h3>

From the previous derivation we have
$$
\begin{array}{cl}
& \mathbb{P}(|E_{in}(g) - E_{out}(g)| > \epsilon) \leq 2Me^{-2\epsilon^2N}) \\\ \\\
\implies & \mathbb{P}(|E_{in}(g) - E_{out}(g)| \leq \epsilon) = 1 - \mathbb{P}(|E_{in}(g) - E_{out}(g)| > \epsilon) \\\ \\\
\geq & 1 - 2Me^{-2\epsilon^2N}
\end{array}
$$

$i.e.$ with probability at least $1 - 2Me^{-2\epsilon^2N}$ the following is true
$$
\begin{array}{c}
|E_{in}(g) - E_{out}(g)| \leq \epsilon \equiv E_{out}(g) - E_{in}(g) \leq \epsilon \\\ \\\
\therefore E_{out}(g) \leq E_{in}(g) + \epsilon
\end{array}
$$

Let $\delta = 2Me^{-2\epsilon^2N}$. So with probability at least $1-\delta$
$$
E_{out} \leq E_{in}(g) + \epsilon
$$

But we can express $\epsilon$ in terms of $\delta$

$$
\begin{aligned}
2Me^{-2\epsilon^2N}         & =    \delta \\\ \\\
e^{-2\epsilon^2N}           & =    \frac{\delta}{2M} \\\ \\\
\ln{e^{-2\epsilon^2N}}      & =    \ln{\frac{\delta}{2M}} \\\ \\\
-2\epsilon^2N               & =    \ln{\frac{\delta}{2M}} \\\ \\\
\epsilon^2                  & =    \frac{1}{2N}\ln{\frac{2M}{\delta}} \\\ \\\
\epsilon                    & =    \sqrt{\frac{1}{2N}\ln{\frac{2M}{\delta}}} \\\ \\\
\end{aligned}
$$

$$
\therefore E_{out}(g) \leq E_{in}(g) + \sqrt{\frac{1}{2N}\ln{\frac{2M}{\delta}}}
$$


In fact, we can look at the 3 other inequalities of the Hoeffding bound
$$
P(|E_{in} - E_{out}| > \epsilon) \leq \delta
$$


The Hoeffding bound directly implies with probability at ***most*** $\delta$:
$$
\begin{aligned}
|E_{in} - E_{out}| > \epsilon   & \equiv    E_{in} - E_{out} > \epsilon \implies E_{out} < E_{in} - \epsilon \quad(1) \\\ \\\
                                & \equiv    E_{out} - E_{in} > \epsilon \implies E_{out} > E_{in} + \epsilon \quad(2) \\\ \\\
\end{aligned}
$$


We already looked at one side of the complement of the Hoeffding bound
$$
P[(|E_{in} - E_{out}| > \epsilon)^C] = P(|E_{in} - E_{out}| \leq \epsilon) \geq \delta
$$

which implies that with probability at ***least*** $1-\delta$:
$$
\begin{aligned}
|E_{in} - E_{out}| \leq \epsilon    & \equiv    E_{in} - E_{out} \leq \epsilon \implies E_{out} \geq E_{in} - \epsilon \quad(3) \\\ \\\
                                    & \equiv    E_{out} - E_{in} \leq \epsilon \implies E_{out} \leq E_{in} + \epsilon \quad(4) \\\ \\\
\end{aligned}
$$


Result $(4)$ is the bound we saw before. Let's go over what these 4 bounds mean.

Results $(1)$ and $(3)$ are what we can think of as our "best case" upper and lower bounds on $E_{out}$, respectively, because they relate $E_{out}$ to the smaller value of $E_{in} - \epsilon$. 

To elaborate, result $(1)$ translates to "we have a ceiling on the probability that $E_{out}$ will be smaller than $E_{in} - \epsilon$, but it is a short ceiling, which means it is far more likely that $E_{out}$ will be closer to being less than or equal to $E_{in} + \epsilon$, $1-\delta$ probable to be more exact.

Flip the logic and we see why $(2)$ and $(4)$ are the "worst case" bounds.

Let's look at result $(3)$ more closely. This result tells us that out of all hypotheses $\mathcal{h} \in \mathcal{H}$, the $g$ selected is likely the best we could do, since there is a fairly high floor, $1-\delta$, on the probability that $E_{in} - \epsilon$ is the lower bound for $E_{out}$. 

Since $g$ was selected as $\underset{h \in \mathcal{H}}{\argmin}(E_{in}(\mathcal{h}))$, every other $h$ will have higher in-sample error, and we have high confidence that out-of-sample error for those hypotheses will also be larger from this bound. $\blacksquare$



<h3>VC Dimension For Perceptron Can Be Expressed Analytically</h3>

This is Exercise 2.4 in the book.

The VC Dimension $d_{vc}$ is a measure of the complexity of a hypothesis set. The $d_{vc}$ for any $d$-dimensional perceptron can in fact be derived analytically. From our observations of $\mathbb{R}^2$ and $\mathbb{R}^3$ datasets, we have a hunch that $d_{vc} = d+1$ for any perceptron of dimension $d$.

To confirm this, we must show that $d_{vc} \geq d+1$ and $d_{vc} \leq d+1$, which is only possible if $d_{vc} = d+1$.

**Proof: $d_{vc} \geq d+1$**

We must show that $d+1$ points can be shattered. Let's put $d+1$ points as the rows of a dataset matrix $\mathbf{X}$.

$$
\mathbf{X} = 
\begin{bmatrix}
 & -- & \vec{x}\_1 & -- & \\\
 & -- & \vec{x}\_2 & -- & \\\
 & & \vdots & & \\\
 & -- & \vec{x}\_{d+1} & -- & \\\
\end{bmatrix}
$$

Because each $\vec{x}$ has $d+1$ features, $\mathbf{X}$ is square. We can choose any dataset to maintain generality so let $\mathbf{X}$ contain only linearly independent points aka row vectors. This means $\mathbf{X}$ is invertible as it is a square matrix with independent columns (and rows).

Okay, we've established what $\mathbf{X}$, but what question am I trying to answer? The critical question is can we find some hypothesis $\vec{w}$ that will produce any of the possible $2^{d+1}$ $d+1$-dimensional $\vec{y}$ output vectors.

Well, $\mathbf{X}$ reduces to the identity matrix, which means any $\vec{y}$ can be obtained as a linear combination of the columns of $\mathbf{X}$. Therefore, $\vec{y}$ must be in the column space and must be achievable by any co-efficient vector $\vec{w}$.

$$
\vec{w} = \mathbf{X}^{-1}\vec{y}
$$

We conclude that any one of the $2^{d+1}$ $\vec{y}$'s imaginable can be achieved on $d+1$ points and succesfully show that $d_{vc} \geq d+1$.


**Proof: $d_{vc} \leq d+1$**

Proving that $d_{vc}$ is at most $d+1$ requires showing that there no set of $d+2$ points can be shattered, _i.e._ we cannot achieve $2^{d+2}$ dichotomies or $\vec{y}$'s on $d+2$ points.

This time $\mathbf{X}$ will have an extra row.

$$
\mathbf{X} = 
\begin{bmatrix}
 & -- & \vec{x}\_1 & -- & \\\
 & -- & \vec{x}\_2 & -- & \\\
 & & \vdots & & \\\
 & -- & \vec{x}\_{d+1} & -- & \\\
 & -- & \vec{x}\_{d+2} & -- & \\\
\end{bmatrix}
$$

This is clearly a tall matrix, which means it does not have full row rank, and one of the points $\vec{x}\_j$ is some linear combination of the other rows, _i.e._

$$
\vec{x}\_j = \sum_{i \neq j}a_i\vec{x}\_i
$$

We need to show that there is no set of $d+2$ points in $\mathbb{R}^{d+1}$ that can be shattered by the $d+1$-perceptron, _i.e._ there exists some $\vec{y}$ that cannot be produced.

Suppose we want to obtain the dichotomy might have $y_i = \vec{w}^T\vec{x}_i = \textrm{sign}(a_i)$ when $a_i \neq 0$, and classifies $\vec{x}_j$ as a negative point such that $y_j = \vec{w}^T\vec{x}_j = -1$. This is certainly a dichotomy we would expect to be achievable if $d+2$ points can be shattered aka $d+2$ is not a break point.

We will use proof by contradiction to show that no such $\vec{w}$ that shatters $d+2$ points can exist. For now, assume $\vec{w}$ is able to produce $2^{d+2}$ dichotomies.

$$
\begin{aligned}
y_j     & = \vec{w}^T\vec{x}_j \\\ \\\
        & = \vec{w}^T\sum\_{i\neq j}a\_i\vec{x}\_i \\\ \\\
        & = \sum\_{i\neq j}a\_i\vec{w}^T\vec{x}\_i \\\ \\\
        & = \sum\_{i\neq j}a\_iy\_i = -1\textrm{?}
\end{aligned}
$$

Except that last equality cannot be true! We said this desired dichotomy has $y_i = \textrm{sign}(a_i)$ when $a_i \neq 0$ and $y_j = +1$.

$$
\therefore \sum\_{i\neq j}a_iy_i = \sum\_{i\neq j}a_i\cdot\textrm{sign}(a_i) > 0 \neq y_j = -1
$$

We have found a dichotomy that cannot be produced for any $d+2$ points with a perceptron hypothesis $\vec{w}$ and conclude that $d+2$ is the first breakpoint.

$$
\therefore d_{vc} \leq d+1
$$

Since we have shown that

$$
d+1 \leq d_{vc} \leq d+1
$$

it must be that

$$
d_{vc} = d+1 \quad \blacksquare
$$



<h3>Bias-Variance As Accuracy-Precision</h3>

Accuracy is to Bias as Precision is to Variance. In the single hypothesis hypothesis-set, the hypothesis set is very precise but not accurate, while a more complex hypothesis set may capture the correct classifications, but it also generates other results.

<h3>Download Common Datasets</h3>

I recently had to download the MNIST datasets. I went to the official website but it prompted me for sign in credentials that I don't have.

So, I used PyTorch to get the same data:

```
import torchvision.datasets as datasets

mnist_data = datasets.MNIST(root='./data', download=True)
```

Proof that it's the same data:

```
❯ python3 main.py
Downloading http://yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz
Downloading http://yann.lecun.com/exdb/mnist/train-images-idx3-ubyte.gz to ./data/MNIST/raw/train-images-idx3-ubyte.gz
100.0%
Extracting ./data/MNIST/raw/train-images-idx3-ubyte.gz to ./data/MNIST/raw

Downloading http://yann.lecun.com/exdb/mnist/train-labels-idx1-ubyte.gz
Downloading http://yann.lecun.com/exdb/mnist/train-labels-idx1-ubyte.gz to ./data/MNIST/raw/train-labels-idx1-ubyte.gz
100.0%
Extracting ./data/MNIST/raw/train-labels-idx1-ubyte.gz to ./data/MNIST/raw

Downloading http://yann.lecun.com/exdb/mnist/t10k-images-idx3-ubyte.gz
Downloading http://yann.lecun.com/exdb/mnist/t10k-images-idx3-ubyte.gz to ./data/MNIST/raw/t10k-images-idx3-ubyte.gz
100.0%
Extracting ./data/MNIST/raw/t10k-images-idx3-ubyte.gz to ./data/MNIST/raw

Downloading http://yann.lecun.com/exdb/mnist/t10k-labels-idx1-ubyte.gz
Downloading http://yann.lecun.com/exdb/mnist/t10k-labels-idx1-ubyte.gz to ./data/MNIST/raw/t10k-labels-idx1-ubyte.gz
100.0%
Extracting ./data/MNIST/raw/t10k-labels-idx1-ubyte.gz to ./data/MNIST/raw
```

It downloads from the official [site](http://yann.lecun.com/exdb/mnist).
