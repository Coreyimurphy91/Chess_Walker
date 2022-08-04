// -------------- GLOBAL DOM / VARIABLES ------ //
// console.log('Knight Walker');
const map = document.querySelector('.map');
const movement = document.getElementById('movement');
const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d'); //creates a 2D canvas
const beginClick = document.getElementById('btm-right');
// const moveArrayOrthag = [114, -114]
let lastMove = new Date().getTime();
let lastQueen = new Date().getTime();
let startClick = false;
let captureByR = false;
let captureByB = false;
let captureByQ = false;
let knight;
let rook1, rook2, rook3, rook4, rook5, rook6, rook7, rookA, rookB, rookC, rookD, rookE, rookF, rookG;
let bishop1, bishop2, bishop3, bishop4, bishop5, bishop6;
let queen1, queen2, queen3;
// let player3;

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
    constructor(x, y, image, width, height, type, name) {
        this.x = x;
        this.y = y;
        this.initialx = x;
        this.initialy = y;
        this.width = width
        this.height = height
        this.image = image;
        this.type = type;
        this.name = name;
        this.direction = 114;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        this.move = function() {
            requestAnimationFrame(() => {
                if(this.type === 'right'){
                    if(this.x < 1500) {
                        this.x += this.direction;
                        } else {
                        this.x = x;
                        }
                    } 
                    if(this.type === 'left'){
                        if(this.x > -1500) {
                            this.x -= this.direction;
                        } else {
                            this.x = x;
                        }
                    } 
                    if(this.type === 'diagrd'){
                        if(this.x < 1500) {
                            this.x += this.direction;
                            this.y += this.direction;
                        } else {
                            this.x = x;
                            this.y = y;
                        }
                    }
                    if(this.type === 'diagru'){
                        if(this.x < 1500) {
                            this.x += this.direction;
                            this.y -= this.direction;
                        } else {
                            this.x = x;
                            this.y = y;
                        }
                    }
                    if(this.type === 'diagl'){
                        if(this.x > -1500) {
                            this.x -= this.direction;
                            this.y += this.direction;
                        } else {
                            this.x = x;
                            this.y = y;
                        }
                    }
                    if(this.type === 'diaglu'){
                        if(this.x > 1500) {
                            this.x -= this.direction;
                            this.y -= this.direction;
                        } else {
                            this.x = x;
                            this.y = y;
                        }
                    }
                    if(this.type === 'down'){
                        if(this.y < 1500) {
                            this.y += this.direction;
                        } else {
                            this.y = y;
                        }
                    }
        })
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

// Main player
knight = new Player(365, 370, kPiece, 100, 100);

// Backgrounds
bgBlacksquare = new BackgroundImg(0, 0, bgBlack, 840, 840);
bgWhitesquare = new BackgroundImg(0, 0, bgWhite, 840, 840);
bgStartMenu = new BackgroundImg(0, 0, startMenuImg, 840, 840);

// Enemy pieces
rook1 = new Opponent(-529, 721, wRook, 65, 80, 'right', 'rook');
rook2 = new Opponent(-187, 607, wRook, 65, 80, 'right', 'rook');
rook3 = new Opponent(1067, 493, wRook, 65, 80, 'left', 'rook');
rook4 = new Opponent(-985, 379, wRook, 65, 80, 'right', 'rook');
rook5 = new Opponent(1295, 265, wRook, 65, 80, 'left', 'rook');
rook6 = new Opponent(1523, 151, wRook, 65, 80, 'left', 'rook');
rook7 = new Opponent(-415, 37, wRook, 65, 80, 'right', 'rook');
bishop1 = new Opponent (-305, -423, wBishop, 70, 90, 'diagrd', 'bishop');
bishop2 = new Opponent (-420, -761, wBishop, 70, 90, 'diagrd', 'bishop');
bishop3 = new Opponent (-77, 717, wBishop, 70, 90, 'diagru', 'bishop');
bishop4 = new Opponent (1700, 1800, wBishop, 70, 90, 'diagl', 'bishop');
bishop5 = new Opponent (1800, 1800, wBishop, 70, 90, 'diagl', 'bishop');
bishop6 = new Opponent (1800, 1800, wBishop, 70, 90, 'diaglu', 'bishop');
queen1 = new Opponent (262, 28, wQueen, 80, 100, 'diagru', 'queen');
queen2 = new Opponent (262, 28, wQueen, 80, 100, 'diaglu', 'queen');
queen3 = new Opponent (262, 28, wQueen, 80, 100, 'down', 'queen');
queen3 = new Opponent (262, 28, wQueen, 80, 100, 'up', 'queen');
// player3 = new Player2 (); // OhZ

let opponentArray = [rook1, rook2, rook3, rook4, rook5, rook6, rook7, bishop1, bishop2, bishop3, bishop4, bishop5, bishop6, queen1, queen2, queen3]


// ---------------- Player Movement ----- //
function movementHandler(e) { // e just means event (what keydown recognizes)
    // console.log('movement', e.key)

    switch(e.key) {
        case 'r': 
            // keys.e.pressed = true;
            if (knight.x < 590 && knight.y > 35) {
                knight.x += 228;
                knight.y -= 114;
            } // solved
            // knight.x < 590 ? (knight.x += 228) : null;
            // knight.y > 252 ? (knight.y -= 114) : null;
                break;
        case 'f': 
            // keys.d.pressed = true;
            if (knight.x < 590 && knight.y < 705) {
                knight.x += 228;
                knight.y += 114;
            } // solved
            // knight.x < 590 ? (knight.x += 228) : null;
            // knight.y < 478 ? (knight.y += 114) : null;
                break;
        case 'd': 
            // keys.c.pressed = true;
            if (knight.x < 700 && knight.y < 595) {
                knight.x += 114;
                knight.y += 228;
            } // solved
            // knight.x += 114;
            // knight.y += 228;
                break;
        case 's': 
            // keys.x.pressed = true;
            if (knight.x > 130 && knight.y < 595) {
                knight.x -= 114;
                knight.y += 228;
            } // solved
            // knight.x -= 114;
            // knight.y += 228;
                break;
        case 'a': 
            // keys.s.pressed = true;
            if (knight.x > 250 && knight.y < 705 ) {
                knight.x -= 228;
                knight.y += 114;
            } // solved
            // knight.x -= 228;
            // knight.y += 114;
                break;
        case 'q': 
            // keys.w.pressed = true;
            if (knight.x > 250 && knight.y > 35) {
                knight.x -= 228;
                knight.y -= 114;
            } // solved
            // knight.x -= 228;
            // knight.y -= 114;
                break;
        case 'w': 
            // keys.2.pressed = true;
            if (knight.x > 30 && knight.y > 145) {
                knight.x -= 114;
                knight.y -= 228;
            } // solved
            // knight.x -= 114;
            // knight.y -= 228;
                break;
        case 'e': 
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
            // console.log(whoTook())
            if (computer.name === 'rook') {
                captureByR = true;
            } else if (computer.name === 'bishop') {
                captureByB = true;
            } else {
                captureByQ = true;
            }
        }

}


function detectFriendlyFire(player, computer) {
    let hitTest = 
        player.y + player.height > computer.y && 
        player.y < computer.y + computer.height && // BOOLEAN
        player.x + player.width > computer.x &&  // CONDITION
        player.x < computer.x + computer.width;

        if (hitTest) {
            computer.x = computer.intialx;
            computer.y = computer.initialy;
        }

}

// ---------------- Game Functions ------- //



// Function to increase score until failure
function scoreUp() {
        let addingScore = Number(score.textContent) + 1;
        score.textContent = addingScore;
}

// Function to remove start-guide and begin game
beginClick.addEventListener('click', function readyToPlay() {
    // debugger;
    startClick = true;
    // console.log(startClick);
    setInterval(scoreUp, 400);
    // whoTook();
}) 

// function endGame() {
//     if(captureByR === true) {
//         bgStartMenu.render();
//     } else if (captureByB === true) {

//     } else {

//     }
// }

// Main game loop
function gameLoop() {
    // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
    window.requestAnimationFrame(gameLoop)
    bgStartMenu.render();
    if (startClick === true) {
        document.addEventListener('keydown', movementHandler); // listen for movement
        // bgWhitesquare.render();
        bgBlacksquare.render();
        knight.render();
        const currentTime = new Date().getTime();
        if (lastMove + 1200 < currentTime) {
            // rook1.move(), rook2.move(), rook3.move(), rook4.move(), rook5.move(), rook6.move(), rook7.move();
            // bishop1.move(), bishop2.move(), bishop3.move(), bishop4.move(), bishop5.move(), bishop6.move();
            // queen1.move();
            opponentArray.forEach((opponent) => {
                opponent.move()
            })
            lastMove = currentTime;
        }
        if (lastQueen + 700 < currentTime) {
            queen1.move();
            lastQueen = currentTime;
        }
        rook1.render(), rook2.render(), rook3.render(), rook4.render(), rook5.render(), rook6.render(), rook7.render();
        bishop1.render(), bishop2.render(), bishop3.render(), bishop4.render(), bishop5.render(), bishop6.render();
        queen1.render();
        let captureR1 = detectHit(knight, rook1);
        let captureR2 = detectHit(knight, rook2);
        let captureR3 = detectHit(knight, rook3);
        let captureR4 = detectHit(knight, rook4);
        let captureR5 = detectHit(knight, rook5);
        let captureR6 = detectHit(knight, rook6);
        let captureR7 = detectHit(knight, rook7);
        let captureB1 = detectHit(knight, bishop1);
        let captureB2 = detectHit(knight, bishop2);
        let captureB3 = detectHit(knight, bishop3);
        let captureB4 = detectHit(knight, bishop4);
        let captureB5 = detectHit(knight, bishop5);
        let captureB6 = detectHit(knight, bishop6);
        let captureQ = detectHit(knight, queen1);
        let ff1 = detectFriendlyFire(rook7, queen1);
        let ff2 = detectFriendlyFire(rook7, bishop1);
        let ff3 = detectFriendlyFire(rook7, bishop2);
        let ff4 = detectFriendlyFire(rook7, bishop3);
        let ff5 = detectFriendlyFire(rook7, queen1);
        let ff6 = detectFriendlyFire(rook7, queen1);
        let ff7 = detectFriendlyFire(rook7, queen1);
        endGame();
    // } else if(captureByR = true) {
    //     bgStartMenu.render();
    }
    else {
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


// Failed function to determine which piece captured the knight
// function whoTook() {
//     // debugger;
//     if (rook1.x = knight.x) {
//         captureByR = true;
//     } 
//     if (detectHit(knight, bishop1)){
//         captureByB = true;
//     }
//     if (detectHit(knight, queen1)){{
//         captureByQ = true;
//     }
// }
// }