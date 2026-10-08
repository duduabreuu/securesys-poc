const app = document.querySelector('#app');
const layers = [...document.querySelectorAll('.screen-layer')];
const toast = document.querySelector('#toast');
let currentScreen = 'splash';
let loadingTimer;
let scoreTimer;

const screens = {
  splash: () => `
    <div class="splash-bg" id="start-app" role="button" tabindex="0" aria-label="Abrir SecureSys">
      <div class="splash-card"><div class="logo-mark large">⌁</div><div class="brand-name">SecureSys</div></div>
    </div>`,
  loading: () => `
    <div class="loading-bg"><div class="loader-content"><div class="logo-mark">⌁</div><p>Preparando sua proteção...</p><div class="loader-dots"><span></span><span></span><span></span></div></div></div>`,
  login: () => `
    <div class="auth-screen"><div class="logo-mark">⌁</div><h2 class="auth-title">Bem-vindo ao SecureSys</h2>
      <form class="auth-card" id="login-form">
        <label class="field"><span>✉ E-mail ou User Name</span><input id="email" type="email" placeholder="seuemail@exemplo.com" value="" required /></label>
        <label class="field"><span>♙ Senha</span><input id="password" type="password" placeholder="Digite sua senha" required /></label>
        <div id="auth-error" class="auth-error"></div>
        <div class="remember-row"><span>□ Lembrar senha</span><a href="#" id="forgot">Esqueceu a senha?</a></div>
        <button class="primary-btn" type="submit">Entrar</button>
      </form>
      <p class="auth-footer">Não tem uma conta ainda? <u>Cadastre-se</u><br><br>🔒 O SecureSys é um método de<br>segurança eficiente.</p>
    </div>`,
  home: () => `
    <div class="app-screen"><h1 class="greeting">Olá, Luciano!<br>Conte com nossa <strong>IA<br>para lhe proteger</strong> de golpes.</h1>
      <div class="panel message-card"><h3>🛡 Recebeu uma mensagem suspeita?<br>Coloque o texto do SMS ou e-mail e<br>deixe a IA analisar para você.</h3><textarea class="message-box" id="message-text" maxlength="4000" placeholder="Cole sua mensagem aqui"></textarea><div class="message-tools"><span>colar</span></div><button class="primary-btn" id="analyze-btn">⌕ &nbsp; Analisar mensagem</button></div>
      <div class="quick-row"><button class="quick-btn" id="history-btn"><span class="quick-icon blue">◴</span><span><b>Histórico</b><br>Veja seu histórico ›</span></button><button class="quick-btn" id="learn-btn"><span class="quick-icon purple">▣</span><span><b>Aprender</b><br>Veja mais análises ›</span></button></div>
      ${bottomNav('home')}
    </div>`,
  result: () => `
    <div class="app-screen"><button class="top-back" id="result-back" aria-label="Voltar">‹</button><h2 class="result-title">Resultado da análise</h2><p class="result-lead">Nossa IA analisou a mensagem<br>que você enviou.</p>
      <div class="alert-card"><div class="alert-head"><span class="alert-badge">⚠</span><span>Atenção!<small style="display:block;color:#536e69;font-weight:400">Essa mensagem pode ser golpe.</small></span></div><div class="score-row"><div class="score-ring" id="score-ring"><span class="score-number"><span id="score-value">0</span><small>/100</small></span></div><div class="risk-copy">SCORE DE RISCO<strong>ALTO RISCO</strong>Nossa IA identificou<br>sinais de fraude nesta<br>mensagem.</div></div></div>
      <div class="alert-card findings"><h4>O que identificamos?</h4><div class="finding"><span>↪</span><b>Link suspeito<br><small> Pode te levar a sites maliciosos.</small></b></div><div class="finding"><span>⌁</span><b>Urgência excessiva<br><small>Pressão para ação imediata.</small></b></div><div class="finding"><span>⊘</span><b>Solicitação de dados sensíveis<br><small>Pedido de informações pessoais.</small></b></div></div><button class="primary-btn green-cta" id="details-btn">Ver detalhes da análise　›</button>
      ${bottomNav('security')}
    </div>`,
  profile: () => `<div class="inner-page"><button class="back" id="profile-back">‹</button><h1>Perfil</h1><div class="profile-head"><div class="avatar">●</div><div><strong>Luciano Moura</strong><small>luciano.moura@umen.com.br</small></div></div><div class="stat-row"><div class="stat"><b>42</b>Mensagens analisadas</div><div class="stat"><b>12</b>Golpes evitados</div></div><p class="settings-title">Configurações</p><div class="panel" style="padding:0"><div class="setting"><span>⚑ Acessibilidade</span><b>›</b></div><div class="setting"><span>♙ Privacidade</span><b>›</b></div><div class="setting"><span>♟ Notificações</span><b>›</b></div><div class="setting"><span>● Sobre a SecureSys</span><b>›</b></div></div><button class="secondary-btn profile-logout">⇥　Sair da conta</button></div>`,
  history: () => `<div class="inner-page"><button class="back" id="history-back">‹</button><h1>Histórico</h1><input class="search" placeholder="⌕  Buscar análises antigas..." /><div class="history-item"><header><span>Hoje, 14:32</span><span class="pill red">ALTO RISCO</span></header>Seu boleto de R$240,00 está vencendo. Pague agor...</div><div class="history-item"><header><span>Ontem, 09:15</span><span class="pill yellow">SUSPEITO</span></header>Parabéns! Você ganhou R$5.000 no sorteio da Lumen...</div><div class="history-item"><header><span>02 Mar, 18:04</span><span class="pill green">SEGURO</span></header>Código de confirmação do WhatsApp: 482-910. Não c...</div><div class="history-item"><header><span>28 Fev, 11:20</span><span class="pill green">SEGURO</span></header>Prezada Maria, sua fatura digital já está disponível em...</div></div>`,
  learn: () => `<div class="inner-page"><button class="back" id="learn-back">‹</button><h2>Aprender e Proteger</h2><div class="learn-banner">☆　Seu nível de proteção: Pode ser melhorado<br><small>Você completou 1 de 4 guias essenciais.</small></div><div class="learn-item"><div class="learn-icon">⚠</div><div><strong>Falso Emprego / Tarefas</strong><p>Cuidado com promessas de dinheiro fácil trabalhando poucos minutos na internet...</p><a> Ler agora ›</a></div></div><div class="learn-item"><div class="learn-icon cyan">♧</div><div><strong>Clonagem de WhatsApp</strong><p>Ative a confirmação em duas etapas e nunca passe o código SMS a terceiros.</p><a> Ler agora ›</a></div></div><div class="learn-item"><div class="learn-icon blue">⊗</div><div><strong>Phishing por E-mail</strong><p>Aprenda a identificar remotamente falsos e links de bancos maliciosos.</p><a> Ler agora ›</a></div></div><div class="learn-item"><div class="learn-icon red">⊗</div><div><strong>Golpe do Falso Boleto</strong><p>Como conferir os dados do beneficiário antes de pagar qualquer documento.</p><a> Ler agora ›</a></div></div></div>`,
  security: () => `<div class="inner-page"><button class="back" id="security-back">‹</button><h1>Sua segurança</h1><p class="subheading">Status do seu dispositivo</p><div class="security-check"><div class="check-icon">✓</div><div><strong>Proteção Ativada</strong><br><small>Seu app está atualizado e pronto para farejar<br>links perigosos.</small></div></div><div class="security-grid"><div class="panel"><span style="color:#dc3141;font-size:18px">⚠</span><strong>Registrar Golpe</strong><p>Ajude outros usuários relatando fraudes.</p></div><div class="panel"><span style="color:#dc3141;font-size:18px">⚠</span><strong>Registrar Golpe</strong><p>Ajude outros usuários relatando fraudes.</p></div></div><p class="settings-title" style="margin-top:15px">Alertas Recentes na sua Região</p><div class="security-alert">⚠　<strong>Falso Pix por Telefone</strong><small>Há 20 minutos - Recife - PE</small></div><div class="security-alert">⚠　<strong>Golpe da Falsa Nubank</strong><small>Anteontem - Geral</small></div><button class="primary-btn green-cta" id="security-analyze">⌕　Fazer análise de mensagem　›</button></div>`
};

function bottomNav(active) {
  return `<nav class="bottom-nav"><button class="nav-btn ${active === 'home' ? 'active' : ''}" data-nav="home"><span class="nav-icon">⌂</span>Início</button><button class="nav-btn ${active === 'security' ? 'active' : ''}" data-nav="security"><span class="nav-icon">♢</span>Segurança</button><button class="nav-btn ${active === 'profile' ? 'active' : ''}" data-nav="profile"><span class="nav-icon">♙</span>Perfil</button></nav>`;
}

function render(screen) {
  currentScreen = screen;
  layers.forEach(layer => {
    const active = layer.dataset.screen === screen;
    layer.classList.toggle('is-active', active);
    if (active) layer.innerHTML = screens[screen]();
  });
  bindInteractions();
  if (screen === 'result') animateScore();
}

function go(screen) {
  render(screen);
  window.location.hash = screen;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function bindInteractions() {
  document.querySelector('#start-app')?.addEventListener('click', startLoading);
  document.querySelector('#start-app')?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') startLoading(); });
  document.querySelector('#login-form')?.addEventListener('submit', handleLogin);
  document.querySelector('#forgot')?.addEventListener('click', e => { e.preventDefault(); showToast('Use a senha padrão da demonstração: 12345'); });
  document.querySelector('#analyze-btn')?.addEventListener('click', () => {
    const value = document.querySelector('#message-text')?.value.trim();
    if (!value) { showToast('Cole uma mensagem antes de analisar.'); return; }
    go('result');
  });
  document.querySelector('#history-btn')?.addEventListener('click', () => go('history'));
  document.querySelector('#learn-btn')?.addEventListener('click', () => go('learn'));
  document.querySelector('#result-back')?.addEventListener('click', () => go('home'));
  document.querySelector('#details-btn')?.addEventListener('click', () => showToast('Detalhes simulados para a apresentação.'));
  document.querySelector('#profile-back')?.addEventListener('click', () => go('home'));
  document.querySelector('#history-back')?.addEventListener('click', () => go('home'));
  document.querySelector('#learn-back')?.addEventListener('click', () => go('home'));
  document.querySelector('#security-back')?.addEventListener('click', () => go('home'));
  document.querySelector('#security-analyze')?.addEventListener('click', () => go('home'));
  document.querySelectorAll('[data-nav]').forEach(button => button.addEventListener('click', () => go(button.dataset.nav)));
}

function startLoading() {
  go('loading');
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => go('login'), 5000);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  const error = document.querySelector('#auth-error');
  if (password !== '12345') { error.textContent = 'Senha inválida. Para a PoC, use 12345.'; return; }
  if (!email) { error.textContent = 'Digite um e-mail para continuar.'; return; }
  error.textContent = '';
  go('home');
}

function animateScore() {
  clearInterval(scoreTimer);
  const valueEl = document.querySelector('#score-value');
  const ring = document.querySelector('#score-ring');
  let value = 0;
  scoreTimer = setInterval(() => {
    value += value < 60 ? 20 : 15;
    if (value >= 90) { value = 90; clearInterval(scoreTimer); }
    valueEl.textContent = value;
    ring.style.setProperty('--score', `${value}%`);
  }, 180);
}

function init() {
  const requested = window.location.hash.replace('#', '');
  render(screens[requested] ? requested : 'splash');
  setInterval(() => {
    const now = new Date();
    document.querySelector('#clock').textContent = now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
  }, 30000);
}
init();
