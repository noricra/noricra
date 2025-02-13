// Fonction pour animer le compteur d'étudiants
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
    
    updateCounter();
  }
  
  // Animation du compteur quand l'élément est visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const studentCount = document.getElementById('studentCount');
        animateCounter(studentCount, 1547);
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(document.getElementById('studentCount'));
  
  // Carousel de témoignages automatique
  const carousel = document.getElementById('testimonialCarousel');
  let scrollPosition = 0;
  const testimonialWidth = 300 + 32; // largeur + gap
  
  function autoScroll() {
    scrollPosition += testimonialWidth;
    if (scrollPosition >= carousel.scrollWidth) {
      scrollPosition = 0;
    }
    carousel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
  
  // Faire défiler automatiquement toutes les 5 secondes
  setInterval(autoScroll, 5000);
  
  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Système de parrainage
  document.getElementById('copyBtn').addEventListener('click', function() {
    const code = document.querySelector('#referralCode span').textContent;
    navigator.clipboard.writeText(code).then(() => {
      this.textContent = 'Copié !';
      setTimeout(() => {
        this.textContent = 'Copier';
      }, 2000);
    });
  });
  
  // Partage WhatsApp
  document.querySelector('.whatsapp').addEventListener('click', function() {
    const text = encodeURIComponent("Rejoins-moi sur Formation Remboursement Pro ! Utilise mon code FRIEND20 pour avoir -20% : [URL]");
    window.open(`https://wa.me/?text=${text}`);
  });
  
  // Partage Email
  document.querySelector('.email').addEventListener('click', function() {
    const subject = encodeURIComponent("Une formation exceptionnelle à découvrir !");
    const body = encodeURIComponent("Salut ! Je te recommande cette formation sur les remboursements. Utilise mon code FRIEND20 pour avoir -20% : [URL]");
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  
  // Simulation des statistiques de parrainage (à remplacer par de vraies données)
  let currentUser = {
    referrals: 0,
    earnings: 0
  };
  
  // Modifier les statistiques de parrainage pour s'adapter au nouveau montant
  function updateReferralStats() {
    if (currentUser) {
      currentUser.referrals++;
      document.getElementById('totalReferrals').textContent = currentUser.referrals;
      currentUser.earnings = currentUser.referrals * 15;
      document.getElementById('totalEarned').textContent = `${currentUser.earnings}€`;
    }
  }
  
  // Simulation d'un nouveau parrainage toutes les 30 secondes
  setInterval(updateReferralStats, 30000);
  
  // Fonctions pour le processus d'achat
  function openPurchaseModal() {
    openModal('purchaseModal');
  }
  
  function redirectToPayment() {
    window.location.href = 'checkout.html';
    closeModal('purchaseModal');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateSpots();
    
    // Fermer le modal d'achat avec la croix
    document.querySelector('#purchaseModal .close').addEventListener('click', () => {
      closeModal('purchaseModal');
    });
  
    // Fermer le modal si on clique en dehors
    window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    }
  });
  
  // Countdown Timer
  function updateCountdown() {
    const now = new Date().getTime();
    const endTime = new Date(now + 24 * 60 * 60 * 1000); // 24 hours from now
    
    function update() {
      const currentTime = new Date().getTime();
      const distance = endTime - currentTime;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
      
      if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = '<p>L\'offre est terminée !</p>';
      }
    }
    
    update();
    const countdownInterval = setInterval(update, 1000);
  }
  
  // Spots Counter
  function updateSpots() {
    const spotsElement = document.getElementById('spotsLeft');
    const currentSpots = parseInt(spotsElement.textContent);
    
    if (currentSpots > 5) {
      const interval = setInterval(() => {
        const spots = parseInt(spotsElement.textContent);
        if (Math.random() < 0.3 && spots > 5) { // 30% chance to decrease
          spotsElement.textContent = spots - 1;
        }
      }, 10000); // Check every 10 seconds
    }
  }