Welcome to my classic-arcade-game-clone project!
===============================
## Introduction:

This project consists in using provided visual assets and  a game loop engine to recreate a clone of the classic arcade game **Frogger**, making use of the JavaScript object-oriented programming features and the *HTML* `<canvas>` element.
### How to run the game:

To play the game you can either:
 1.  clone or download this repository and load the *index.html* file in your browser
 2. use this direct [link](https://pasquale-guglielmi.github.io/frontend-nanodegree-arcade-game/)

### How to play it:

- The purpose of the game is to reach Level 10, which means to get a score of 450 points
- At the beginning of the game the player has zero points and is provided with 5 lives
- In order to earn points the user has to move his avatar, by using the four keyboard arrow keys, and reach the river at the end of the scheme by avoiding the running bugs coming from the left side of the road
- Every time the player reaches the water he earns 5 points and his initial position is automatically restored
- If the player gets hit by a bug he loses on life and gets respawned in his initial position. If the player loses all the 5 lives he dies and the game ends
- For every 50 points earned by the player the difficulty level of the game is increased by one, resulting in increased speed and number of the bugs
- Scores, lives and game Level are listed in the upper-left corner of the game screen
- To restart the game you just need to refresh the browser's window

### Resources:

- **Udacity Courses:** [Object-Oriented JavaScript](https://www.udacity.com/course/object-oriented-javascript--ud015) and [HTML5 Canvas](https://www.udacity.com/course/html5-canvas--ud292})
- **MDN Tutorials**: [2D breakout game using pure JavaScript](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
- **StackOverflow**: [Generating random whole numbers in JavaScript](http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range)

 #### Possible Improvements:

- Allow the user to chose among different characters
- Add sounds
- Add collectible items to the game
- Implement special items like speed-improving boots, magic shield to protect the player ecc...
- Add new tipes of enemies