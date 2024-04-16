// Função que gera um número aleatório entre 'min' e 'max'
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Função de interpolação linear
  // A interpolação linear é uma forma de adivinhar um valor entre dois números que você já conhece. Imagine esses dois números como pontos em uma linha. Se você quer encontrar um número entre esses dois pontos, a interpolação linear faz isso usando uma fórmula simples. Basicamente, ela "liga os pontos" de forma reta para pegar o valor intermediário. É muito útil quando precisamos de valore entre dois números conhecidos.
  
  function lerp(a, b, t) {
    // Calcula um valor intermediário entre 'a' e 'b' com base no fator 't'
    return a + (b - a) * t;
  }
  
  // Vamos criar a definição da classe Neuron (Neurônio)
  class Neuron {
    constructor(inputs) {
      // Inicializa o neurônio com um viés (bias) aleatório no intervalo [-1, 1]
  
      // O viés (bias) na nossa rede neural é um número que ajuda a rede a aprender. Ele permite que a rede faça ajustes para entender melhor os dados. O bias é importante porque ajuda a rede a aprender padrões nos dados e a tomar decisões melhores. É como um ajuste pequeno que a rede faz para se adaptar aos dados da melhor maneira possível.
      this.bias = randomRange(-1, 1);
      
      // Inicializa uma lista de pesos com valores aleatórios no intervalo [-1, 1]
      this.weightList = new Array(inputs)
        .fill()
        .map(() => randomRange(-1, 1));
    };
  
    // Função que calcula a saída do neurônio (ativação)
    g(signalList = []) {
      let u = 0;
  
      // Calcula a soma ponderada dos sinais de entrada multiplicados pelos pesos
      for (let i = 0; i < this.weightList.length; i++) {
        u += signalList[i] * this.weightList[i];
      }
  
      // Verifica se o neurônio está ativado com base na função tangente
      if (Math.tanh(u) > this.bias) return 1; // Ativado
      else return 0; // Não ativado
    }
  
    // Função que realiza mutação nos pesos e no viés do neurônio
    mutate(rate = 1) {
      this.weightList = this.weightList.map((w) => {
        // Faz uma mudança nos pesos com base na taxa 'rate'
        return lerp(w, randomRange(-1, 1), rate);
      });
      // Faz uma mudança no viés (bias) com base na taxa 'rate'
      this.bias = lerp(this.bias, randomRange(-1, 1), rate);
    }
  }