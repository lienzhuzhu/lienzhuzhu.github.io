+++
title = "Linear Algebra Notes"
date = "2023-10-04T19:17:32-07:00"
# description = "Notes on Linear Algebra"

tags = ["notes"]
+++


**Orthogonality, Projection, Gram-Schmidt, and $QR$ Factorization**

---

Show that if $\mathbf{u} \perp \mathbf{v}$ and $\mathbf{C}(A)=\\{\mathbf{u}, \mathbf{v}\\}$ then

$$
A(A^TA)^{-1}A^T\mathbf{b} = \mathbf{u}\frac{\mathbf{u}^T\mathbf{b}}{\mathbf{u}^T\mathbf{u}} + \mathbf{v}\frac{\mathbf{v}^T\mathbf{b}}{\mathbf{v}^T\mathbf{v}} 
$$

In other words, show that given an orthogonal basis of a subspace, projecting some vector $\mathbf{b}$ onto that subspace is the same as adding together the projections onto the subspaces spanned by each individual basis vector (note: each of the subspaces is a line).

Proof start:

$$ 
\begin{aligned}
A^TA    & = \begin{bmatrix}
            \mathbf{u}^T\mathbf{u} & \mathbf{u}^T\mathbf{v} \\\ \\\
            \mathbf{v}^T\mathbf{u} & \mathbf{v}^T\mathbf{v} \\\
            \end{bmatrix} \\\ \\\
        & = \begin{bmatrix}
            \mathbf{u}^T\mathbf{u} & 0 \\\ \\\
            0 & \mathbf{v}^T\mathbf{v} \\\
            \end{bmatrix} \\\
\end{aligned}
$$

Remember, $\mathbf{u} \perp \mathbf{v}$, so $\mathbf{u}^T\mathbf{v} = \mathbf{v}^T\mathbf{u} = 0$. This is the critical fact which cleans up the inverse of that matrix product, otherwise we would be left with a mess.

_Note that this is only true if the basis vectors are orthogonal. Imagine two basis vectors that span a plane which are almost colinear. Then, the sum of the projections onto each subspace spanned by the individual basis vectors (the lines) would be almost double in magnitude that of the actual projection onto the plane spanned by the two vectors._


This is a $2\times2$ matrix, so finding the inverse is easy.

$$ 
\begin{aligned}
(A^TA)^{-1}     & = \frac{1}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}}
                    \begin{bmatrix}
                    \mathbf{v}^T\mathbf{v} & 0 \\\ \\\
                    0 & \mathbf{u}^T\mathbf{u} \\\
                    \end{bmatrix} \\\
\end{aligned}
$$


Zooming out we have:

$$ 
\begin{aligned}
A(A^TA)^{-1}A^T\mathbf{b}   & = \frac{1}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}}
                                \begin{bmatrix}
                                | & | \\\
                                \mathbf{u} & \mathbf{v} \\\
                                | & |
                                \end{bmatrix}
                                \begin{bmatrix}
                                \mathbf{v}^T\mathbf{v} & 0 \\\ \\\
                                0 & \mathbf{u}^T\mathbf{u} \\\
                                \end{bmatrix} 
                                \begin{bmatrix}
                                - & \mathbf{u} & - \\\
                                - & \mathbf{v} & -
                                \end{bmatrix} 
                                \mathbf{b}
\end{aligned}
$$

Let's multiply each pair of matrices:

$$ 
\begin{aligned}
A(A^TA)^{-1}A^T\mathbf{b}   & = \frac{1}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}}
                                \begin{bmatrix}
                                | & | \\\
                                \mathbf{v}^T\mathbf{v}\cdot\mathbf{u} & \mathbf{u}^T\mathbf{u}\cdot\mathbf{v} \\\
                                | & |
                                \end{bmatrix}
                                \begin{bmatrix}
                                \mathbf{u}^T\mathbf{b} \\\ \\\
                                \mathbf{v}^T\mathbf{b}
                                \end{bmatrix} \\\ \\\
                            & = \frac{1}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}}
                                \begin{bmatrix}
                                | & | \\\
                                \mathbf{v}^T\mathbf{v}\cdot\mathbf{u}\cdot\mathbf{u}^T\mathbf{b} & \mathbf{u}^T\mathbf{u}\cdot\mathbf{v}\cdot\mathbf{v}^T\mathbf{b} \\\
                                | & |
                                \end{bmatrix} \\\ \\\
                            & = \frac{\mathbf{v}^T\mathbf{v}\cdot\mathbf{u}\cdot\mathbf{u}^T\mathbf{b} + \mathbf{u}^T\mathbf{u}\cdot\mathbf{v}\cdot\mathbf{v}^T\mathbf{b}}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}} \\\ \\\
                            & = \frac{\mathbf{u}^T\mathbf{b}\cdot\mathbf{v}^T\mathbf{v}}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}}\mathbf{u} + \frac{\mathbf{v}^T\mathbf{b}\cdot\mathbf{u}^T\mathbf{u}}{\mathbf{u}^T\mathbf{u}\cdot\mathbf{v}^T\mathbf{v}}\mathbf{v} \\\ \\\
                            & = \frac{\mathbf{u}^T\mathbf{b}}{\mathbf{u}^T\mathbf{u}}\mathbf{u} + \frac{\mathbf{v}^T\mathbf{b}}{\mathbf{v}^T\mathbf{v}}\mathbf{v} \quad\blacksquare
\end{aligned}
$$

This result shows us why the Gram-Schmidt process works. If we already found the first two orthogonal basis vectors, we can just subtract away the individual projections to get the _error_ portion of the third vector when projected onto the subspace spanned by the first two vectors.

---
