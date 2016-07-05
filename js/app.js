// Here I get a copy of the constantly updated
// variable dt. I will get this value by a
// globalupdate function
var myDt;
// I will call this function from the
// update function defined in the engine.js
var globalUpdate = function(dt) {
    myDt = dt;
}

// This function generates random integer numbers between min and max

function randomGenerator(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}
// Enemies our player must avoid
// This constructor takes two arguments: the stone-blocks row which
// the bugs are spawned upon, that can have 1, 2, or 3 as value,
// and the speed of the bug, an integer likely between 1 and 10
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Since every row has a "height=83", a bug on the 2nd paved row
    // will have y = 2*83 - 20(a graphic fix due to incorrect size of
    // the sprite)
    this.y = row*83 - 20;
    // initial x position when the bug is spawned the first time
    this.x = - randomGenerator(100, 1500);
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = - randomGenerator(100, 1500);
    }
    this.x += this.speed*dt;
};
    // this method gives true if the payer's coordinates are within
    // the range (enemy.x ± 50) and (enemy.y + 20 ± 41) where 50 and
    // 41 are roughly half the width and the height of the enemy
    // (the bug has to penetrate our player in order to kill it). The
    // number 20 in the formulas is the same I used inside the enemy
    // constructor to fix the graphic bug due to the sprite height
Enemy.prototype.collision = function() {
    return (player.y > (this.y + 20 - 41)
            && player.y < (this.y + 20 + 41)
            && player.x < (this.x + 50)
            && player.x > (this.x - 50));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Initial coordinates and speed of the player
    this.x = 202;
    this.y = 415;
    this.speed = 2000;
    this.sprite = 'images/char-boy.png';
    // scores will be updated in the update methods
    this.scores = 0;
    this.lives = 5;
};

Player.prototype.update = function() {
    // The following loops prevent a graphic bug I got from
    // the player.handleInput method since the smallest
    // movement of the player is equal to this.speed*myDt,
    // which can be bigger than the space left between
    // borders and player before the last movement occurs.
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 404) {
        this.x = 404;
    }
    if (this.y > 606 - 171) {
        this.y = 606 - 171;
    }
    // This last loop restores the initial position of our
    // player once he reaches the water by calling the reset
    // method
    if (this.y <= 0) {
        this.reset();
        this.scores += 5;
    }
    if (this.scores === 450) {
        victory();
    }
};

// This method is used to restore the player's initial position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
};
// Once the player loses all his lives a window dialog box will
// appear with the message 'game over' and the game will restart
// by refreshing the page itself
Player.prototype.updateLives = function() {
        this.lives -= 1;
        if (this.lives === 0) {
            gameOver();
        }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    // The input argument comes from the 'keydown' event
    // listener defined on the document
    var move = this.speed*myDt;
    // The condition we need to be true in order to allow
    // the player to move left is that his current x
    // must not be off the left border of the canvas.
    // In other words, player.x has to be >= 0
    // The same will be valid for the other directions.
    if (input === 'left' && this.x >= 0) {
        this.x -= move;
    }
    // Here I have to take into account the player's width (101)
    if (input === 'right' && this.x <= (505 - 101)) {
        this.x += move;
    }
    if (input === 'up' && this.y >= 0) {
        this.y -= move;
    }
    // And here we have to consider the player's height (171)
    if (input === 'down' && this.y <= (606 - 171)) {
        this.y += move;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var player = new Player ();

// Here I define a enemiesGenerator function that will
// take the difficulty level as argument (integer)

function enemiesGenerator(level) {
    var randomRow;
    var speed;
    // n is the number of enemies to be generated
    var n = 2 + level;
    // in this loop I will generate random integers between
    // 1 and 3 to define the paved row which the bug will be
    // spawned upon and, according to this value, I will also
    // randomly generate the speed the bug must have
    for (var i = 0; i < n; i++) {
        randomRow = randomGenerator(1, 3);
        if (randomRow === 1) {
            speed = randomGenerator(level*25 + 100, level*25 + 150);
        }
        if (randomRow === 2) {
            speed = randomGenerator(level*25 + 50, level*25 + 100);
        }
        if (randomRow === 3) {
            speed = randomGenerator(level*25, level*25 + 50);
        }
        allEnemies.push(new Enemy (randomRow, speed));
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Function to render scores and player lives on the canvas
function renderScoresLives() {
    ctx.font = "16px Impact";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText("SCORE: " + player.scores, 10, 80);
    ctx.strokeText("SCORE: "+ player.scores, 10, 80);
    ctx.fillText("LIVES: " + player.lives, 10, 100);
    ctx.strokeText("LIVES: "+ player.lives, 10, 100);
}
// This renders the new level on the canvas once it increases
// by being called from the updateLevel defined in engine.js
function renderLevel(level) {
    ctx.font = "16px Impact";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText("LEVEL: " + level, 10, 120);
    ctx.strokeText("LEVEL: "+ level, 10, 120);
}

function gameOver() {
    window.alert("!!! GAME OVER !!!");
    window.location.reload();
}

function victory () {
    window.alert("!!! YOU WON !!!");
    window.location.reload();
}