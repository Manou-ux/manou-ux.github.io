// Accordion toggle
document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Fermer tous les accordéons
    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.accordion-toggle').forEach(b => b.classList.remove('active'));
    
    if (!isActive) {
      content.classList.add('active');
      button.classList.add('active');
    }
  });
});

// Animation barres de progression avec couleur dynamique
document.querySelectorAll('.progress-bar').forEach(bar => {
  const level = parseInt(bar.dataset.level, 10);
  const fill = bar.querySelector('div');
  fill.style.width = level + '%';

  // Set class by level
  if (level >= 75) {
    bar.classList.add('level-high');
  } else if (level >= 40) {
    bar.classList.add('level-mid');
  } else {
    bar.classList.add('level-low');
  }
});

// Info button toggle
document.querySelectorAll('.info-button').forEach(button => {
  const type = button.dataset.type;
  const popup = document.createElement('div');
  popup.className = 'info-popup';
  popup.innerText = type === 'professionnel' ? 'Projet professionnel' : 'Projet académique';
  button.parentElement.appendChild(popup);

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });

  // Cacher si on clique ailleurs
  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !popup.contains(e.target)) {
      popup.style.display = 'none';
    }
  });
});

// Téléchargement du CV
const downloadCvBtn = document.getElementById('download-cv');
const downloadModal = document.getElementById('download-modal');
const closeModal = document.querySelector('.close-modal');

downloadCvBtn.addEventListener('click', () => {
  downloadModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  downloadModal.style.display = 'none';
});

// Fermer la modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
  if (e.target === downloadModal) {
    downloadModal.style.display = 'none';
  }
});

// Bouton retour en haut
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Navigation responsive
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Changement de thème
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Vérifier le thème sauvegardé ou la préférence système
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  }
});

// Animation au défilement
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.project-card, .section-title').forEach(el => {
  observer.observe(el);
});