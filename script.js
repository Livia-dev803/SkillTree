// Estado global do jogador
const playerState = {
  streak: 124,
  currentXP: 750,
  nextLevelXP: 1000,
  level: 24,
  rankingPosition: 2
};

// Seleção de elementos do DOM
document.addEventListener('DOMContentLoaded', () => {
  // 1. Alternar estado ativo dos links do menu (Navbar)
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // 2. Ação do Botão Principal "COMEÇAR NOVA TEMPORADA"
  const btnPrimary = document.querySelector('.btn-primary');
  if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
      playerState.currentXP += 100;
      
      if (playerState.currentXP >= playerState.nextLevelXP) {
        playerState.level++;
        playerState.currentXP -= playerState.nextLevelXP;
        alert(`🎉 NOVO RANK ALCANÇADO! Você subiu para o Nível ${playerState.level}!`);
      } else {
        alert(`⚡ Temporada iniciada! +100 XP adicionados.`);
      }
      
      updateUI();
    });
  }

  // 3. Ação do Botão "VER RANKING"
  const btnSecondary = document.querySelector('.btn-secondary');
  if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
      const darkSection = document.querySelector('.dark-section');
      if (darkSection) {
        darkSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Função para atualizar os dados em tela se necessário
function updateUI() {
  const xpText = document.querySelector('.metric-card div[style*="38bdf8"]');
  if (xpText) {
    xpText.textContent = `${playerState.currentXP} / ${playerState.nextLevelXP} XP`;
  }
}
