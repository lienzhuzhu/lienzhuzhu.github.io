+++
title = "My Notetaking System"
date = "2025-01-23"
draft = true
+++

# How I take notes in NeoVim

### There are 3 components
1. `notaker.nvim`
2. Script to render PDFs
3. Shell alias with `fzf`

### Neovim doesn't even need to be inside `NOTAKER_CORTEX_DIR` to `grep` terms
This is most useful when I'm writing a paper in $\LaTeX$ (also in nvim) and suddenly need to look something up from my course notes to refresh my memory about a term, or see what my professor had to say, then I can just look it up.

### `Notaker.py` compiles notes into a PDF booklet (WIP)

### Use `fzf` to quickly find notes and open in NeoVim
`ntf` zsh alias allows me to fuzzy find any note.
The structure can become large, so fuzzy finding is necessary.

### If I know I am in `NOTAKER_CORTEX_DIR`...
Just use `fzf-lua.nvim` to find files and for `live_grep`

- Sometimes I first get into `NOTAKER_CORTEX_DIR` note file, change Neovim's pwd to the Cortex using `` ` ``, then fzf-lua will have the correct context
- of course, the `vimgrep` binding will work too
