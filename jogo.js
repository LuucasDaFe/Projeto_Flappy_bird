console.log('[DevSoutinho] Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './Efeitos/hit.wav'
let frames = 0;

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Chão
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610, 
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            //console.log('[chao.x]', chao.x);
            //console.log('[repeteEm]', repeteEm);
            //console.log('[movimentacao]', movimentacao % repeteEm);

            chao.x = movimentacao % repeteEm;
        },
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };
    return chao;
}
//[Plano de fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0, 
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }

    return false;
};

function criaFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0, 
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velociade: 0,
        pulo: 4.6,
        pula(){
            flappyBird.velociade = - flappyBird.pulo;
        },
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                som_HIT.play();

                    mudarParaTela(Telas.GAMER_OVER);           
                return;
            }
    
            flappyBird.velociade = flappyBird.velociade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velociade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0},
            { spriteX: 0, spriteY: 26},
            { spriteX: 0, spriteY: 52},
            { spriteX: 0, spriteY: 26},
        ],
        frameAtual: 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
            
        },
        desenha(){
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na Sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );        
        },
    };
    return flappyBird;
};
// [mensagemGetReady]
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x:(canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }
}

// [MessagemGamerOver]
const MessagemGamerOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x:(canvas.width / 2) - 200 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            MessagemGamerOver.sX, MessagemGamerOver.sY,
            MessagemGamerOver.w, MessagemGamerOver.h,
            MessagemGamerOver.x, MessagemGamerOver.y,
            MessagemGamerOver.w, MessagemGamerOver.h
        );
    }
}
//[Canos]
function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169.
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha(){

            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacamentoEntreCanos = 200;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                //[Canos do Céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                )

                //[Canos do chao]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoCeuX,
                    y: canoCeuY
                }
            })
            
        },
        
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y){
                    return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                canos.pares.push({
                        x: canvas.width,
                        y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par){
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)){
                    som_HIT.play();
                    mudarParaTela(Telas.GAMER_OVER);
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }
            });
        },
    }
    return canos;
}

function criaPlacar(){
    const placar = {
        pontuacao: 0,
        desenha(){
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`Hello word ${placar.pontuacao}`, canvas.width - 10, 35);
            placar.pontuacao
        },
        atualiza(){
            const intervaloDeFrames = 20;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
};

//[Telas]
const globais = {};
let telasAtiva = {};
function mudarParaTela(novaTela){
    telasAtiva = novaTela;

    if(telasAtiva.inicializa){
        telasAtiva.inicializa();
    }
};

const Telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudarParaTela(Telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    inicializa(){
        globais.placar = criaPlacar();
    },
    desenha(){
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
}
Telas.GAMER_OVER = {
    desenha(){
        MessagemGamerOver.desenha();
    },
    atualiza(){

    },
    click(){
        mudarParaTela(Telas.INICIO);
    }
}

function loop(){

    telasAtiva.desenha();
    telasAtiva.atualiza();
   
    frames = frames + 1;
    requestAnimationFrame(loop);
};

window.addEventListener('click', function(){
    if(telasAtiva.click) {
        telasAtiva.click();
    }
});

mudarParaTela(Telas.INICIO);
loop();