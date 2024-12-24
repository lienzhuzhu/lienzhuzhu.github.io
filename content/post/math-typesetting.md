+++
author = "Lien Zhu"
title = "MathJax Setup"
date = "2024-12-24"
description = "How I write math and chemistry online"
tags = [
    "tutorial",
    "latex",
    "config",
]
categories = [
    "informational",
]
series = ["creating this blog"]
+++

### Setting up MathJax on this site so I can write $ \LaTeX $

Mathematical notation in a Hugo project can be enabled using a little bit of set up. I like to use \$\$ and \$ for block *(aka display)* and inline math, so I will set up the site as such.

I followed this official Hugo [document](https://gohugo.io/content-management/mathematics/), another reason to use MathJax besides the fact that it's more powerful than Katex.

[MathJax Supported LaTeX](https://docs.mathjax.org/en/v3.0-latest/input/tex/macros/index.html) 

---
 
#### 1. First, Add to `hugo.toml` the following:
```toml
    [markup.goldmark]
        [markup.goldmark.extensions]
            [markup.goldmark.extensions.passthrough]
                enable = true
            [markup.goldmark.extensions.passthrough.delimiters]
                block = [["\\[", "\\]"], ["$$", "$$"]]
                inline = [["\\(", "\\)"], ["$", "$"]]
```
###### Notes:
- To enable MathJax globally set the parameter `math` to `true` in `hugo.toml` configuration *(already done in my config)*.
- To enable MathJax on a per page basis include the parameter `math: true` in content files *(not necessary, but the same key can be used to disable math from rendering by setting the value to `false`)*.

####  2. Second, create a custom partial under `/layouts/partials/math.html`. This will override the theme\'s equivalent.
```html
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
<script>
    MathJax = {
        tex: {
            displayMath: [['\\[', '\\]'], ['$$', '$$']],
            inlineMath: [['\\(', '\\)'], ['$', '$']]
        }
    };
</script>
```

#### 3. Finally make sure `layouts/_default/baseof.html` looks something like this
```html
<head>
  ...
  {{ if .Param "math" }}
    {{ partialCached "math.html" . }}
  {{ end }}
  ...
</head>
```

###### Notes
- As of writing, I did not overwrite this with my own `baseof.html`, in fact, my `layouts/_default/` directory is empty.



#### Examples

###### Inline math
```latex
$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $
```

$ \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… $

###### Block math
```latex
$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$
```

$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } 
$$


###### A parenthetical matrix
```latex
$$
\begin{pmatrix}
   a & b \\
   c & d
\end{pmatrix}
$$
```

$$
\begin{pmatrix}
   a & b \\
   c & d
\end{pmatrix}
$$

###### Here\'s a longer equation in an aligned environment:
```latex
$$
\begin{aligned}
\dagger \text{Make this longer}    & = \frac{\frac{2}{N} \pm \sqrt{(\frac{2}{N})^2 + 4 \cdot \frac{1}{N}\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}}{2} \\
            & = \frac{1}{N} \pm \frac{1}{N}\sqrt{1+N\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}
\end{aligned}
$$
```

$$
\begin{aligned}
\dagger \text{Make this longer}    & = \frac{\frac{2}{N} \pm \sqrt{(\frac{2}{N})^2 + 4 \cdot \frac{1}{N}\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}}{2} \\
            & = \frac{1}{N} \pm \frac{1}{N}\sqrt{1+N\ln{\frac{6m_{\mathcal{H}}(2N)}{\delta}}}
\end{aligned}
$$


###### Some chemistry

$$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$$

### That is all.
$ \LaTeX = {\infty}^{\infty} $
