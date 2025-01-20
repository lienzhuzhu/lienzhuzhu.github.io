+++
title = "Math Typesetting 数学"
date = 2025-01-18
+++

# 数学 (or Mathematics in the King's)

**HUGO MIGRATION NOTES**
- Must escape all `\` symbols for newlines

**TODO: Fix this.**

## Examples

### Inline math
```latex
This equation is inline: $ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $
```

This equation is inline: $ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $


### Block math
```latex
$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$
```

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$


### A parenthetical matrix
```latex
$$
\begin{pmatrix}
   a & b \\\\
   c & d
\end{pmatrix}
$$
```

$$
\begin{pmatrix}
   a & b \\\\
   c & d
\end{pmatrix}
$$

### Here's a longer equation in an aligned environment:
```latex
$$
\begin{aligned}
\dagger \text{Some long expression}    & = \frac{\frac{2}{N} \pm \sqrt{(\frac{2}{N})^2 + 4 \cdot \frac{1}{N}\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}}{2} \\\\
            & = \frac{1}{N} \pm \frac{1}{N}\sqrt{1+N\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}
\end{aligned}
$$
```

$$
\begin{aligned}
\dagger \text{Some long expression}    & = \frac{\frac{2}{N} \pm \sqrt{(\frac{2}{N})^2 + 4 \cdot \frac{1}{N}\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}}{2} \\\\
            & = \frac{1}{N} \pm \frac{1}{N}\sqrt{1+N\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}
\end{aligned}
$$


### Some chemistry

```latex
$$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$$
```

$$
C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}
$$

```latex
The concentration by pressure of water: $ C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K} $
```

The concentration by pressure of water: $ C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K} $

$ \LaTeX = {\infty}^{\infty} $
