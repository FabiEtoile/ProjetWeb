(function() {
  "use strict";

  // Fonctions de base
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;
    if (!header.classList.contains('header-scrolled')) {
      offset -= 16;
    }
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };


//Menu Burger
document.addEventListener("DOMContentLoaded", () => {
  // Fonction pour gérer le menu burger
  const handleMobileNav = () => {
    const navbar = select('#navbar');
    const body = document.body;

    navbar.classList.toggle('active');

    // Ajoute ou supprime une classe pour gérer l'affichage du menu
    if (navbar.classList.contains('active')) {
      body.classList.add('menu-open'); // Ajoute une classe pour masquer le contenu lorsque le menu est ouvert
    } else {
      body.classList.remove('menu-open'); // Supprime la classe lorsque le menu est fermé
    }
  };

  // Ajoute un écouteur d'événements au clic sur le bouton du menu burger
  on('click', '.mobile-nav-toggle', handleMobileNav);
});




  // Bouton Retour en Haut
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Navigation Mobile
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Carrousel de diapositives
  let currentSlide = 0;
  const slides = select('.carousel-item', true);
  const indicators = select('.indicator', true);
  const totalSlides = slides.length;
  let slideInterval;

  const updateSlidePosition = () => {
    slides.forEach((slide, index) => {
      slide.style.display = 'none';
      indicators[index].classList.remove('active');
    });

    slides[currentSlide].style.display = 'flex';
    indicators[currentSlide].classList.add('active');
  };

  const moveToNextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  };

  const startSlideShow = () => {
    slideInterval = setInterval(moveToNextSlide, 10000); // Change de diapositive toutes les 10 secondes
  };

  const resetSlideShow = () => {
    clearInterval(slideInterval);
    startSlideShow();
  };

  // Ajout d'un écouteur d'événements pour chaque indicateur
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateSlidePosition();
      resetSlideShow(); // Réinitialise le timer lorsque l'utilisateur change manuellement de diapositive
    });
  });

  // Initialise le carrousel
  startSlideShow();


})();