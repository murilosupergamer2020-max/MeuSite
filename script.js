            function mudarFundo() {
                document.body.style.backgroundColor = "yellow";
                document.getElementById("botão").onclick = mudarTitulo;
                document.getElementById("botão").innerText = "Mudar título";
            }
            function mudarTitulo() {
                document.getElementById("titulo").innerText = "Titulo mudado";
            }
             //canvas//
            let canvas = document.getElementById("Canvas");
            let ctx =canvas.getContext("2d");
            let x = 225;
            let y = 225;
            let ix = 450;
            let iy = 450;
            let px = Math.round(Math.random() * 475) 
            let py = Math.round(Math.random() * 475) 
            let velNormal = 5;
            let velDash = 20;
            let vel = 5;
            let ivel = 3;
            let jogo = true
            let tecla = {};
            let tempo = 0;
            let barra_dash = 50;
            let historico = []
            let alvo = []

            console.log(px);
            console.log(py);


            document.addEventListener("keydown", function(event){
                tecla[event.key] = true;
            })
            document.addEventListener("keyup", function(event){
                tecla[event.key] = false;
            })
            function loop() {

                velDash = velNormal * 4

                if(tecla[" "] && tempo == 0){
                    console.log(Date.now())
                    vel = velDash;
                    tempo = Date.now();
                    console.log("Dash");
                }
                if(Date.now() >= tempo + 100){
                    vel = velNormal;
                    console.log("Fim do Dash");
                if(Date.now() >= tempo + 1000){
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
                historico.push({x: x, y: y})
                if(historico.length >= 20){
                    historico.shift()
                }
                let alvo = historico[0]
                
                let idx = 0;
                let idy = 0;

                if(alvo.x > ix) idx += 1;
                if(alvo.x < ix) idx -= 1;
                if(alvo.y > iy) idy += 1;
                if(alvo.y < iy) idy -= 1;
                if (idx !== 0 && idy !== 0) {
                    idx *= Math.SQRT1_2; 
                    idy *= Math.SQRT1_2;
                }
                ix += idx * ivel
                iy += idy * ivel
                
                if(y >= 450) y = 450;
                if(y <= 0) y = 0;
                if(x >= 450) x = 450;
                if(x <= 0) x = 0;

                if(x <= ix + 50 && x >= ix - 50 && y <= iy + 50 && y >= iy - 50){
                    jogo = false

                }
                if(x <= px + 25 && x >= px - 50 && y <= py + 25 && y >= py - 50){
                    velNormal += 0.5;
                    ivel += 0.5;
                    
                    
                    px = Math.round(Math.random() * 475) 
                    py = Math.round(Math.random() * 475) 


                }

                ctx.clearRect(0,0,500,500);
                ctx.fillStyle = "Yellow";
                ctx.fillRect(px, py, 25, 25);
                ctx.fillStyle= "Blue";
                ctx.fillRect(x, y, 50, 50);
                ctx.fillStyle = "Red"
                ctx.fillRect(ix, iy, 50, 50)
                
                ctx.fillStyle='rgb(0, 88, 22)';
                ctx.font = "25px Arial";
                ctx.fillText("dash:", 375, 40);
                ctx.fillStyle='rgb(0, 88, 22)';
                ctx.font = "25px Arial";
                ctx.fillText("Pontos: " + (velNormal*2-10) , 10, 20)
                if(tempo == 0){
                    barra_dash = 50;
                } else if(Date.now() <= tempo + 100){
                    barra_dash = 0;
                } else{
                    barra_dash = (Date.now() - tempo) / 20;
                }
                ctx.fillRect(440, 10, barra_dash, 50);
                if(jogo){
                    requestAnimationFrame(loop);
                }
                else{
                    ctx.clearRect(0,0,500,500);
                    ctx.fillStyle = "rgb(255, 0, 0)";
                    ctx.font = "50px Arial";
                    ctx.fillText(("você morreu :(," +(velNormal*2-10)), 90, 250);
                }
                
            }
            loop()
