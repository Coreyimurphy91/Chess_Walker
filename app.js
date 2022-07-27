// GLOBAL DOM / VARIABLES
console.log('Knight Walker');
const map = document.querySelector('.map');
const movement = document.getElementById('movement');
const canvas = document.getElementById('canvas');
const status = document.getElementById('status');
const ctx = canvas.getContext('2d'); //creates a 2D canvas
let knight;
let rook;
let bishop;
let queen;
let king;

// ---------------- Images -------------------  //
const kPiece = document.getElementById('kPiece');
const bgBlack = document.getElementById('bgBlack');
const bgWhite = document.getElementById('bgWhite');


// ---------------- Canvas Rendering ----------  //
canvas.width = 840;
canvas.height = 840;
//    map.style.transform = `translate3d(1368px,1363px, 0 )`;
// canvas.setAttribute('height', getComputedStyle(canvas)['height']);
// canvas.setAttribute('width', getComputedStyle(canvas)['width']);

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

knight = new Player(365, 365, kPiece, 100, 100);
bgBlacksquare = new Player(0, 0, bgBlack, 840, 840)
bgWhitesquare = new Player(0, 0, bgWhite, 840, 840)

bgWhitesquare.render();
bgBlacksquare.render();
knight.render();


function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    // check to see if shrek is alive
    if (knight.alive) {
        // render shrek
        knight.render();

        // @todo - check for collision
        // let hit = detectHit(donkey, shrek);
    }

}


// ---------------- Movement ------------ //
function movementHandler(e) { // e just means event (what keydown recognizes)
    console.log('movement', e.key)

    switch(e.key) {
        case 'r': 
            knight.x = 365 && knight.y = 365 ? (knight.x -= 40) && (knight.x -= 15) : null;
        break;
    }
}