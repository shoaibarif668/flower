
const ctx = canvas.getContext("2d");

const petal = [
    [
        [0, 0],
        [0.3, -1],
        [0.7, -1],
        [1, 0],
        [0.7, 1],
        [0.3, 1],
        [0, 0]
    ],
    [
        [0, 0],
        [1, 0]
    ],
];

function drawPetal(path, width, height) {
    let i = 0;
    do { // loop through paths
        const p = path[i];
        let j = 0;
        ctx.moveTo(p[j][0] * width, p[j++][1] * height);
        while (j < p.length - 1) {
            ctx.lineTo(p[j][0] * width, p[j++][1] * height);
        }
        if (p[j][0] === p[0][0] && p[j][1] === p[0][1]) { // is the path closed ?
            ctx.closePath();
        } else {
            ctx.lineTo(p[j][0] * width, p[j][1] * height)
        }
    } while (++i < path.length);
}

function drawPetals(x, y, count, startAt, petal, width, height) {
    const step = (Math.PI * 2) / count;
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.rotate(startAt);
    for (let i = 0; i < count; i += 1) {
        drawPetal(petal, width, height);
        ctx.rotate(step);

    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default
}

function drawFlower(col, lineWidth, fitScale, petalCount) {
    ctx.strokeStyle = col;
    ctx.lineWidth = lineWidth;
    const size = Math.min(ctx.canvas.width, ctx.canvas.height) * fitScale * 0.5;
    ctx.beginPath();

    drawPetals(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, -Math.PI / 2, petal, size, size * 0.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, size * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
}


drawFlower("white", 4, 0.95, 10);