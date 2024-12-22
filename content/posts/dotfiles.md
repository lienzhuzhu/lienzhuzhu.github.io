+++
title = "My Dotfiles"
date = "2023-08-04T15:09:31-07:00"
# description = ""

tags = ["engineering"]

draft = false
+++


When I watch YouTube videos of other computer scientists and software engineers I can't help but admire their sleek, clean development environment setups. They give off an air of control and mastery, having tamed their machines to which I could only heed my wit.

So, I have decided to work on setting up my own dotfiles more or less from scratch.


<h3>
Goals
</h3>

- Each application installed must use an easy to read/ modify config file
- Each application installed must be compatible with MacOS and Ubuntu
- Create an idempotent `install.sh` script
- Minimize platform dependency


<h3>
Key applications:
</h3>

- __Terminal Multiplexor__
[tmux](https://github.com/tmux/tmux)

- __Terminal Emulator__
[Wezterm](https://wezfurlong.org/wezterm/index.html)

- __Shell__
[zsh](https://zsh.org/)

- __Text Editor__
[Neovim](https://neovim.io/)

- __Prompt Customizer__
[Starship.rs](https://starship.rs/)


<h3>
Dependencies
</h3>

- Rust
- A Nerd Font
- ripgrep

<h3>
Fonts
</h3>

Fonts can be installed using homebrew if on MacOS:

```
brew tap homebrew/cask-fonts
brew install font-<font of choice>-nerd-font
```

**NOTE**: you may have to experiment with the names.

or directly as zip files from the Nerd Font repo `github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts`.

The best place to store fonts on MacOS is `~/Library/Fonts/`.
