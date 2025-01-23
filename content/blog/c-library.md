+++
title = 'C Library Setup'
date = '2025-01-19'
description = 'Setting up Raylib and Raygui'
+++


## Raylib

```bash
export MACOSX_DEPLOYMENT_TARGET=10.9
xcode-select --install # not necessary if already have Xcode IDE installed, or have run this command before
git clone https://github.com/raysan5/raylib.git /path/to/raylib
cd /path/to/raylib/src
make

cp /path/to/raylib/src/raylib.h project/root/include/raylib.h
cp /path/to/raylib/src/raymath.h project/root/include/raylib/raymath.h
cp /path/to/raylib/src/libraylib.a project/root/lib/libraylib.a
```
