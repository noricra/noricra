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