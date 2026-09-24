/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — main.js (editorial light)
   ═══════════════════════════════════════════ */

'use strict';

function buildProjectCard(p) {
    const galleryBtn = `<a href="#"
        class="btn btn-primary js-open-gallery-modal"
        data-gallery="${p.gallery.join(', ')}"
        data-gallery-alt="${p.galleryAlt}"
        aria-haspopup="dialog"><i class="fas fa-external-link-alt" aria-hidden="true"></i> Voir</a>`;

    const links = [galleryBtn];
    p.links.forEach(l => {
        if (l.type === 'github') {
            links.push(`<a href="${l.url}" class="btn btn-ghost" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> ${l.label}</a>`);
        } else if (l.type === 'private') {
            links.push(`<a href="javascript:void(0)" class="btn btn-ghost btn-private" title="Privé"><i class="fas fa-lock" aria-hidden="true"></i> ${l.label}</a>`);
        } else if (l.type === 'alert') {
            links.push(`<a href="#" class="btn btn-ghost js-alert-link" data-msg="${l.msg}"><i class="fab fa-github" aria-hidden="true"></i> ${l.label}</a>`);
        } else if (l.type === 'contact') {
            links.push(`<a href="#contact" class="btn btn-ghost"><i class="fas fa-envelope" aria-hidden="true"></i> ${l.label}</a>`);
        }
    });

    return `
        <article class="proj-card reveal" data-num="${p.num}">
            <figure class="proj-media">
                <img src="${p.image}" alt="${p.alt}" loading="lazy" decoding="async">
            </figure>
            <div class="proj-info">
                <div class="proj-meta">
                    <h3 class="proj-title">${p.title}</h3>
                    <span class="proj-type">${p.type}</span>
                </div>
                <p class="proj-desc">${p.desc}</p>
                <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <div class="proj-actions">${links.join('')}</div>
            </div>
        </article>`;
}

function renderProjects() {
    const list = document.getElementById('projectsList');
    const hidden = document.getElementById('hiddenProjects');
    if (!list) return;
    PROJECTS.forEach(p => {
        const container = (p.featured) ? list : hidden;
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
    if (loader) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                triggerReveal();
            }, 1800);
        });
    }

    /* ── Navigation: scroll + mobile ── */
    const nav = document.getElementById('mainNav');
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    if (burger && navMenu) {
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
    }

    /* ── Smooth scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            if (typeof target.scrollIntoView === 'function') {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.hash = href;
            }
            if (burger) {
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            }
            if (navMenu) navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ── Scroll Reveal ── */
    let revealObserver = null;
    const hasIO = 'IntersectionObserver' in window;

    function triggerReveal() {
        const revealEls = document.querySelectorAll('.reveal');
        if (!hasIO) {
            revealEls.forEach(el => el.classList.add('visible'));
            return;
        }
        if (revealObserver) {
            revealEls.forEach(el => revealObserver.observe(el));
            return;
        }
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = Number(el.dataset.delay || 0);
                    setTimeout(() => el.classList.add('visible'), delay);
                    revealObserver.unobserve(el);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.proj-card.reveal, .tl-item.reveal, .skill-row.reveal').forEach(el => {
            const group = el.closest('.proj-card, .tl-col, .skills-panel');
            const siblings = group ? group.querySelectorAll('.reveal') : [];
            const idx = Array.from(siblings).indexOf(el);
            el.dataset.delay = idx * 80;
        });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    triggerReveal();

    /* ── Skills Tabs ── */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.skills-panel');
    const skillsTabs = document.querySelector('.skills-tabs');

    function centerActiveTab(btn) {
        if (!skillsTabs || !btn || typeof skillsTabs.scrollBy !== 'function') return;
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

    const initialActiveTab = document.querySelector('.tab-btn.active');
    if (initialActiveTab) centerActiveTab(initialActiveTab);

    const skillsSection = document.getElementById('skills');
    if (skillsSection && hasIO) {
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

    if (dlTrigger && dlOptions) {
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
            btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Envoi en cours...';
            btn.disabled = true;

            try {
                const data = new FormData(form);
                const res = await fetch(form.action, {
                    method: 'POST', body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('Request failed');

                btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Message envoyé !';
                btn.style.background = '#0D9060';
                form.reset();
            } catch {
                btn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i> Erreur, réessayez';
                btn.style.background = '#C7402E';
            }

            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
            }, 4000);
        });
    }

    /* ── Active Nav Link on Scroll ── */
    const sections = document.querySelectorAll('section[id]');
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                if (window.scrollY >= section.offsetTop - 220) {
                    current = section.id;
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
            });
        }, { passive: true });
    }

    /* ── Projects toggle (Voir plus / Voir moins) ── */
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const hiddenContainer = document.getElementById('hiddenProjects');

    if (toggleBtn && hiddenContainer) {
        let isExpanded = false;

        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            if (isExpanded) {
                hiddenContainer.classList.add('open');
                toggleBtn.innerHTML = 'Voir moins <i class="fas fa-arrow-up" aria-hidden="true"></i>';
                toggleBtn.setAttribute('aria-expanded', 'true');

                hiddenContainer.querySelectorAll('.proj-card').forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                    item.classList.add('visible');
                });
            } else {
                hiddenContainer.classList.remove('open');
                toggleBtn.innerHTML = 'Voir plus <i class="fas fa-arrow-down" aria-hidden="true"></i>';
                toggleBtn.setAttribute('aria-expanded', 'false');

                const projectsSection = document.getElementById('projects');
                if (projectsSection && typeof projectsSection.scrollIntoView === 'function') {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
});