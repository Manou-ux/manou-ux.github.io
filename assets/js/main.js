
// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1000);
});

// Navigation expand - Version corrigée
const navExpand = document.getElementById('nav-expand');
const navExpandList = document.getElementById('nav-expand-list');
const navExpandIcon = document.getElementById('nav-expand-icon');

navExpand.addEventListener('click', (e) => {
    e.stopPropagation(); // Empêche la propagation du clic
    navExpandList.classList.toggle('show');
    navExpandIcon.classList.toggle('ri-settings-3-line');
    navExpandIcon.classList.toggle('ri-close-line');
});

// Fermer le menu si on clique ailleurs
document.addEventListener('click', (e) => {
    if (!navExpand.contains(e.target) && !navExpandList.contains(e.target)) {
        navExpandList.classList.remove('show');
        navExpandIcon.classList.remove('ri-close-line');
        navExpandIcon.classList.add('ri-settings-3-line');
    }
});

// Theme toggle - Version corrigée
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Vérifier le thème sauvegardé ou la préférence système
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Appliquer le thème
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
    }
    localStorage.setItem('theme', theme);
}

// Initialisation du thème
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

// Gestion du toggle
themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
});

// Surveiller les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Download CV dropdown
const downloadBtn = document.getElementById('download-btn');
const downloadOptions = document.getElementById('download-options');

downloadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = downloadOptions.classList.contains('invisible');
    if (isHidden) {
        downloadOptions.classList.remove('invisible', 'opacity-0', 'scale-95');
        downloadOptions.classList.add('visible', 'opacity-100', 'scale-100');
    } else {
        downloadOptions.classList.remove('visible', 'opacity-100', 'scale-100');
        downloadOptions.classList.add('invisible', 'opacity-0', 'scale-95');
    }
});

window.addEventListener('click', (e) => {
    if (!downloadBtn.contains(e.target) && !downloadOptions.contains(e.target)) {
        downloadOptions.classList.remove('visible', 'opacity-100', 'scale-100');
        downloadOptions.classList.add('invisible', 'opacity-0', 'scale-95');
    }
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

// Form submission - Laisser Formspree gérer l'envoi
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Laisser Formspree gérer l'envoi, on peut juste afficher un message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Réactiver le bouton après un délai (au cas où)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.project-item, .skill-pill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gestion des images manquantes
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = document.createElement('span');
            fallback.className = 'logo-fallback';
            fallback.textContent = this.alt.substring(0, 2);
            this.parentNode.insertBefore(fallback, this.nextSibling);
        });
    });
});


// Gestion des projets - Affichage par lots
let visibleProjects = 3;
const allProjects = document.querySelectorAll('.project-item');
const loadMoreBtn = document.getElementById('loadMoreProjectsBtn');
const loadLessBtn = document.getElementById('loadLessProjectsBtn');

function updateProjectsVisibility() {
    allProjects.forEach((project, index) => {
        if (index < visibleProjects) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });

    // Gestion des boutons
    if (visibleProjects >= allProjects.length) {
        loadMoreBtn.classList.add('hidden');
        loadLessBtn.classList.remove('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
        loadLessBtn.classList.add('hidden');
    }
}

loadMoreBtn.addEventListener('click', () => {
    visibleProjects += 3;
    if (visibleProjects > allProjects.length) {
        visibleProjects = allProjects.length;
    }
    updateProjectsVisibility();
});

loadLessBtn.addEventListener('click', () => {
    visibleProjects = 3;
    updateProjectsVisibility();
});

// Initialisation
updateProjectsVisibility();





// Fonction pour générer les étoiles
function generateStars() {
    const starContainers = document.querySelectorAll('.stars-rating');
    
    starContainers.forEach(container => {
        const starCount = parseInt(container.getAttribute('data-stars'));
        const totalStars = 5;
        
        // Vider le conteneur
        container.innerHTML = '';
        
        // Ajouter les étoiles remplies
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('i');
            star.className = 'ri-star-fill';
            container.appendChild(star);
        }
        
        // Ajouter les étoiles vides
        for (let i = starCount; i < totalStars; i++) {
            const star = document.createElement('i');
            star.className = 'ri-star-line';
            container.appendChild(star);
        }
    });
}

// Appliquer au chargement
document.addEventListener('DOMContentLoaded', function() {
    generateStars();
});

// Réappliquer après le chargement complet
window.addEventListener('load', generateStars);