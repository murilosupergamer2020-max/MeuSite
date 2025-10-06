let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

// Variáveis globais para acesso em todo o script
let x, y, ix, iy, px, py;
let velNormal, velDash, vel, ivel;
let jogo;
let tecla = {};
let tempo;
let barra_dash;
let historico = [];

function inicio() {
    x = 225;
    y = 225;
    ix = 450;
    iy = 450;
    px = Math.round(Math.random() * 475);
    py = Math.round(Math.random() * 475);
    velNormal = 5;
    velDash = 20;
    vel = 5;
    ivel = 3;
    jogo = true;
    tempo = 0;
    barra_dash = 50;
    historico = [];
    loop();
}

document.addEventListener("keydown", function(event) {
    tecla[event.key] = true;
});
document.addEventListener("keyup", function(event) {
    tecla[event.key] = false;
});

function loop() {
    velDash = velNormal * 4;

    // Dash
    if (tecla[" "] && tempo === 0) {
        vel = velDash;
        tempo = Date.now();
    }
    if (tempo !== 0 && Date.now() >= tempo + 100) {
        vel = velNormal;
        if (Date.now() >= tempo + 1000) {
            tempo = 0;
        }
    }

    let dx = 0;
    let dy = 0;

    if (tecla["w"]) dy -= 1;
    if (tecla["s"]) dy += 1;
    if (tecla["a"]) dx -= 1;
    if (tecla["d"]) dx += 1;

    if (dx !== 0 && dy !== 0) {
        dx *= Math.SQRT1_2;
        dy *= Math.SQRT1_2;
    }

    x += dx * vel;
    y += dy * vel;

    historico.push({ x: x, y: y });
    if (historico.length > 20) {
        historico.shift();
    }
    let alvo = historico[0] || { x: x, y: y };

    let idx = 0;
    let idy = 0;

    if (alvo.x -30 > ix) idx += 1;
    if (alvo.x  + 30< ix) idx -= 1;
    if (alvo.y -30 > iy) idy += 1;
    if (alvo.y + 30 < iy) idy -= 1;
    if (idx !== 0 && idy !== 0) {
        idx *= Math.SQRT1_2;
        idy *= Math.SQRT1_2;
    }
    ix += idx * ivel;
    iy += idy * ivel;

    // Limites do canvas
    y = Math.max(0, Math.min(450, y));
    x = Math.max(0, Math.min(450, x));

    // Colisão com inimigo
    if (
        x <= ix + 50 && x + 50 >= ix &&
        y <= iy + 50 && y + 50 >= iy
    ) {
        jogo = false;
    }

    // Colisão com ponto
    if (
        x + 50 >= px && x <= px + 25 &&
        y + 50 >= py && y <= py + 25
    ) {
        velNormal += 0.5;
        ivel += 0.5;
        px = Math.round(Math.random() * 475);
        py = Math.round(Math.random() * 475);
    }

    // Desenho
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "Yellow";
    ctx.fillRect(px, py, 25, 25);
    ctx.fillStyle = "Blue";
    ctx.fillRect(x, y, 50, 50);
    ctx.fillStyle = "Red";
    ctx.fillRect(ix, iy, 50, 50);

    ctx.fillStyle = 'rgb(0, 88, 22)';
    ctx.font = "25px Arial";
    ctx.fillText("dash:", 375, 40);
    ctx.fillText("Pontos: " + (velNormal * 2 - 10), 10, 20);

    // Barra de dash
    if (tempo === 0) {
        barra_dash = 50;
    } else if (Date.now() <= tempo + 100) {
        barra_dash = 0;
    } else {
        barra_dash = Math.min(50, (Date.now() - tempo) / 20);
    }
    ctx.fillRect(440, 10, barra_dash, 50);

    if (jogo) {
        requestAnimationFrame(loop);
    } else {
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.font = "50px Arial";
        ctx.fillText("você morreu :(, " + (velNormal * 2 - 10), 90, 250);
    }
}



