// BANCO DE DADOS LOCAL (localStorage)
let currentUser = JSON.parse(localStorage.getItem('skilltree_user')) || null;
let historyLog = JSON.parse(localStorage.getItem('skilltree_history')) || [];

// RANKING FIXO + USUÁRIO ATUAL
let globalRanking = [
  { name: 'Lázaro', xp: 2400, level: 12 },
  { name: 'Dev_Master', xp: 1850, level: 9 },
  { name: 'CodeNinja', xp: 1200, level: 6 }
];

document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  renderRanking();
  renderHistory();
});

// GERENCIAMENTO DE AUTENTICAÇÃO
function checkAuthStatus() {
  const nav = document.getElementById('main-nav');
  const authBtns = document.getElementById('auth-header-btns');
  const userPill = document.getElementById('user-profile-header');
  const guestHero = document.getElementById('guest-hero');

  if (currentUser) {
    nav.style.display = 'flex';
    authBtns.style.display = 'none';
    userPill.style.display = 'flex';
    guestHero.style.display = 'none';

    document.getElementById('header-user-name').textContent = currentUser.name;
    document.getElementById('header-user-xp').textContent = `${currentUser.xp} XP`;
    
    updateDashboardUI();
    switchTab('dashboard');
  } else {
    nav.style.display = 'none';
    authBtns.style.display = 'flex';
    userPill.style.display = 'none';
    guestHero.style.display = 'block';
    hideAllTabs();
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;

  currentUser = { name, email, xp: 0, level: 1, streak: 1 };
  saveUserData();
  closeAuthModal();
  checkAuthStatus();
  alert(`⚡ Bem-vinda(o), ${name}! Seu perfil foi criado.`);
}

function handleLogin(e) {
  e.preventDefault();
  const input = document.getElementById('login-input').value;
  
  // Login simulado
  currentUser = { name: input.split('@')[0], email: input, xp: 120, level: 2, streak: 3 };
  saveUserData();
  closeAuthModal();
  checkAuthStatus();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('skilltree_user');
  checkAuthStatus();
}

function saveUserData() {
  localStorage.setItem('skilltree_user', JSON.stringify(currentUser));
  localStorage.setItem('skilltree_history', JSON.stringify(historyLog));
}

// MODAIS
function openAuthModal(mode) {
  document.getElementById('auth-modal').style.display = 'flex';
  toggleAuthMode(mode);
}

function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
}

function toggleAuthMode(mode) {
  document.getElementById('login-form').style.display = mode === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = mode === 'register' ? 'block' : 'none';
}

// NAVEGAÇÃO DE ABAS
function switchTab(tabName) {
  hideAllTabs();
  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) activeTab.style.display = 'block';

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === tabName) link.classList.add('active');
  });

  if (tabName === 'ranking') renderRanking();
  if (tabName === 'historico') renderHistory();
}

function hideAllTabs() {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
}

// LÓGICA DE JOGO (MISSÕES / XP)
function completeQuest(title, xp, button) {
  if (!currentUser) return;

  currentUser.xp += xp;
  const nextXP = currentUser.level * 100;

  if (currentUser.xp >= nextXP) {
    currentUser.level++;
    alert(`🎉 LEVEL UP! Você alcançou o Nível ${currentUser.level}!`);
  }

  // Registra no histórico
  historyLog.unshift({ title, xp, date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) });
  
  saveUserData();
  updateDashboardUI();

  button.disabled = true;
  button.textContent = 'Concluído ✔';
}

function updateDashboardUI() {
  if (!currentUser) return;

  const nextXP = currentUser.level * 100;
  const percentage = Math.min((currentUser.xp / nextXP) * 100, 100);

  document.getElementById('dash-user-name').textContent = currentUser.name;
  document.getElementById('dash-level').textContent = currentUser.level;
  document.getElementById('dash-xp').textContent = currentUser.xp;
  document.getElementById('dash-next-xp').textContent = nextXP;
  document.getElementById('dash-streak').textContent = currentUser.streak;
  document.getElementById('xp-progress').style.width = `${percentage}%`;

  document.getElementById('header-user-xp').textContent = `${currentUser.xp} XP`;
}

// RENDERIZADORES
function renderRanking() {
  const container = document.getElementById('ranking-list');
  if (!container) return;

  let list = [...globalRanking];
  if (currentUser) {
    list.push({ name: `${currentUser.name} (Você)`, xp: currentUser.xp, level: currentUser.level, isMe: true });
  }

  list.sort((a, b) => b.xp - a.xp);

  container.innerHTML = list.map((player, index) => `
    <div class="ranking-row ${player.isMe ? 'me' : ''}">
      <span style="font-weight: 800; color: #38bdf8;">#${index + 1}</span>
      <span style="font-weight: 700;">${player.name}</span>
      <span style="color: #94a3b8; font-size: 0.85rem;">Nível ${player.level}</span>
      <span style="font-weight: 800; color: #22c55e;">${player.xp} XP</span>
    </div>
  `).join('');
}

function renderHistory() {
  const container = document.getElementById('history-container');
  if (!container) return;

  if (historyLog.length === 0) {
    container.innerHTML = `<p style="color: #64748b;">Nenhuma missão concluída ainda.</p>`;
    return;
  }

  container.innerHTML = historyLog.map(item => `
    <div class="history-row">
      <span style="font-weight: 700;">⚡ ${item.title}</span>
      <span style="color: #38bdf8; font-weight: 800;">+${item.xp} XP</span>
      <span style="color: #64748b; font-size: 0.8rem;">${item.date}</span>
    </div>
  `).join('');
}
