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

    class Player {

    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies() {

    }

    function displayStatusText() {

    }

    const input = new InputHandler();

    function animate() {

    }


});

/*
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
*/
