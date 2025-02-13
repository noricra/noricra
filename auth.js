// Gestion de l'état de connexion
let currentUser = null;

// Ouvrir/Fermer les modales
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

// Gestion de la connexion
function handleLogin(event) {
  event.preventDefault();
  
  // Simulation de connexion (à remplacer par une vraie API)
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Simuler une connexion réussie
  currentUser = {
    name: email.split('@')[0],
    email: email,
    referralCode: generateReferralCode(),
    referrals: 0,
    earnings: 0
  };
  
  updateUIForLoggedInUser();
  closeModal('loginModal');
  return false;
}

// Gestion de l'inscription
function handleRegister(event) {
  event.preventDefault();
  
  // Simulation d'inscription (à remplacer par une vraie API)
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  
  // Simuler une inscription réussie
  currentUser = {
    name: name,
    email: email,
    referralCode: generateReferralCode(),
    referrals: 0,
    earnings: 0
  };
  
  updateUIForLoggedInUser();
  closeModal('registerModal');
  return false;
}

// Mettre à jour l'interface pour un utilisateur connecté
function updateUIForLoggedInUser() {
  // Mettre à jour la nav
  const authButtons = document.querySelector('.auth-buttons');
  authButtons.innerHTML = `
    <div class="user-profile">
      <div class="user-avatar">${currentUser.name[0].toUpperCase()}</div>
      <span>${currentUser.name}</span>
      <button class="btn-secondary" onclick="handleLogout()">Déconnexion</button>
    </div>
  `;
  
  // Mettre à jour la section parrainage
  updateReferralSection();
}

// Mettre à jour la section parrainage
function updateReferralSection() {
  const container = document.getElementById('referralContainer');
  
  if (!currentUser) {
    container.innerHTML = `
      <div class="referral-login-prompt">
        <h3> Gagnez 15 par parrainage !</h3>
        <p>Connectez-vous ou créez un compte pour commencer à parrainer vos amis.</p>
        <div class="auth-buttons">
          <button class="btn-secondary" onclick="openModal('loginModal')">Se connecter</button>
          <button class="btn-primary" onclick="openModal('registerModal')">S'inscrire</button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="referral-info">
        <h3>Parrainez vos amis et gagnez !</h3>
        <p>Pour chaque ami inscrit avec votre code, recevez :</p>
        <ul class="referral-benefits">
          <li> 15 de cashback direct</li>
          <li> 1 mois d'accès au support prioritaire</li>
          <li> Accès aux bonus exclusifs</li>
        </ul>
        <p class="referral-bonus">Votre ami bénéficie de -20% sur sa formation !</p>
      </div>
      <div class="referral-action">
        <div class="referral-code-container">
          <h4>Votre code de parrainage</h4>
          <div class="code-display">
            <span>${currentUser.referralCode}</span>
            <button class="copy-btn" onclick="copyReferralCode()">Copier</button>
          </div>
        </div>
        <div class="share-buttons">
          <button class="share-btn whatsapp" onclick="shareWhatsApp()">
            <span>Partager sur WhatsApp</span>
          </button>
          <button class="share-btn email" onclick="shareEmail()">
            <span>Partager par Email</span>
          </button>
        </div>
      </div>
    `;
  }
}

// Fonctions utilitaires
function generateReferralCode() {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function handleLogout() {
  currentUser = null;
  location.reload();
}

function copyReferralCode() {
  navigator.clipboard.writeText(currentUser.referralCode);
  alert('Code copié !');
}

function shareWhatsApp() {
  const text = encodeURIComponent(`Découvre cette formation incroyable sur les remboursements ! Utilise mon code ${currentUser.referralCode} pour avoir -20% : [URL]`);
  window.open(`https://wa.me/?text=${text}`);
}

function shareEmail() {
  const subject = encodeURIComponent("Une formation exceptionnelle à découvrir !");
  const body = encodeURIComponent(`Découvre cette formation incroyable sur les remboursements ! Utilise mon code ${currentUser.referralCode} pour avoir -20% : [URL]`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Initialiser l'interface au chargement
document.addEventListener('DOMContentLoaded', () => {
  updateReferralSection();
});