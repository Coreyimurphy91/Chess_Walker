// GLOBAL DOM / VARIABLES
console.log('Knight Walker');
const map = document.querySelector('.map');
const movement = document.getElementById('movement');
const canvas = document.getElementById('canvas');
const status = document.getElementById('status');
const startMenuImg = document.getElementById('help');
const ctx = canvas.getContext('2d'); //creates a 2D canvas
const img = document.createElement('img');
const startMenu = new Image ();
startMenu.src = 'images/guide.png';
let knight;
let rook;
let bishop;
let queen;
let king;

// ---------------- Images -------------------  //
const kPiece = document.getElementById('kPiece');
const bgBlack = document.getElementById('bgBlack');
const bgWhite = document.getElementById('bgWhite');

// ---------------- EVENT LISTENERS ----------  //
window.addEventListener('DOMContentLoaded', function() {

    // const startGame = setInterval(gameMenu, 60);
    const rungame = setInterval(gameLoop, 60);
});


// ---------------- Canvas Rendering ----------  //
canvas.width = 840;
canvas.height = 840;

// ---------------- Buttons -------------------  //
document.getElementById('btm-right').onmousedown = function() {
    document.getElementById('btm-right').style.color = 'rgb(44, 77, 114)';
    document.getElementById('btm-right').style.backgroundColor = 'rgba(210, 177, 140, .15)';
    guide.style.display = "inline";
    document.querySelector('body').appendChild(img);
}
document.getElementById('btm-right').onmouseleave = function() {
    document.getElementById('btm-right').style.color = 'rgb(210, 177, 140)';
    document.getElementById('btm-right').style.backgroundColor = 'rgba(210, 177, 140, .25)';
    guide.style.display = "none";
    document.querySelector('body').removeChild(img);
}
function guideFunction() {
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

// ---------------- Event Listeners -----------  //

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

knight = new Player(365, 370, kPiece, 100, 100);
bgBlacksquare = new Player(0, 0, bgBlack, 840, 840)
bgWhitesquare = new Player(0, 0, bgWhite, 840, 840)
imggg = new Player(0,0, img, 840, 840)





// ---------------- Movement ------------ //
document.addEventListener('keydown', movementHandler);

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
        case 'c': 
            // keys.c.pressed = true;
            if (knight.x < 700 && knight.y < 595) {
                knight.x += 114;
                knight.y += 228;
            } // solved
            // knight.x += 114;
            // knight.y += 228;
                break;
        case 'x': 
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
        case '2': 
            // keys.2.pressed = true;
            if (knight.x > 30 && knight.y > 145) {
                knight.x -= 114;
                knight.y -= 228;
            } // solved
            // knight.x -= 114;
            // knight.y -= 228;
                break;
        case '3': 
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

const keys = {
    2: {
        pressed: false
    },
    3: {
        pressed: false
    },
    w: {
        pressed: false
    },
    e: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    x: {
        pressed: false
    },
    c: {
        pressed: false
    }
};

function startGame() {
    window.requestAnimationFrame(gameMenu)
    imggg.render();
}

function gameLoop() {
    // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
    window.requestAnimationFrame(gameLoop)
    // check to see if knight is alive
    if (knight.alive) {
        // render shre
        // bgWhitesquare.render();
        bgBlacksquare.render();
        // imggg.render();
        knight.render();
        // @todo - check for collision
        // let hit = detectHit(donkey, shrek);
     
    }

}