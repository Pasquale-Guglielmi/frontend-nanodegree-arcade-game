
var myDt;

/* @description Function called from the Engine on each game tick.
 * It makes the 'dt' value globally accessible
 */
var globalUpdate = function(dt) {
    myDt = dt;
}

/* @description returns a random integer number between min and max
 */
function randomGenerator(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
}
/* @description constructor of the enemy entities
 * @parameters integer numbers row and speed - row is an
 * integer between 1 and 3, representing the vertical
 * positioning of the bug on the game screen
 */
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = row*83 - 20; // 83 is the row height on the canvas
    // The bugs get spawned off the canvas, at the left of it
    this.x = - (Math.floor(Math.random() * (1500 - 100)) + 100);
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
        this.x = - (Math.floor(Math.random() * (1500 - 100)) + 100);
    }
    this.x += this.speed*dt;
};
    /* @description checks if the player's coordinates are included
     * in the enemy's coordinates range (if an enemy hits our character)
     * @return boolean - true if collision occurs
     */
Enemy.prototype.collision = function() {
    return (player.y > (this.y + 20 - 41) // 41 is half of the enemy's height
            && player.y < (this.y + 20 + 41)
            && player.x < (this.x + 50) // 50 is half of the enemy's width
            && player.x > (this.x - 50));
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Initial conditions of our character:
    this.initX = 202;
    this.initY = 415;
    this.x = this.initX;
    this.y = this.initY;
    this.speed = 2000;
    this.sprite = 'images/char-boy.png';
    this.scores = 0;
    this.lives = 5;
};

/* @description prevents our character going off the canvas
 * and restores its initial position once it reaches the water
 */
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 404) {
        this.x = 404;
    }
    if (this.y > 606 - 171) {
        this.y = 606 - 171;
    }
    if (this.y <= 0) { // true: water reached
        this.x = this.initX;
        this.y = this.initY;
        this.scores += 5;
    }
    if (this.scores === 450) {
        window.alert("!!! YOU WON !!!");
        window.location.reload();
    }
};

/* @description method called from checkCollisions(). It
 * updates player's lives and ends game if lives=0
 */
Player.prototype.updateLives = function() {
        this.lives -= 1;
        if (this.lives === 0) {
            window.alert("!!! GAME OVER !!!");
            window.location.reload();
        }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* @description moves the character in the four directions
 * up,down,right,left if 'keydown' event occurs
 * @parameters string input - the keydown.keyCode
 */
Player.prototype.handleInput = function(input) {
    var move = this.speed*myDt;
    if (input === 'left' && this.x >= 0) {
        this.x -= move;
    }
    // 101 is the character's width
    if (input === 'right' && this.x <= (505 - 101)) {
        this.x += move;
    }
    if (input === 'up' && this.y >= 0) {
        this.y -= move;
    }
    // 171 is the character's height
    if (input === 'down' && this.y <= (606 - 171)) {
        this.y += move;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var player = new Player ();

/* @description generates n Enemy instances with random speed
 * and vertical position and pushes them in the allEnemies array.
 * This function is called from the app.js reset() function.
 * @parameters integer level - the game's difficulty level
 */
function enemiesGenerator(level) {
    var randomRow;
    var speed;
    var n = 2 + level; // enemies to be generated
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

// @description renders player's scores and lives on the canvas
function renderScoresLives() {
    ctx.font = "16px Impact";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText("SCORE: " + player.scores, 10, 80);
    ctx.strokeText("SCORE: "+ player.scores, 10, 80);
    ctx.fillText("LIVES: " + player.lives, 10, 100);
    ctx.strokeText("LIVES: "+ player.lives, 10, 100);
}
// @description renders the current difficulty level on the canvas
function renderLevel(level) {
    ctx.font = "16px Impact";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText("LEVEL: " + level, 10, 120);
    ctx.strokeText("LEVEL: "+ level, 10, 120);
}