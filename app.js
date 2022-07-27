// GLOBAL DOM / VARIABLES
console.log('Knight Walker');
const map = document.querySelector('.map');
const movement = document.getElementById('movement');
const canvas = document.getElementById('canvas');
const status = document.getElementById('status');
const ctx = game.getContext('2d'); //creates a 2D canvas
let knight;
let rook;
let bishop;
let queen;
let king;

// ---------------- Canvas Rendering ----------  //

//    map.style.transform = `translate3d(1368px,1363px, 0 )`;

// ---------------- Entities ------------------  //
class Player {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y
        this.width = 100
        this.height = 100
        this.color = color;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

knight = new Player(57, 114, black, )