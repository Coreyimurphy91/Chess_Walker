// -------------- GLOBAL DOM / VARIABLES ------ //
console.log('Knight Walker');
const map = document.querySelector('.map');
const movement = document.getElementById('movement');
const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d'); //creates a 2D canvas
const beginClick = document.getElementById('btm-right');
// const moveArrayOrthag = [114, -114]
let lastMove = new Date().getTime();
let startClick = false;
let captureByR = false;
let captureByB = false;
let captureByQ = false;
let knight;
let rook1, rook2, rook3, rook4, rook5, rook6, rook7, rookA, rookB, rookC, rookD, rookE, rookF, rookG;
let bishop;
let queen;
let player3;

// ---------------- Images -------------------  //
const kPiece = document.getElementById('kPiece');
const bgBlack = document.getElementById('bgBlack');
const bgWhite = document.getElementById('bgWhite');
const startMenuImg = document.getElementById('help');
const wRook = document.getElementById('wRook');
const wBishop = document.getElementById('wBishop');
const wQueen = document.getElementById('wQueen');
// const startMenu = new Image ();
// startMenu.src = 'images/guide.png';
// const img = document.createElement('img');


// ---------------- EVENT LISTENERS ----------  //
window.addEventListener('DOMContentLoaded', function() {

    // const beginGame = setInterval(startGame, 60); OLD START
    const rungame = setInterval(gameLoop, 60);
});

// ---------------- Canvas Rendering ----------  //
canvas.width = 840;
canvas.height = 840;

// ---------------- Buttons -------------------  //
document.getElementById('btm-right').onmousedown = function() {
    document.getElementById('btm-right').style.color = 'rgb(44, 77, 114)';
    document.getElementById('btm-right').style.backgroundColor = 'rgba(210, 177, 140, .15)';
    // guide.style.display = "inline";
    // document.querySelector('body').appendChild(img);
}
document.getElementById('btm-right').onmouseleave = function() {
    document.getElementById('btm-right').style.color = 'rgb(210, 177, 140)';
    document.getElementById('btm-right').style.backgroundColor = 'rgba(210, 177, 140, .25)';
}

// ---------------- Entities ------------------  //


class Player {
    constructor(x, y, image, width, height) {
        this.x = x,
        this.y = y
        this.width = width
        this.height = height
        this.image = image;
        this.alive = true;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}

const gravity = 1.5;

class Opponent {
    constructor(x, y, image, width, height, type) {
        this.x = x,
        this.y = y
        this.width = width
        this.height = height
        this.image = image;
        this.type = type;
        this.direction = 114;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        // this.move = function() {
        //     requestAnimationFrame(() => {
        //         if(this.type === 'orthag'){
        //             if(Math.floor(Math.random()* 2) == 0) {
        //                 this.x += this.direction;
        //             } else {
        //                 this.y += this.direction;
        //             }
        //             } else if (this.type === 'diag') {
        //                 this.x += moveArrayOrthag[Math.floor(Math.random()* 2)];
        //                 this.y += moveArrayOrthag[Math.floor(Math.random()* 2)];
        //             } else if (this.type === 'omni') {
        //                 this.x += moveArrayOrthag[Math.floor(Math.random()* 2)];
        //         }
        //     } )
        // }
        this.move = function() {
            requestAnimationFrame(() => {
                if(this.type === 'right'){
                    if(this.x < 1500) {
                        this.x += this.direction;
                    } else {
                        this.x = x;
                    }
                    } else if(this.type === 'left'){
                    if(this.x > -1500) {
                        this.x -= this.direction;
                    } else {
                        this.x = x;
                    }
            }})
        }
    }
}


class BackgroundImg {
    constructor(x, y, image, width, height) {
        this.x = x,
        this.y = y
        this.width = width
        this.height = height
        this.image = image;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}

knight = new Player(365, 370, kPiece, 100, 100);
bgBlacksquare = new BackgroundImg(0, 0, bgBlack, 840, 840);
bgWhitesquare = new BackgroundImg(0, 0, bgWhite, 840, 840);
bgStartMenu = new BackgroundImg(0, 0, startMenuImg, 840, 840);
rook1 = new Opponent(-529, 721, wRook, 65, 80, 'right');
rook2 = new Opponent(-187, 607, wRook, 65, 80, 'right');
rook3 = new Opponent(1067, 493, wRook, 65, 80, 'left');
rook4 = new Opponent(-985, 379, wRook, 65, 80, 'right');
rook5 = new Opponent(1295, 265, wRook, 65, 80, 'left');
rook6 = new Opponent(1523, 151, wRook, 65, 80, 'left');
rook7 = new Opponent(-415, 37, wRook, 65, 80, 'right');
bishop = new Opponent (152, 33, wBishop, 70, 90, 'diag');
queen = new Opponent (262, 28, wQueen, 80, 100, 'omni');
// player3 = new Player2 (); // OhZ



// ---------------- Movement ------------ //
function movementHandler(e) { // e just means event (what keydown recognizes)
    console.log('movement', e.key)

    switch(e.key) {
        case 'e': 
            // keys.e.pressed = true;
            if (knight.x < 590 && knight.y > 35) {
                knight.x += 228;
                knight.y -= 114;
            } // solved
            // knight.x < 590 ? (knight.x += 228) : null;
            // knight.y > 252 ? (knight.y -= 114) : null;
                break;
        case 'd': 
            // keys.d.pressed = true;
            if (knight.x < 590 && knight.y < 705) {
                knight.x += 228;
                knight.y += 114;
            } // solved
            // knight.x < 590 ? (knight.x += 228) : null;
            // knight.y < 478 ? (knight.y += 114) : null;
                break;
        case 'f': 
            // keys.c.pressed = true;
            if (knight.x < 700 && knight.y < 595) {
                knight.x += 114;
                knight.y += 228;
            } // solved
            // knight.x += 114;
            // knight.y += 228;
                break;
        case 'a': 
            // keys.x.pressed = true;
            if (knight.x > 130 && knight.y < 595) {
                knight.x -= 114;
                knight.y += 228;
            } // solved
            // knight.x -= 114;
            // knight.y += 228;
                break;
        case 's': 
            // keys.s.pressed = true;
            if (knight.x > 250 && knight.y < 705 ) {
                knight.x -= 228;
                knight.y += 114;
            } // solved
            // knight.x -= 228;
            // knight.y += 114;
                break;
        case 'w': 
            // keys.w.pressed = true;
            if (knight.x > 250 && knight.y > 35) {
                knight.x -= 228;
                knight.y -= 114;
            } // solved
            // knight.x -= 228;
            // knight.y -= 114;
                break;
        case 'q': 
            // keys.2.pressed = true;
            if (knight.x > 30 && knight.y > 145) {
                knight.x -= 114;
                knight.y -= 228;
            } // solved
            // knight.x -= 114;
            // knight.y -= 228;
                break;
        case 'r': 
            // keys.3.pressed = true;
            if (knight.x < 700 && knight.y > 145) {
                knight.x += 114;
                knight.y -= 228;
            } // solved
            // knight.x += 114;
            // knight.y -= 228;
                break;
    }
    
}
// ---------------- Hit Test ------------- //
function detectHit(player, computer) {
    let hitTest = 
        player.y + player.height > computer.y && 
        player.y < computer.y + computer.height && // BOOLEAN
        player.x + player.width > computer.x &&  // CONDITION
        player.x < computer.x + computer.width;

        if (hitTest) {
            setTimeout(gameLoop, 0);
            
        }

}

// ---------------- Game Functions ------- //

console.log(captureByQ);
// Determine which piece captured the knight
function whoTook() {
    // debugger;
    if (detectHit(knight, rook1)) {
        captureByR = true;
    } 
    if (detectHit(knight, bishop)){
        captureByB = true;
    }
    if (detectHit(knight, queen)){{
        captureByQ = true;
    }
}
}

// Function to increase score until failure
function scoreUp() {
        let addingScore = Number(score.textContent) + 1;
        score.textContent = addingScore;
}

// Function to remove start-guide and begin game
beginClick.addEventListener('click', function readyToPlay() {
    // debugger;
    startClick = true;
    console.log(startClick);
    setInterval(scoreUp, 400);
    whoTook();
}) 

// Main game loop
function gameLoop() {
    // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
    window.requestAnimationFrame(gameLoop)
    bgStartMenu.render();
    // check to see if knight is alive
    if (startClick === true) {
        document.addEventListener('keydown', movementHandler); // listen for movement
        // bgWhitesquare.render();
        bgBlacksquare.render();
        // imggg.render();
        knight.render();
        // @todo - check for collision
        // let hit = detectHit(donkey, shrek);
        const currentTime = new Date().getTime();
        if (lastMove + 400 < currentTime) {
            rook1.move(), rook2.move(), rook3.move(), rook4.move(), rook5.move(), rook6.move(), rook7.move();
            bishop.move();
            queen.move();
            lastMove = currentTime;
        }
        rook1.render(), rook2.render(), rook3.render(), rook4.render(), rook5.render(), rook6.render(), rook7.render();
        bishop.render();
        queen.render();
        let captureR1 = detectHit(knight, rook1);
        let captureR2 = detectHit(knight, rook2);
        let captureR3 = detectHit(knight, rook3);
        let captureR4 = detectHit(knight, rook4);
        let captureR5 = detectHit(knight, rook5);
        let captureR6 = detectHit(knight, rook6);
        let captureR7 = detectHit(knight, rook7);
        let captureB = detectHit(knight, bishop);
        let captureQ = detectHit(knight, queen);
    } else {
        bgStartMenu.render();
    }
}




// ---------------- Unused Code ----------  //
// const keys = {
    //     2: {
    //         pressed: false
    //     },
    //     3: {
    //         pressed: false
    //     },
    //     w: {
    //         pressed: false
    //     },
    //     e: {
    //         pressed: false
    //     },
    //     s: {
    //         pressed: false
    //     },
    //     d: {
    //         pressed: false
    //     },
    //     x: {
    //         pressed: false
    //     },
    //     c: {
    //         pressed: false
    //     }
    // };

    // Old Menu image calling
    // guide.style.display = "none";
    // document.querySelector('body').removeChild(img);
// }
// function guideFunction() {
//     const popup = document.getElementById("myPopup");
//     popup.classList.toggle("show");
//   }


// Unnecessary start loop/function
// function startGame() {
//     if (startClick = false) {
//         // animateStartGame();
//         requestAnimationFrame(startGame);
//         bgStartMenu.render();
//     } else {
//         gameLoop();
//     }
// }

//Joel's math for sporadic movement.
//     } else if (this.type === 'diag') {
                //         this.x += moveArrayOrthag[Math.floor(Math.random()* 2)];
                //         this.y += moveArrayOrthag[Math.floor(Math.random()* 2)];
                //     } else if (this.type === 'omni') {
                //         this.x += moveArrayOrthag[Math.floor(Math.random()* 2)];