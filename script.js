let currentXP = 0;
let nextLevelXP = 100;
let level = 1;

function completeQuest(xpAmount, button) {
  currentXP += xpAmount;

  if (currentXP >= nextLevelXP) {
    currentXP -= nextLevelXP;
    level++;
    nextLevelXP = Math.round(nextLevelXP * 1.4);
    alert(`⚡ LEVEL UP! Você alcançou o Nível ${level}!`);
  }

  updateHUD();

  button.disabled = true;
  button.textContent = 'CONCLUÍDO ✔';
}

function updateHUD() {
  document.getElementById('current-xp').textContent = currentXP;
  document.getElementById('next-level-xp').textContent = nextLevelXP;
  document.getElementById('user-level').textContent = level;

  const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);
  document.getElementById('xp-fill').style.width = `${percentage}%`;
}
