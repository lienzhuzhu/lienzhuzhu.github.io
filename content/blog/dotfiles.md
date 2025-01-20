+++
author = "Lien Zhu"
title = "My Dotfiles"
date = "2023-08-04"
description = "The setup I use on my machines."
+++


When I watch YouTube videos of other computer scientists and software engineers I can't help but admire their sleek, clean development environment setups. They give off an air of control and mastery, having tamed their machines to which I could only heed my wit.

So, I have decided to work on setting up my own dotfiles more or less from scratch.


### Goals

- Each application installed must use an easy to read/ modify config file
- Each application installed must be compatible with MacOS and Ubuntu
- Create an idempotent `install.sh` script
- Minimize platform dependency


### Key applications

**Terminal Multiplexor**

[tmux](https://github.com/tmux/tmux)

**Terminal Emulator**

[Wezterm](https://wezfurlong.org/wezterm/index.html)

**Shell**

[zsh](https://zsh.org/)

**Text Editor**

[Neovim](https://neovim.io/)


### Apps To Install

- Rust
- A Nerd Font
- ripgrep
- fzf
- fd
- yazi
    - poppler for PDF preview
    - ffmpeg
- LaTeX
    - pandoc

### Fonts

Fonts can be installed using homebrew if on MacOS:

```zsh
brew tap homebrew/cask-fonts
brew install font-<font of choice>-nerd-font
```

**NOTE**: you may have to experiment with the names.

or directly as zip files from the Nerd Font repo `github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts`.

The best place to store fonts on MacOS is `~/Library/Fonts/`.
