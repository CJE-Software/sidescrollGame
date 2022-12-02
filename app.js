/*
Wrapping your code in an anonymous function like this prevents variable collision if it were to be integrated with another program, it also helps with security
*/
window.addEventListener('load', function() {

    /** @type {HTMLCanvasElement} */
    //initial JavaScript setup for canvas animation and Game Development *****START*****
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    //CANVAS_WIDTH = canvas.width = 800;
    //CANVAS_HEIGHT = canvas.height = 720;
    //initial JavaScript setup for canvas animation and Game Development *****END*****
    //image test
    //ctx.fillStyle = 'white';
    //ctx.fillRect(50, 50, 100, 150);
    //^should create a white rectangle at 50px x / 50px y, that is 100px wide / 150px height

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight')
                        && this.keys.indexOf(e.key) === -1) {
                        this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e => {
                if (    e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0; //if pos move toon right if neg move toon left
            this.velocityY = 0; //vertical jump speed
            this.weight = 1; //gravity or opposing force to bring toon back down
        }
        draw(context) {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input) {
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.velocityY -= 33;
            } else {
                this.speed = 0;
            }
            //adds horizontal mvmnt to toon
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            //vertical movement
            this.y += this.velocityY;
            if (!this.onGround()) {
                this.velocityY += this.weight;
                this.frameY = 1;
            } else {
                this.velocityY = 0;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
            //this is a global utility method used to check if toon is on the ground
        }
    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies() {

    }

    function displayStatusText() {

    }

    const input = new InputHandler(); //by instantiating the code here all the code in the class called InputHandler() will be run ^.^
    const player = new Player(canvas.width, canvas.height);
    player.draw(ctx);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();


});

/*
TERMINOLOGY:
toon = 'the player character' main character
ES6 arrow functions do not bind their own 'this', but they inherit the one from their parent scope, this is called 'lexical scoping' refer to class of InputHandler()
if (e.key === 'ArrowDown' && this.keys.indexOf(e.key) === -1)
the above code asks if key is equal to arrowdown key and if key is not already in the array called 'keys'
CODE
    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight')
                        && this.keys.indexOf(e.key) === -1) {
                        this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
            });
            window.addEventListener('keyup', e => {
                if (    e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key, this.keys);
            });
        }
    }
CODE
^^^the above code checks to see if a key has been pressed if it has it is added to an array called keys, everytime a key is pressed it is registered to an array everytime you release the key it is popped off of the array using the indexOf method inside the splice method to remove it
if key up down left or right is pressed and it is not already currently in the array we push it into the array if it already exists we ignore THEN whenan of the four direction keys is released or on 'keyUp' we find the 'indexof' that key in the array 'keys'and we remove it using the splice method

IMPORTANT when creating sprite sheets for your game try to keep the size of each individual sprite in close association with the size of your game window aka if your game window is 500 by 500 px don't create a single sprite frame that is 400px wide and 400px tall because you will have to resize the image and this takes away pc resources...IN SHORT create sprite sheets in a way that the sprites size is relative to the canvas size you intend on using(^.^) PRO TIP

CODE
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clears old paint
        player.draw(ctx); //draws the player
        player.update(); //adds animation and logic to display new image on next frame
        requestAnimationFrame(animate); //cause the animate() func to run indefinitly
    }
    animate();
CODE
^^^the above code is very important it tell the browser to update the screen with a new image each time it is called it then uses the requestAnimationFrame(animate) to continuasly call itself, games and animations are just the page updating really fast and showing you a new image each time maybe with slight movements in the x and y axis of the objects you place on the canvas. this is a fundamental concept of building single thread browser applications/animations/games. remember the page reloads using this function so whatever is written inside this function will be called multiple times per second depending on the speed of the machine you are running<---this is where deltaTime comes in to play if you want your applications animations and games to perform the same regardless of the hardware you use it on you are going to want to use deltaTime functions which compare the current frame with the frame before it to keep the frames running at a specific rate regardless of how fast the machine can update said frames...seriously...go...now....go watch a video on deltaTime and integrating deltaTime into your applications YOU WILL thank me later (^.^)..also dont forget to actually call your animate function like so: animate(); once it is called it will continue being called until the logic you have coded into the application tells it to stop or if you close your application
*/
