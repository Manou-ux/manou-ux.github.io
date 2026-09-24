/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — i18n.js
   Traductions FR / EN + paramètres (thème, langue)
   ═══════════════════════════════════════════ */

'use strict';

const I18N = {
    fr: {
        /* meta */
        'meta.title': 'Rajosvah Manou — Dev',
        'meta.desc': 'Portfolio de Rajosvah Manou, développeur et technicien informatique à Antananarivo (Madagascar) : projets web, desktop, mobile, compétences et contact.',

        /* nav */
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.skills': 'Compétences',
        'nav.projects': 'Projets',
        'nav.exp': 'Parcours',
        'nav.contact': 'Contact',
        'nav.settings': 'Paramètres',

        /* hero */
        'hero.label': 'Développeur & Technicien Informatique',
        'hero.sub': 'Je transforme des idées en réalités digitales — du frontend au backend, du code au composant.',
        'hero.view': 'Voir mes projets',
        'hero.contact': 'Me contacter',
        'hero.stat1': "année d'expérience",
        'hero.stat2': 'projets livrés',
        'hero.stat3': 'Informatique - EMIT',
        'hero.scroll': 'scroll',

        /* about */
        'tag.about': 'À propos',
        'about.h2': 'Qui suis-je<em>?</em>',
        'about.lead': 'Je suis <strong>RAJOSVAH Manohisoa Hasimandimby</strong>, 22 ans. Étudiant en 1ʳᵉ année de Master Informatique — Parcours DA2I (Développement d’Applications Internet et Intranet) à EMIT, Université de Fianarantsoa.',
        'about.p1': 'Chaque projet est une nouvelle aventure où j’explore des solutions innovantes pour répondre aux défis technologiques d’aujourd’hui. Je valorise la précision, qu’il s’agisse d’architecture logicielle, de performance système ou de stabilité matérielle.',
        'about.p2': 'En constante évolution, je m’intéresse particulièrement aux nouvelles technologies émergentes : l’IA, la réalité augmentée et les expériences immersives.',
        'about.dl': 'Télécharger mon CV',
        'about.dlPdf': 'Format PDF',
        'about.dlImg': 'Format Image',

        /* skills */
        'tag.skills': 'Expertise',
        'skills.h2': 'Expertise <em>Technique</em>',
        'skills.tabs.aria': 'Catégories de compétences',
        'tab.lang': 'Langages',
        'tab.frontend': 'Frontend & Backend',
        'tab.data': 'Data & Outils',
        'tab.network': 'Réseau & Conception',
        'tab.software': 'Software & Hardware',
        'skill.js': 'JavaScript / TypeScript',
        'skill.java': 'Java (SE)',
        'skill.csharp': 'C# (.NET)',
        'skill.python': 'Python',
        'skill.php': 'PHP',
        'skill.html': 'HTML5 / CSS3',
        'skill.section.fe': 'Frontend',
        'skill.section.be': 'Backend',
        'skill.react': 'React.js',
        'skill.vue': 'Vue.js',
        'skill.tailwind': 'Tailwind CSS',
        'skill.uiux': 'Design UI/UX',
        'skill.figma': 'Figma',
        'skill.wp': 'WordPress',
        'skill.spring': 'Spring Boot',
        'skill.dotnet': 'ASP.NET Core',
        'skill.node': 'Node.js / Express',
        'skill.laravel': 'Laravel',
        'skill.flask': 'Flask',
        'skill.mysql': 'MySQL',
        'skill.pg': 'PostgreSQL',
        'skill.mssql': 'SQL Server',
        'skill.git': 'Git / GitHub / GitLab',
        'skill.postman': 'Postman / API Testing',
        'skill.netprog': 'Programmation réseau (TCP/UDP/IP, HTTP)',
        'skill.netadmin': 'Administration réseau / Sécurité',
        'skill.uml': 'UML (Modélisation)',
        'skill.merise': 'MERISE II (MCD / MLD / MPD)',
        'skill.javadsk': 'Java SE (Desktop / Swing / JavaFX)',
        'skill.cdsk': 'C# (Desktop / WinForms / WPF)',
        'skill.flutter': 'Flutter (Mobile - iOS/Android)',
        'skill.archi': 'Architecture logicielle',
        'skill.hw': 'Hardware (matériel informatique)',

        /* projects */
        'tag.projects': 'Réalisations',
        'projects.h2': 'Mes <em>Projets</em>',
        'projects.sub': 'Mes projets témoignent de ma maîtrise de technologies variées et de ma capacité à m’adapter à différents environnements.',
        'projects.more': 'Voir plus',
        'projects.less': 'Voir moins',
        'btn.view': 'Voir',
        'btn.source': 'Code Source',
        'btn.private': 'Privé',
        'btn.contact': 'Me contacter',
        'alert.unavailable': 'Le code source est actuellement indisponible.',
        'alert.private': 'Code source privé (projet client).',
        'proj.01.title': 'DiabetesTrack',
        'proj.01.type': 'App Mobile',
        'proj.01.desc': 'Suivi du diabète : glycémie, médicaments et alimentation.',
        'proj.02.title': 'Suivi des Dossiers du Ministère',
        'proj.02.type': 'App Web',
        'proj.02.desc': 'Application web développée pour le Ministère de l’Agriculture et de l’Élevage (MINAE) — Anosy, Antananarivo. Centralise le suivi des dossiers, déployée sur serveur IIS.',
        'proj.03.title': 'FlowlessTech',
        'proj.03.type': 'E-commerce',
        'proj.03.desc': 'Site e-commerce moderne dédié à la vente de PC gamer et matériel informatique. Gestion complète des produits, panier, commandes et paiements. Design responsive et optimisé.',
        'proj.04.title': 'SONATRA+ (C#)',
        'proj.04.type': 'Desktop C#',
        'proj.04.desc': 'Version desktop du projet SONATRA+ développée en C# avec interface Windows Forms et base de données SQL Server.',
        'proj.05.title': 'Gestion Hospitalière',
        'proj.05.type': 'Desktop Java',
        'proj.05.desc': 'Application desktop de gestion hospitalière — patients, données médicales, prescriptions et fiches médicales. Développée en Java avec NetBeans.',
        'proj.06.title': 'SONATRA+',
        'proj.06.type': 'App Web',
        'proj.06.desc': 'Application de gestion complète pour coopérative de taxi-brousse. Gestion des trajets, chauffeurs, véhicules, réservations et facturation.',
        'proj.07.title': 'Excellente maîtrise du hardware',
        'proj.07.type': 'Matériel',
        'proj.07.desc': 'Connaissances élevées en matériels informatiques. Assemblage complet d’unités centrales, diagnostic matériel, maintenance préventive et corrective, conseils d’achat et d’optimisation de systèmes.',

        /* experience */
        'tag.exp': 'Parcours',
        'exp.h2': 'Expérience & <em>Formation</em>',
        'exp.col.work': 'Expériences',
        'exp.col.edu': 'Formation',
        'exp.work1.t': 'Stage — Dev Web Full Stack',
        'exp.work1.p': 'Développement d’une application web pour centraliser le suivi des dossiers au Ministère de l’Agriculture et de l’Élevage (MINAE) — Anosy, Antananarivo.',
        'exp.work2.t': 'Secrétaire Administrative (DRH p.i.)',
        'exp.work2.p': 'Gestion des courriers, classement et suivi des dossiers administratifs, support à la DRH — Ministère de l’Agriculture et de l’Élevage.',
        'exp.work3.t': 'Développeur Full Stack (Freelance)',
        'exp.work3.p': 'Développement de solutions web complètes, de la conception à la mise en production. Intégration d’APIs, optimisation SEO, backend Node.js et Python.',
        'exp.work4.t': 'Développeur Web Junior',
        'exp.work4.p': 'Première expérience professionnelle. Sites e-commerce et applications web. Apprentissage des bonnes pratiques et méthodologies agiles.',
        'exp.badge.inprogress': 'En cours',
        'exp.edu1.t': 'M1 — Master Informatique',
        'exp.edu1.p': 'EMIT, Université de Fianarantsoa. Parcours DA2I : développement d’applications internet et intranet approfondi, recherche et projets de spécialisation.',
        'exp.badge.done': 'Validée',
        'exp.edu2.t': 'L3 — Mention DA2I',
        'exp.edu2.p': 'EMIT, Université de Fianarantsoa. Architectures distribuées, sécurité informatique, gestion de projet, développement internet et intranet.',
        'exp.badge.done2': 'Validée',
        'exp.edu3.t': 'L2 — Licence Informatique',
        'exp.edu3.p': 'EMIT, Université de Fianarantsoa. Algorithmique avancée, bases de données relationnelles, architectures client-serveur.',
        'exp.badge.got': 'Obtenu',
        'exp.edu4.t': 'L1 — Licence Informatique',
        'exp.edu4.p': 'EMIT, Université de Fianarantsoa. Bases fondamentales : algorithmique, programmation structurée, architecture des ordinateurs.',
        'exp.edu5.t': 'Baccalauréat Scientifique (Série S)',
        'exp.edu5.p': 'Lycée Moderne Ampefiloha (LMA), Antananarivo. Base matière : mathématiques et sciences physiques.',

        /* contact */
        'tag.contact': 'Contact',
        'contact.h2': 'Travaillons <em>Ensemble</em>',
        'contact.intro': 'Disponible pour des missions freelance, des collaborations ou un poste à temps plein. N’hésitez pas à me contacter !',
        'contact.email': 'Email',
        'contact.phone': 'Téléphone & WhatsApp',
        'contact.loc': 'Localisation',
        'form.name': 'Nom complet',
        'form.namePh': 'Votre nom et prénom',
        'form.email': 'Email',
        'form.emailPh': 'votre.email@exemple.com',
        'form.message': 'Message',
        'form.messagePh': 'Décrivez votre projet, vos besoins et vos attentes...',
        'form.send': 'Envoyer',
        'form.sending': 'Envoi en cours...',
        'form.success': 'Message envoyé !',
        'form.error': 'Erreur, réessayez',

        /* footer */
        'footer.tagline': 'Créateur d’expériences digitales — du code au composant.',
        'footer.copy': '© 2026 — rajosvahmanou@gmail.com · Tous droits réservés.',

        /* gallery */
        'gallery.aria': 'Captures d’écran de l’application',
        'gallery.close': 'Fermer la galerie',
        'gallery.h2': 'Captures d’écran',
        'gallery.hint': '— cliquez pour voir',
        'gallery.thumbFallback': 'Capture d’écran',

        /* preview */
        'preview.aria': 'Aperçu image en grand',
        'preview.fsOn': 'Activer le plein écran',
        'preview.fsOff': 'Quitter le plein écran',
        'preview.close': 'Fermer l’aperçu',
        'preview.prev': 'Image précédente',
        'preview.next': 'Image suivante',
        'preview.alt': 'Capture d’écran en très grand',

        /* settings */
        'settings.aria': 'Paramètres',
        'settings.close': 'Fermer',
        'settings.title': 'Paramètres',
        'settings.mode': "Mode d'affichage",
        'settings.mode.aria': "Mode d'affichage",
        'settings.light': 'Clair',
        'settings.dark': 'Sombre',
        'settings.system': 'Système',
        'settings.lang': 'Langue',
        'settings.lang.aria': 'Langue',
        'lang.fr': 'Français',
        'lang.en': 'English'
    },

    en: {
        /* meta */
        'meta.title': 'Rajosvah Manou — Developer',
        'meta.desc': 'Portfolio of Rajosvah Manou, developer and IT technician in Antananarivo (Madagascar): web, desktop and mobile projects, skills and contact.',

        /* nav */
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.exp': 'Journey',
        'nav.contact': 'Contact',
        'nav.settings': 'Settings',

        /* hero */
        'hero.label': 'Developer & IT Technician',
        'hero.sub': 'I turn ideas into digital realities — from frontend to backend, from code to component.',
        'hero.view': 'View my projects',
        'hero.contact': 'Contact me',
        'hero.stat1': 'year of experience',
        'hero.stat2': 'projects delivered',
        'hero.stat3': 'Computer Science - EMIT',
        'hero.scroll': 'scroll',

        /* about */
        'tag.about': 'About',
        'about.h2': 'Who I am<em>?</em>',
        'about.lead': 'I am <strong>RAJOSVAH Manohisoa Hasimandimby</strong>, 22 years old. 1st-year Master’s student in Computer Science — DA2I track (Internet & Intranet Application Development) at EMIT, University of Fianarantsoa.',
        'about.p1': 'Every project is a new adventure where I explore innovative solutions to today’s technological challenges. I value precision, whether in software architecture, system performance or hardware stability.',
        'about.p2': 'Constantly evolving, I’m particularly interested in emerging technologies: AI, augmented reality and immersive experiences.',
        'about.dl': 'Download my CV',
        'about.dlPdf': 'PDF format',
        'about.dlImg': 'Image format',

        /* skills */
        'tag.skills': 'Expertise',
        'skills.h2': 'Technical <em>Expertise</em>',
        'skills.tabs.aria': 'Skill categories',
        'tab.lang': 'Languages',
        'tab.frontend': 'Frontend & Backend',
        'tab.data': 'Data & Tools',
        'tab.network': 'Network & Design',
        'tab.software': 'Software & Hardware',
        'skill.js': 'JavaScript / TypeScript',
        'skill.java': 'Java (SE)',
        'skill.csharp': 'C# (.NET)',
        'skill.python': 'Python',
        'skill.php': 'PHP',
        'skill.html': 'HTML5 / CSS3',
        'skill.section.fe': 'Frontend',
        'skill.section.be': 'Backend',
        'skill.react': 'React.js',
        'skill.vue': 'Vue.js',
        'skill.tailwind': 'Tailwind CSS',
        'skill.uiux': 'UI/UX Design',
        'skill.figma': 'Figma',
        'skill.wp': 'WordPress',
        'skill.spring': 'Spring Boot',
        'skill.dotnet': 'ASP.NET Core',
        'skill.node': 'Node.js / Express',
        'skill.laravel': 'Laravel',
        'skill.flask': 'Flask',
        'skill.mysql': 'MySQL',
        'skill.pg': 'PostgreSQL',
        'skill.mssql': 'SQL Server',
        'skill.git': 'Git / GitHub / GitLab',
        'skill.postman': 'Postman / API Testing',
        'skill.netprog': 'Network programming (TCP/UDP/IP, HTTP)',
        'skill.netadmin': 'Network administration / Security',
        'skill.uml': 'UML (Modeling)',
        'skill.merise': 'MERISE II (MCD / MLD / MPD)',
        'skill.javadsk': 'Java SE (Desktop / Swing / JavaFX)',
        'skill.cdsk': 'C# (Desktop / WinForms / WPF)',
        'skill.flutter': 'Flutter (Mobile - iOS/Android)',
        'skill.archi': 'Software architecture',
        'skill.hw': 'Hardware',

        /* projects */
        'tag.projects': 'Work',
        'projects.h2': 'My <em>Projects</em>',
        'projects.sub': 'My projects reflect my command of a wide range of technologies and my ability to adapt to different environments.',
        'projects.more': 'Show more',
        'projects.less': 'Show less',
        'btn.view': 'View',
        'btn.source': 'Source Code',
        'btn.private': 'Private',
        'btn.contact': 'Contact me',
        'alert.unavailable': 'The source code is currently unavailable.',
        'alert.private': 'Private source code (client project).',
        'proj.01.title': 'DiabetesTrack',
        'proj.01.type': 'Mobile App',
        'proj.01.desc': 'Diabetes tracking: blood sugar, medication and diet.',
        'proj.02.title': 'Ministry Case Tracking',
        'proj.02.type': 'Web App',
        'proj.02.desc': 'Web application built for the Ministry of Agriculture and Livestock (MINAE) — Anosy, Antananarivo. Centralizes case tracking, deployed on an IIS server.',
        'proj.03.title': 'FlowlessTech',
        'proj.03.type': 'E-commerce',
        'proj.03.desc': 'Modern e-commerce site dedicated to gaming PCs and computer hardware. Complete product, cart, order and payment management. Responsive and optimized design.',
        'proj.04.title': 'SONATRA+ (C#)',
        'proj.04.type': 'C# Desktop',
        'proj.04.desc': 'Desktop version of the SONATRA+ project built in C# with a Windows Forms interface and a SQL Server database.',
        'proj.05.title': 'Hospital Management',
        'proj.05.type': 'Java Desktop',
        'proj.05.desc': 'Desktop hospital management application — patients, medical data, prescriptions and medical records. Built in Java with NetBeans.',
        'proj.06.title': 'SONATRA+',
        'proj.06.type': 'Web App',
        'proj.06.desc': 'Complete management application for a taxi-brousse cooperative. Manages trips, drivers, vehicles, bookings and billing.',
        'proj.07.title': 'Advanced Hardware Expertise',
        'proj.07.type': 'Hardware',
        'proj.07.desc': 'Deep knowledge of computer hardware. Full PC assembly, hardware diagnostics, preventive and corrective maintenance, buying advice and system optimization.',

        /* experience */
        'tag.exp': 'Journey',
        'exp.h2': 'Experience & <em>Education</em>',
        'exp.col.work': 'Experience',
        'exp.col.edu': 'Education',
        'exp.work1.t': 'Internship — Full Stack Web Dev',
        'exp.work1.p': 'Development of a web application to centralize case tracking at the Ministry of Agriculture and Livestock (MINAE) — Anosy, Antananarivo.',
        'exp.work2.t': 'Administrative Secretary (acting HRM)',
        'exp.work2.p': 'Mail handling, filing and tracking of administrative files, HRM support — Ministry of Agriculture and Livestock.',
        'exp.work3.t': 'Full Stack Developer (Freelance)',
        'exp.work3.p': 'Building complete web solutions, from design to production. API integration, SEO optimization, Node.js and Python backends.',
        'exp.work4.t': 'Junior Web Developer',
        'exp.work4.p': 'First professional experience. E-commerce sites and web applications. Learning best practices and agile methodologies.',
        'exp.badge.inprogress': 'In progress',
        'exp.edu1.t': 'Master’s (1st year) — Computer Science',
        'exp.edu1.p': 'EMIT, University of Fianarantsoa. DA2I track: advanced internet and intranet application development, research and specialization projects.',
        'exp.badge.done': 'Completed',
        'exp.edu2.t': 'Bachelor (3rd year) — DA2I',
        'exp.edu2.p': 'EMIT, University of Fianarantsoa. Distributed architectures, IT security, project management, internet and intranet development.',
        'exp.badge.done2': 'Completed',
        'exp.edu3.t': 'Bachelor (2nd year) — Computer Science',
        'exp.edu3.p': 'EMIT, University of Fianarantsoa. Advanced algorithms, relational databases, client-server architectures.',
        'exp.badge.got': 'Obtained',
        'exp.edu4.t': 'Bachelor (1st year) — Computer Science',
        'exp.edu4.p': 'EMIT, University of Fianarantsoa. Core foundations: algorithms, structured programming, computer architecture.',
        'exp.edu5.t': 'Scientific Baccalaureate (Science track)',
        'exp.edu5.p': 'Lycée Moderne Ampefiloha (LMA), Antananarivo. Core subjects: mathematics and physical sciences.',

        /* contact */
        'tag.contact': 'Contact',
        'contact.h2': 'Let’s work <em>together</em>',
        'contact.intro': 'Available for freelance missions, collaborations or a full-time position. Feel free to reach out!',
        'contact.email': 'Email',
        'contact.phone': 'Phone & WhatsApp',
        'contact.loc': 'Location',
        'form.name': 'Full name',
        'form.namePh': 'Your first and last name',
        'form.email': 'Email',
        'form.emailPh': 'your.email@example.com',
        'form.message': 'Message',
        'form.messagePh': 'Describe your project, your needs and expectations...',
        'form.send': 'Send',
        'form.sending': 'Sending...',
        'form.success': 'Message sent!',
        'form.error': 'Error, try again',

        /* footer */
        'footer.tagline': 'Creator of digital experiences — from code to component.',
        'footer.copy': '© 2026 — rajosvahmanou@gmail.com · All rights reserved.',

        /* gallery */
        'gallery.aria': 'Application screenshots',
        'gallery.close': 'Close gallery',
        'gallery.h2': 'Screenshots',
        'gallery.hint': '— click to view',
        'gallery.thumbFallback': 'Screenshot',

        /* preview */
        'preview.aria': 'Large image preview',
        'preview.fsOn': 'Enable fullscreen',
        'preview.fsOff': 'Exit fullscreen',
        'preview.close': 'Close preview',
        'preview.prev': 'Previous image',
        'preview.next': 'Next image',
        'preview.alt': 'Large screenshot',

        /* settings */
        'settings.aria': 'Settings',
        'settings.close': 'Close',
        'settings.title': 'Settings',
        'settings.mode': 'Display mode',
        'settings.mode.aria': 'Display mode',
        'settings.light': 'Light',
        'settings.dark': 'Dark',
        'settings.system': 'System',
        'settings.lang': 'Language',
        'settings.lang.aria': 'Language',
        'lang.fr': 'Français',
        'lang.en': 'English'
    }
};

let currentLang = 'fr';

function getLang() {
    return currentLang;
}

function t(key) {
    const dict = I18N[currentLang] || I18N.fr;
    return key in dict ? dict[key] : key;
}

function setLang(lang) {
    currentLang = I18N[lang] ? lang : 'fr';
    try { localStorage.setItem('rmLang', currentLang); } catch (e) { /* privé/stockage indisponible */ }
    applyI18n();
}

function applyI18n() {
    document.documentElement.setAttribute('lang', currentLang);
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = t(el.dataset.i18n);
        if (el.textContent !== value) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        el.setAttribute('placeholder', t(el.dataset.i18nPh));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        el.setAttribute('alt', t(el.dataset.i18nAlt));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.setAttribute('title', t(el.dataset.i18nTitle));
    });

    if (window.onLanguageChanged) window.onLanguageChanged(currentLang);
}

function getThemeMode() {
    try {
        const stored = localStorage.getItem('rmTheme');
        return ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
    } catch (e) { return 'system'; }
}

function resolveTheme(mode) {
    if (mode === 'system') {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
}

function applyTheme(mode) {
    const theme = resolveTheme(mode);
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0E1410' : '#F6F4EF');
    if (window.onThemeChanged) window.onThemeChanged(theme, mode);
}

(function initFromStorage() {
    try {
        const lang = localStorage.getItem('rmLang');
        if (I18N[lang]) currentLang = lang;
    } catch (e) { /* stockage indisponible */ }
})();