// Estado inicial do jogador
let currentXP = 0;
let nextLevelXP = 100;
let level = 1;

// Seleção de elementos do DOM
const currentXPElem = document.getElementById('current-xp');
const nextLevelXPElem = document.getElementById('next-level-xp');
const userLevelElem = document.getElementById('user-level');
const xpFillElem = document.getElementById('xp-fill');
const buttons = document.querySelectorAll('.btn-complete');

// Função para adicionar XP e atualizar a interface
function addXP(amount) {
  currentXP += amount;

  // Lógica de subir de nível (Level Up)
  if (currentXP >= nextLevelXP) {
    currentXP -= nextLevelXP;
    level++;
    nextLevelXP = Math.round(nextLevelXP * 1.5); // Aumenta a dificuldade do próximo nível
    alert(`🎉 Parabéns! Você subiu para o Nível ${level}!`);
  }

  // Atualiza os valores na tela
  currentXPElem.textContent = currentXP;
  nextLevelXPElem.textContent = nextLevelXP;
  userLevelElem.textContent = level;

  // Atualiza a barra de progresso em %
  const progressPercent = (currentXP / nextLevelXP) * 100;
  xpFillElem.style.width = `${progressPercent}%`;
}

// Associa o evento de clique aos botões de missão
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Adiciona 25 de XP por padrão ao concluir uma missão
    addXP(25);
    button.disabled = true;
    button.textContent = 'Concluído!';
    button.style.backgroundColor = '#475569';
  });
});
