window.onload = function () {
document.getElementById('jogo').style.display = 'none';
document.getElementById('jogadorAtual').style.display = 'none';

  // Exibe o logo na tela inicial
  var telaInicial = document.getElementById('tela-inicial');
  telaInicial.innerHTML = '<img id="logo" src="meu_logo.png" alt="Logo do meu Joguinho">' + telaInicial.innerHTML;
};

function Jogador(nome, forma) {
  this.nome = nome;
  this.forma = forma;
}

var jogador1, jogador2;
// Jogador da rodada
var jogadorAtual;
var formas = ['X', 'O'];
var index = null;

// caixamãe
var caixamae = new Array(9);

// Inicializa o jogo
function initGame() {
  // Se o modo de jogo for contra o computador, inicia o jogo sem pedir nomes
  if (document.getElementById('modoJogo').value === 'umJogador') {
    jogador1 = new Jogador('Jogador 1', 0);
    jogador2 = new Jogador('Computador', 1);
    jogadorAtual = jogador1;
    setLabelJogadorAtual();
    document.getElementById('tela-inicial').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';
    document.getElementById('jogadorAtual').style.display = 'block';

    // Se for contra o computador, inicia a jogada do computador, supostamente mas não consegui fazer
    if (jogadorAtual === jogador2) {
      setTimeout(jogadaComputador, 500);
    }
  } else {
    // Se o modo de jogo for dois jogadores, solicita os nomes
    var nomeJogador1 = prompt('Nome do Jogador 1:');
    var nomeJogador2 = prompt('Nome do Jogador 2:');
  
    // Cria objetos Jogador
    jogador1 = new Jogador(nomeJogador1, 0);
    jogador2 = new Jogador(nomeJogador2, 1);
  
    // Define o jogador atual como jogador1
    jogadorAtual = jogador1;
  
     setLabelJogadorAtual();

    document.getElementById('tela-inicial').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';
    document.getElementById('jogadorAtual').style.display = 'block';
    
  }
}

// Reinicia a partida
function reset() {
  window.location.reload();
}

function setLabelJogadorAtual() {
  document.getElementById('jogadorAtual').innerHTML = 'Jogador atual:  ' + jogadorAtual.nome;
}

// Verifica se a caixamae está completamente preenchida
function caixamaecheia() {
  var preenchidos = 0;
  for (var i = 0; i < caixamae.length; i++) {
    if (caixamae[i] != undefined) preenchidos++;
  }
  return preenchidos == caixamae.length;
}

// Verifica se todos os elementos em alguma linha são iguais
function allElementsInSomeLine() {
  for (var i = 0; i < 7; i += 3) {
    if (caixamae[i] == 'X' && caixamae[i + 1] == 'X' && caixamae[i + 2] == 'X') {
      alert('Parabéns, ' + jogador1.nome + ' Venceste!!');//demorei ano e meio para descobrir que era preciso um "+" para unir
      reset();
    }
    if (caixamae[i] == 'O' && caixamae[i + 1] == 'O' && caixamae[i + 2] == 'O') {
      alert('Parabéns, ' + jogador2.nome + ' venceste!');
      reset();
    }
  }
}

// Verifica se todos os elementos em alguma coluna são iguais
function allElementsInSomeColumn() {
  for (var i = 0; i < 3; i++) {
    if (caixamae[i] == 'X' && caixamae[i + 3] == 'X' && caixamae[i + 6] == 'X') {
      alert('Parabéns, ' + jogador1.nome + ' Venceste!!');
      reset();
    }
    if (caixamae[i] == 'O' && caixamae[i + 3] == 'O' && caixamae[i + 6] == 'O') {
      alert('Parabéns, ' + jogador2.nome + ' venceste!');
      reset();
    }
  }
}

// Verifica se todos os elementos em alguma diagonal são iguais
function allElementsInSomeDiagonal() {
  if ((caixamae[0] == 'X' && caixamae[4] == 'X' && caixamae[8] == 'X') ||
    (caixamae[2] == 'X' && caixamae[4] == 'X' && caixamae[6] == 'X')) {
    alert('Parabéns, ' + jogador1.nome + ' Venceste!!');
    reset();
  } else if ((caixamae[0] == 'O' && caixamae[4] == 'O' && caixamae[8] == 'O') ||
    (caixamae[2] == 'O' && caixamae[4] == 'O' && caixamae[6] == 'O')) {
    alert('Parabéns, ' + jogador2.nome + ' venceste!');
    reset();
  }
}

function setOnCeil(cel, pos) {
  if (caixamae[pos] == undefined) {
    cel.innerHTML = formas[jogadorAtual.forma];
    caixamae[pos] = formas[jogadorAtual.forma];

    // Define o jogador da próxima rodada
    jogadorAtual.forma == 0 ? (jogadorAtual = jogador2) : (jogadorAtual = jogador1);
    setLabelJogadorAtual();

    // Verifica se há um vencedor ou se o tabuleiro está preenchido
    allElementsInSomeLine();
    allElementsInSomeColumn();
    allElementsInSomeDiagonal();

    if (caixamaeIsFilled()) {
      alert('Ninguém vence! :( Tente novamente');
      reset();
    }

    // Se o modo de jogo for contra o computador, permite ao computador fazer a próxima jogada
    if (document.getElementById('modoJogo').value === 'umJogador' && jogadorAtual === jogador2) {
      setTimeout(jogadaComputador, 500);
    }
  } else {
    alert('Ops. Posição já escolhida =/');
  }
}

// Lógica da jogada do computador (fácil - aleatória)
function jogadaComputador() {
  var celulasVazias = [];
  for (var i = 0; i < caixamae.length; i++) {
    if (caixamae[i] === undefined) {
      celulasVazias.push(i);
    }
  }

  // Escolhe uma célula vazia aleatória
  var posicaoEscolhida = celulasVazias[Math.floor(Math.random() * celulasVazias.length)];

  // Atualiza o tabuleiro
  caixamae[posicaoEscolhida] = formas[jogadorAtual.forma];

  // Atualiza a célula HTML correspondente
  document.getElementsByTagName('td')[posicaoEscolhida].innerHTML = formas[jogadorAtual.forma];

  // Verifica se há um vencedor ou se o tabuleiro está preenchido
  allElementsInSomeLine();
  allElementsInSomeColumn();
  allElementsInSomeDiagonal();

  if (caixamaeIsFilled()) {
    alert('Ninguém venceu! :( Tenta novamente');
    reset();
  } else {
    // Define o jogador da próxima rodada
    jogadorAtual = jogador1;
    setLabelJogadorAtual();
  }
}
