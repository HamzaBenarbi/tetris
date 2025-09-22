const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const nextCanvas = document.getElementById('next-piece');
const nextContext = nextCanvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

context.scale(20, 20);
nextContext.scale(30, 30); 

const grid = createMatrix(12, 20);
const player = {
    pos: { x: 5, y: 0 },
    matrix: null,
    score: 0,
    next: null
};

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF'
];

const pieces = 'ILJOTSZ';
const shapes = {
    I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    L: [[0, 2, 0], [0, 2, 0], [0, 2, 2]],
    J: [[0, 3, 0], [0, 3, 0], [3, 3, 0]],
    O: [[4, 4], [4, 4]],
    T: [[0, 5, 0], [5, 5, 5], [0, 0, 0]],
    S: [[0, 6, 6], [6, 6, 0], [0, 0, 0]],
    Z: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
};

const sounds = {
    move: new Audio('sounds/move.mp3'),
    rotate: new Audio('sounds/rotate.mp3'),
    line: new Audio('sounds/line.mp3'),
    gameover: new Audio('sounds/gameover.mp3')
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let gameRunning = false;

function createMatrix(w, h) {
    const matrix = [];
    while (h--) matrix.push(new Array(w).fill(0));
    return matrix;
}

function collide(grid, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (grid[y + o.y] && grid[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge(grid, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                grid[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function drawMatrix(matrix, offset, ctx) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(grid, { x: 0, y: 0 }, context);
    drawMatrix(player.matrix, player.pos, context);

    nextContext.fillStyle = '#000';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    drawMatrix(player.next, { x: 1, y: 1 }, nextContext); 
}

function playerDrop() {
    player.pos.y++;
    if (collide(grid, player)) {
        player.pos.y--;
        merge(grid, player);
        playerReset();
        sweep();
        sounds.line.play();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(grid, player)) {
        player.pos.x -= dir;
    } else {
        sounds.move.play();
    }
}

function playerRotate() {
    const pos = player.pos.x;
    let offset = 1;
    rotateMatrix(player.matrix);
    while (collide(grid, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotateMatrix(player.matrix, true);
            player.pos.x = pos;
            return;
        }
    }
    sounds.rotate.play();
}

function rotateMatrix(matrix, reverse = false) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (!reverse) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerReset() {
    if (!player.matrix) {
        player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
    }
    player.next = player.next || createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
    player.matrix = player.next;
    player.next = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
    player.pos.y = 0;
    player.pos.x = (grid[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if (collide(grid, player)) {
        grid.forEach(row => row.fill(0));
        player.score = 0;
        sounds.gameover.play();
        gameRunning = false;
        startBtn.textContent = 'Demarrer';
    }
    scoreElement.textContent = player.score;
}

function createPiece(type) {
    return shapes[type].map(row => [...row]);
}

function sweep() {
    let rowCount = 1;
    outer: for (let y = grid.length - 1; y >= 0; --y) {
        for (let x = 0; x < grid[y].length; ++x) {
            if (grid[y][x] === 0) {
                continue outer;
            }
        }
        const row = grid.splice(y, 1)[0].fill(0);
        grid.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function update(time = 0) {
    if (!gameRunning) return;
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (!gameRunning) return;
    if (event.key === 'ArrowLeft') {
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        playerDrop();
    } else if (event.key === 'ArrowUp') {
        playerRotate();
    }
});

startBtn.addEventListener('click', () => {
    gameRunning = !gameRunning;
    startBtn.textContent = gameRunning ? 'Pause' : 'Demarrer';
    if (gameRunning && !player.matrix) {
        playerReset();
    }
    update();
});

playerReset();
draw();

