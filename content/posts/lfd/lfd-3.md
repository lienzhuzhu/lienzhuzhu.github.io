+++
title = "Learning From Data Problem Set 3"
date = "2023-10-23T19:14:38-07:00"
# description = ""

tags = ["notes", "ml"]
+++


[PDF of problems](https://work.caltech.edu/homework/hw3.pdf)


<h3>
1. [b]
</h3>

We can express our confidence as $\delta = 2Me^{-2\epsilon^2N}$ and manipulate this expression to put it in terms of $N$:

$$
\begin{aligned}
2Me^{-2\epsilon^2N} & = \delta \\\ \\\
e^{-2\epsilon^2N}   & = \frac{\delta}{2M} \\\ \\\
-2\epsilon^2N       & = \ln{\frac{\delta}{2M}} \\\ \\\
N                   & = \frac{1}{2\epsilon^2}\ln{\frac{2M}{\delta}}
\end{aligned}
$$

Then for the next 3 problems we can use this expression by plugging in for $M$, $\delta$, and $\epsilon$:

$\epsilon = 0.05$
$\delta = 0.03$

For $M = 1$:
$$
\begin{aligned}
N   & =         \frac{1}{2\epsilon^2}\ln{\frac{2}{\delta}} \\\ \\\
    & \approx   840 
\end{aligned}
$$


<h3>
2. [c]
</h3>

For $M = 10$:
$$
\begin{aligned}
N   & =         \frac{1}{2\epsilon^2}\ln{\frac{20}{\delta}} \\\ \\\
    & \approx   1300 
\end{aligned}
$$


<h3>
3. [d]
</h3>

For $M = 100$:
$$
\begin{aligned}
N   & =         \frac{1}{2\epsilon^2}\ln{\frac{200}{\delta}} \\\ \\\
    & \approx   1761 
\end{aligned}
$$


<h3>
4. [b]
</h3>

The way to ensure the arrangement of points doesn't limit the number of potential dichotomies is to arrange them such that no more than 3 points are colinear and no more than 4 are co-planar. I like to check pairs of points and see if I can separate them from the other $N-2$ points.

For 4 points in $\mathbb{R}^3$, we can separate any pair of points from the others if we imagine a tetrahedron. 

For 5 points in $\mathbb{R}^3$, we arrange the points into a pentahedron, with the base slightly distorted. Observe that no matter what plane you imagine, 2 points that are diagonal from each other in the base can never be alone together. You can try to distort the base to get your intended points alone together, but that would just make it so the other pair of points that make up the base cannot be alone together!

Additionally, Exercise 2.4 concludes that the $d_{VC}$ for a $d-$dimensional perceptron is $d_{VC} = d + 1$.


<h3>
5. [b]
</h3>

The growth function $m_\mathcal{H}$ must be polynomial or equal to $2^N$.


<h3>
6. [c]
</h3>

With 2 positive intervals, we can generate all $2^4$ dichotomies on 4 points in $\mathbb{R}^1$, the number line, because we can leave any two points alone by themselves, though in this case that means we label them as positive points.

For 5 points, we can label the $1^{st}$, $3^{rd}$, and $5^{th}$ points as positive points. With just 2 positive intervals, there is no way we can achieve this labeling.


<h3>
7. [c]
</h3>

Let's apply the same logic as we use for finding the growth function for the single positive interval. If we pick 4 distinct segments to place our start and end points, then we have $\binom{N+1}{4}$ combinations. 

Now what about the non-disticnt cases? Well, there's really only one because as long the left-most interval's end point is the same or overlaps with the right-most interval's start point, then it reduces to the single interval case where we have $\binom{N+1}{2}$ choices.

Of course, we still have the single outcome where all start points are in the same segment as their endpoints and so we add a 1. Putting these results together gets us:

$m_{\mathcal{H}} = \binom{N+1}{4} + \binom{N+1}{2} + 1$


<h3>
8. [d]
</h3>

For this question, I just considered the $1$-interval and $2$-interval. The break point for the $1$-interval is 3 points, because you can never have the middle point be the only positively labeled point. We showed in the problem 5 that the $2$-interval has a break point of 5.

This means the only possible expression for the break point of the $M$-interval is $2M+1$.


<h3>
9. [d]
</h3>

In fact, the break point of the triangle convex set is 8, but amongst the choices, 9 is the smallest. The visual logic can be shown as followed by drawing 8 points. 3 positive points is trivial, so we go to 4 positives. Also note that the most "strenuous" task is trying to separate 4 positive points amongst the other points when the positive points are spread as far apart as possible.

With 8 total points, we can spread the 4 positives around with one negative in between each pair of positives. Attempting to draw a triangle to contain these points will only result in defeat.

Now, draw 7 points and confirm that no matter what 4 points you label as positive, you can always draw a triangle that would contain these points because two of the positive points will always be next together and contained within a tip of the triangle and the two points that are spread out can be the base of the triangle.

$\therefore$ 9 is the smallest answer out of the choices given.


<h3>
10. [b]
</h3>

Convince yourself that the concentric circles case is just the $1$-interval revolved around $360\degree$.

[Next Post](../lfd-4)
