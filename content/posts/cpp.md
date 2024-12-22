+++
title = "C++ Library Set Up"
date = "2023-08-31T18:00:54-07:00"
# description = "Notes for setting up some libraries I use for C++ development"

tags = ["engineering"]
+++

<h3>
Eigen
</h3>

Install from Github repo. My preferred method.

```
git clone https://gitlab.com/libeigen/eigen.git /path/to/eigen
sudo ln -s /path/to/eigen/Eigen /usr/local/include/Eigen
```

or use homebrew if on MacOS

```
brew install eigen
```

Now, eigen is installed in `/opt/homebrew/Cellar/eigen3` and a link has been created to `/opt/homebrew/include/eigen3`. Homebrew doesn't link to the standard include path so we just need to tell our C++ compiler to look here for header files.

I put the following lines in my `.zshrc` file, but you will need to put them in the proper rc file for your shell of choice.

```
CPLUS_INCLUDE_PATH="/usr/local/include/
export CPLUS_INCLUDE_PATH="/opt/homebrew/include:$CPLUS_INCLUDE_PATH"'
```

The first line that sets `CPLUS_INCLUDE_PATH` is necessary because it seems MacOS drops the standard system paths for some security reason, especially when the compiler is set up with CMake.
It also seems to make the clangd LSP server behave nicely without the need for a `~/.clangd` file existing.


Then, regardless of installation method, test the installation by putting this code into a file called `main.cpp`, though I prefer to use the Github source, so I just `#include Eigen/Dense`:

```
#include <iostream>
#include <eigen3/Eigen/Dense>
 
using Eigen::MatrixXd;
 
int main()
{
  MatrixXd m(2,2);
  m(0,0) = 3;
  m(1,0) = 2.5;
  m(0,1) = -1;
  m(1,1) = m(1,0) + m(0,1);
  std::cout << m << std::endl;
}
```


The following commands:

```
g++ main.cpp -o eigen-app
./eigen-app
```

should produce:

```
  3  -1
2.5 1.5
```


<h3>
raylib
</h3>

```
export MACOSX_DEPLOYMENT_TARGET=10.9
xcode-select --install # not necessary if already have Xcode IDE installed, or have run this command before
git clone https://github.com/raysan5/raylib.git /path/to/raylib
cd /path/to/raylib/src
make

sudo mkdir /usr/local/include/raylib
sudo ln -s /path/to/raylib/src/raylib.h /usr/local/include/raylib/raylib.h
sudo ln -s /path/to/raylib/src/libraylib.a /usr/local/lib/libraylib.a
```


```
g++ -framework CoreVideo -framework IOKit -framework Cocoa -framework GLUT -framework OpenGL -lraylib my_app.cpp -o app -std=c++17
```


Here's sample code showing a bouncing red ball:

```
/*******************************************************************************************
*
*   raylib [shapes] example - bouncing ball
*
*   Example originally created with raylib 2.5, last time updated with raylib 2.5
*
*   Example licensed under an unmodified zlib/libpng license, which is an OSI-certified,
*   BSD-like license that allows static linking with closed source software
*
*   Copyright (c) 2013-2023 Ramon Santamaria (@raysan5)
*
********************************************************************************************/

#include <raylib/raylib.h>

//------------------------------------------------------------------------------------
// Program main entry point
//------------------------------------------------------------------------------------
int main(void)
{
    // Initialization
    //---------------------------------------------------------
    const int screenWidth = 800;
    const int screenHeight = 450;

    InitWindow(screenWidth, screenHeight, "raylib [shapes] example - bouncing ball");

    Vector2 ballPosition = { GetScreenWidth()/2.0f, GetScreenHeight()/2.0f };
    Vector2 ballSpeed = { 5.0f, 4.0f };
    int ballRadius = 20;

    bool pause = 0;
    int framesCounter = 0;

    SetTargetFPS(60);               // Set our game to run at 60 frames-per-second
    //----------------------------------------------------------

    // Main game loop
    while (!WindowShouldClose())    // Detect window close button or ESC key
    {
        // Update
        //-----------------------------------------------------
        if (IsKeyPressed(KEY_SPACE)) pause = !pause;

        if (!pause)
        {
            ballPosition.x += ballSpeed.x;
            ballPosition.y += ballSpeed.y;

            // Check walls collision for bouncing
            if ((ballPosition.x >= (GetScreenWidth() - ballRadius)) || (ballPosition.x <= ballRadius)) ballSpeed.x *= -1.0f;
            if ((ballPosition.y >= (GetScreenHeight() - ballRadius)) || (ballPosition.y <= ballRadius)) ballSpeed.y *= -1.0f;
        }
        else framesCounter++;
        //-----------------------------------------------------

        // Draw
        //-----------------------------------------------------
        BeginDrawing();

            ClearBackground(RAYWHITE);

            DrawCircleV(ballPosition, (float)ballRadius, MAROON);
            DrawText("PRESS SPACE to PAUSE BALL MOVEMENT", 10, GetScreenHeight() - 25, 20, LIGHTGRAY);

            // On pause, we draw a blinking message
            if (pause && ((framesCounter/30)%2)) DrawText("PAUSED", 350, 200, 30, GRAY);

            DrawFPS(10, 10);

        EndDrawing();
        //-----------------------------------------------------
    }

    // De-Initialization
    //---------------------------------------------------------
    CloseWindow();        // Close window and OpenGL context
    //----------------------------------------------------------

    return 0;
}
```



<h3>
SFML
</h3>

```
brew install sfml
brew info sfml
```


After installation, `homebrew` creates symlinks to these locations

```
/opt/homebrew/include/
/opt/homebrew/lib/
```


Now we can test to make sure the library has been set up correctly. Put this code into a file called `sfml.cpp`.

```
#include <SFML/Graphics.hpp>

int main()
{
    sf::RenderWindow window(sf::VideoMode(200, 200), "SFML works!");
    sf::CircleShape shape(100.f);
    shape.setFillColor(sf::Color::Red);

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        window.clear();
        window.draw(shape);
        window.display();
    }

    return 0;
}
```

In whatever directory `sfml.cpp` is located, run the command:

```
g++ -o sfml-app sfml.cpp -I/opt/homebrew/include/ -L/opt/homebrew/lib/ -lsfml-graphics -lsfml-window -lsfml-system
./sfml-app
```

and you should see a red circle show up on the screen.



<h3>
Apple mlx
</h3>

**Must have XCode IDE**

I think just having xcode-select tools is not enough, the full IDE provides some other tools necessary for mlx.

```
xcode-select --switch /Applications/Xcode.app/Contents/Developer
git clone git@github.com:ml-explore/mlx.git mlx && cd mlx
mkdir -p build && cd build
cmake .. && make -j
make test
make install
```

This will place the headers and library files in obvious locations.
