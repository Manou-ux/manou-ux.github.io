/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — main.js
   ═══════════════════════════════════════════ */

function buildProjectCard(p) {
    const galleryBtn = `<a href="#"
        class="proj-link-btn js-open-gallery-modal"
        data-gallery="${p.gallery.join(', ')}"
        data-gallery-alt="${p.galleryAlt}"
        aria-haspopup="dialog"><i class="fas fa-external-link-alt"></i> Voir</a>`;

    const links = [galleryBtn];
    p.links.forEach(l => {
        if (l.type === 'github') {
            links.push(`<a href="${l.url}" class="proj-link-btn ghost" target="_blank" rel="noopener"><i class="fab fa-github"></i> ${l.label}</a>`);
        } else if (l.type === 'private') {
            links.push(`<a href="javascript:void(0)" class="proj-link-btn ghost btn-private" title="Privé"><i class="fas fa-lock"></i> ${l.label}</a>`);
        } else if (l.type === 'alert') {
            links.push(`<a href="#" class="proj-link-btn ghost js-alert-link" data-msg="${l.msg}"><i class="fab fa-github"></i> ${l.label}</a>`);
        } else if (l.type === 'contact') {
            links.push(`<a href="#contact" class="proj-link-btn ghost"><i class="fas fa-envelope"></i> ${l.label}</a>`);
        }
    });

    return `
        <article class="proj-item reveal" data-num="${p.num}">
            <div class="proj-img">
                <img src="${p.image}" alt="${p.alt}" loading="lazy" decoding="async">
            </div>
            <div class="proj-body">
                <div class="proj-top">
                    <h3 class="proj-title">${p.title}</h3>
                    <span class="proj-type">${p.type}</span>
                </div>
                <p class="proj-desc">${p.desc}</p>
                <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <div class="proj-links">${links.join('')}</div>
            </div>
        </article>`;
}

function renderProjects() {
    const list = document.getElementById('projectsList');
    const hidden = document.getElementById('hiddenProjects');
    if (!list) return;
    PROJECTS.forEach(p => {
        const container = (p.featured && hidden) ? list : (hidden || list);
        container.insertAdjacentHTML('beforeend', buildProjectCard(p));
    });
}

document.addEventListener('DOMContentLoaded', () => {

    /* ── Render projects from data ── */
    renderProjects();
    document.addEventListener('click', e => {
        const alertLink = e.target.closest('.js-alert-link');
        if (alertLink) {
            e.preventDefault();
            alert(alertLink.dataset.msg || 'Le code source est actuellement indisponible.');
        }
    });

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
        const isOpen = burger.classList.toggle('open');
        navMenu.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    /* ── Smooth scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ── Scroll Reveal ── */
    function triggerReveal() {
        const revealEls = document.querySelectorAll('.reveal');
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
    const skillsTabs = document.querySelector('.skills-tabs');

    function centerActiveTab(btn) {
        if (!skillsTabs || !btn) return;
        const containerRect = skillsTabs.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const delta = (btnRect.left + btnRect.width / 2) - (containerRect.left + containerRect.width / 2);
        skillsTabs.scrollBy({ left: delta, behavior: 'smooth' });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            centerActiveTab(btn);

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

    // Keep active tab visible/centered when page loads.
    const initialActiveTab = document.querySelector('.tab-btn.active');
    if (initialActiveTab) {
        centerActiveTab(initialActiveTab);
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
            const isOpen = dlTrigger.classList.toggle('open');
            dlOptions.classList.toggle('open');
            dlTrigger.setAttribute('aria-expanded', String(isOpen));
        });
        document.addEventListener('click', e => {
            if (!dlTrigger.contains(e.target) && !dlOptions.contains(e.target)) {
                dlTrigger.classList.remove('open');
                dlOptions.classList.remove('open');
                dlTrigger.setAttribute('aria-expanded', 'false');
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
    const hiddenContainer = document.getElementById('hiddenProjects');

    if (toggleBtn && hiddenContainer) {
        let isExpanded = false;

        toggleBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;

            if (isExpanded) {
                hiddenContainer.classList.add('open');
                toggleBtn.innerHTML = 'Voir moins<i class="fas fa-arrow-up"></i>';
                toggleBtn.setAttribute('aria-expanded', 'true');

                const items = hiddenContainer.querySelectorAll('.proj-item');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                    item.classList.add('visible');
                });
            } else {
                hiddenContainer.classList.remove('open');
                toggleBtn.innerHTML = 'Voir plus<i class="fas fa-arrow-down"></i>';
                toggleBtn.setAttribute('aria-expanded', 'false');

                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});