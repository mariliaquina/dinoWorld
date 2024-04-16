import utils from './utils.js';
import RNA from './RNA.js';
import controls from './controls.js';

const SAMPLES = 10; // Número de amostras (agentes) no algoritmo genético
const game = Runner.instance_; // Instância do jogo "Runner"
let dinoList = []; // Lista de dinossauros
let dinoIndex = 0; // Índice do dinossauro atual na lista

let bestScore = 0; // Melhor pontuação encontrada durante o treinamento
let bestRNA = null; // Melhor RNA (rede neural) encontrada durante o treinamento

function fillDinoList () {
    for (let i=0; i<SAMPLES; i++) {
      dinoList[i] = new RNA(3, [10, 10, 2]); // Cria um novo dinossauro com uma RNA de 3 camadas
      dinoList[i].load(bestRNA); // Carrega a melhor RNA encontrada anteriormente
      if (i > 0) dinoList[i].mutate(0.2); // Mutação na RNA dos dinossauros, exceto o primeiro
    }
    console.log('Dino list created!');
  }

  setTimeout(() => {
    fillDinoList();
    controls.dispatch('jump'); // Faz o dinossauro executar um salto no jogo
  }, 1000);  

  setInterval(() => {
    if (!game.activated) return; // Verifica se o jogo está ativado
  
    const dino = dinoList[dinoIndex]; // Seleciona o dinossauro atual
  
    if (game.crashed) { // Verifica se o dinossauro colidiu no jogo
      if (dino.score > bestScore) {
        bestScore = dino.score;
        bestRNA = dino.save(); // Salva a RNA do dinossauro com a melhor pontuação
        console.log('bestScore:', bestScore);
      }
      dinoIndex++;
  
      if (dinoIndex === SAMPLES) { // Se todos os dinossauros foram avaliados, preenche a lista novamente
        fillDinoList();
        dinoIndex = 0;
        bestScore = 0;
      }
      game.restart(); // Reinicia o jogo
    }

    const { tRex, horizon, currentSpeed, distanceRan, dimensions } = game;
  dino.score = distanceRan - 2000; // Calcula a pontuação do dinossauro

  const player = {
    x: tRex.xPos,
    y: tRex.yPos,
    speed: currentSpeed,
  };

  const [obstacle] = horizon.obstacles
    .map((obstacle) => {
      return {
        x: obstacle.xPos,
        y: obstacle.yPos,
      }
    })
    .filter((obstacle) => obstacle.x > player.x)

    if (obstacle) { // Verifica se há um obstáculo presente
        const distance = 1 - (utils.getDistance(player, obstacle) / dimensions.WIDTH); // Calcula a distância relativa entre o jogador e o obstáculo
        const speed = player.speed / 6; // Calcula a velocidade relativa do jogador
        const height = Math.tanh(105 - obstacle.y); // Calcula a altura relativa do obstáculo
    
        // Processa as informações no dinossauro atual
        const [jump, crounch] = dino.compute([
          distance,
          speed,
          height,
        ]);

        if (jump === crouch) return
        if (jump) controls.dispatch('jump')
        if (crouch) controls.dispatch('crouch')
    };
}, 100);

/* const s = document.createElement('script');
s.type = 'module';
s.src = 'http://localhost:5500/script.js'
document.body.appendChild(s); */
