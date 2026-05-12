/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — main.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Page Loader ── */
    const loader = document.getElementById('pageLoader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader?.classList.add('hidden');
            document.body.style.overflow = '';
            triggerReveal();
        }, 1800);
    });
    document.body.style.overflow = 'hidden';


    /* ── Custom Cursor ── */
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
    });

    function lerpCursor() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(lerpCursor);
    }
    lerpCursor();

    document.querySelectorAll('a, button, .proj-img, .hero-img-frame').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });


    /* ── Navigation: scroll + mobile ── */
    const nav      = document.getElementById('mainNav');
    const burger   = document.getElementById('burgerBtn');
    const navMenu  = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    /* ── Smooth scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ── Scroll Reveal ── */
    const revealEls = document.querySelectorAll('.reveal');

    function triggerReveal() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || 0;
                    setTimeout(() => el.classList.add('visible'), delay);
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.12 });

        // Add staggered delays to grouped elements
        document.querySelectorAll('.proj-item .reveal, .tl-item.reveal, .skill-row.reveal').forEach((el, i) => {
            const siblings = el.closest('.proj-item, .tl-col, .skills-panel')?.querySelectorAll('.reveal') || [];
            const idx = Array.from(siblings).indexOf(el);
            el.dataset.delay = idx * 80;
        });

        revealEls.forEach(el => io.observe(el));
    }

    // Trigger immediately for already-visible hero elements
    triggerReveal();


    /* ── Skills Tabs ── */
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const panels    = document.querySelectorAll('.skills-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.dataset.panel === target) {
                    panel.classList.add('active');
                    // Animate bars
                    setTimeout(() => animateBars(panel), 50);
                }
            });
        });
    });

    function animateBars(panel) {
        panel.querySelectorAll('.sk-fill').forEach(bar => {
            bar.style.width = (bar.dataset.w || 0) + '%';
        });
    }

    // Animate bars when skills section enters viewport
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const activePanel = document.querySelector('.skills-panel.active');
                if (activePanel) animateBars(activePanel);
                skillsObserver.disconnect();
            }
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }


    /* ── CV Download Toggle ── */
    const dlTrigger = document.getElementById('dlTrigger');
    const dlOptions = document.getElementById('dlOptions');

    if (dlTrigger) {
        dlTrigger.addEventListener('click', () => {
            dlTrigger.classList.toggle('open');
            dlOptions.classList.toggle('open');
        });
        document.addEventListener('click', e => {
            if (!dlTrigger.contains(e.target) && !dlOptions.contains(e.target)) {
                dlTrigger.classList.remove('open');
                dlOptions.classList.remove('open');
            }
        });
    }


    /* ── Contact Form ── */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            btn.disabled = true;

            try {
                const data = new FormData(form);
                const res = await fetch(form.action, {
                    method: 'POST', body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                    btn.style.background = '#00ff88';
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = original;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 4000);
                } else {
                    throw new Error();
                }
            } catch {
                btn.innerHTML = '<i class="fas fa-times"></i> Erreur, réessayez';
                btn.style.background = '#ff4757';
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }


    /* ── Active Nav Link on Scroll ── */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active-link');
            }
        });
    });

});

// Gestion de l'affichage des projets (Voir plus / Voir moins)
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const hiddenProjects = document.getElementById('hiddenProjects');
    
    if (toggleBtn && hiddenProjects) {
        let isExpanded = false;
        
        toggleBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Afficher les projets cachés
                hiddenProjects.style.display = 'block';
                toggleBtn.innerHTML = 'Voir moins<i class="fas fa-arrow-up"></i>';
                toggleBtn.classList.add('active');
                
                // Animation pour chaque projet qui apparaît
                const hiddenProjectItems = hiddenProjects.querySelectorAll('.proj-item');
                hiddenProjectItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, index * 100);
                });
            } else {
                // Cacher les projets
                hiddenProjects.style.display = 'none';
                toggleBtn.innerHTML = 'Voir plus<i class="fas fa-arrow-down"></i>';
                toggleBtn.classList.remove('active');

                // Retour à la section projets
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
