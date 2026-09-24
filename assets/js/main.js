/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — main.js (editorial light)
   ═══════════════════════════════════════════ */

'use strict';

const alertKeyByProject = {
    '02': 'alert.private',
    '03': 'alert.unavailable'
};

function buildProjectCard(p) {
    const galleryBtn = `<a href="#"
        class="btn btn-primary js-open-gallery-modal"
        data-gallery="${p.gallery.join(', ')}"
        data-gallery-alt="${p.galleryAlt}"
        aria-haspopup="dialog"><i class="fas fa-external-link-alt" aria-hidden="true"></i> <span data-i18n="btn.view">${t('btn.view')}</span></a>`;

    const links = [galleryBtn];
    p.links.forEach(l => {
        if (l.type === 'github') {
            links.push(`<a href="${l.url}" class="btn btn-ghost" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> <span data-i18n="btn.source">${t('btn.source')}</span></a>`);
        } else if (l.type === 'private') {
            links.push(`<a href="javascript:void(0)" class="btn btn-ghost btn-private" title="${t('btn.private')}" data-i18n-title="btn.private"><i class="fas fa-lock" aria-hidden="true"></i> <span data-i18n="btn.private">${t('btn.private')}</span></a>`);
        } else if (l.type === 'alert') {
            const alertKey = alertKeyByProject[p.num] || 'alert.unavailable';
            links.push(`<a href="#" class="btn btn-ghost js-alert-link" data-alert-key="${alertKey}"><i class="fab fa-github" aria-hidden="true"></i> <span data-i18n="btn.source">${t('btn.source')}</span></a>`);
        } else if (l.type === 'contact') {
            links.push(`<a href="#contact" class="btn btn-ghost"><i class="fas fa-envelope" aria-hidden="true"></i> <span data-i18n="btn.contact">${t('btn.contact')}</span></a>`);
        }
    });

    return `
        <article class="proj-card reveal">
            <figure class="proj-media">
                <img src="${p.image}" alt="${p.alt}" loading="lazy" decoding="async">
            </figure>
            <div class="proj-info">
                <div class="proj-meta">
                    <h3 class="proj-title" data-i18n="proj.${p.num}.title">${p.title}</h3>
                    <span class="proj-type" data-i18n="proj.${p.num}.type">${p.type}</span>
                </div>
                <p class="proj-desc" data-i18n="proj.${p.num}.desc">${p.desc}</p>
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
            alert(t(alertLink.dataset.alertKey || 'alert.unavailable'));
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
            btn.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ${t('form.sending')}`;
            btn.disabled = true;

            try {
                const data = new FormData(form);
                const res = await fetch(form.action, {
                    method: 'POST', body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('Request failed');

                btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i> ${t('form.success')}`;
                btn.style.background = 'var(--green)';
                form.reset();
            } catch {
                btn.innerHTML = `<i class="fas fa-times" aria-hidden="true"></i> ${t('form.error')}`;
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
        const toggleLabel = toggleBtn.querySelector('span');
        const toggleIcon = toggleBtn.querySelector('i');

        const renderToggle = () => {
            if (toggleLabel) toggleLabel.textContent = t(isExpanded ? 'projects.less' : 'projects.more');
            if (toggleIcon) toggleIcon.className = isExpanded ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
            toggleBtn.setAttribute('aria-expanded', String(isExpanded));
            toggleBtn.setAttribute('aria-label', t(isExpanded ? 'projects.less' : 'projects.more'));
        };

        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            if (isExpanded) {
                hiddenContainer.classList.add('open');
                hiddenContainer.querySelectorAll('.proj-card').forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                    item.classList.add('visible');
                });
            } else {
                hiddenContainer.classList.remove('open');
                const projectsSection = document.getElementById('projects');
                if (projectsSection && typeof projectsSection.scrollIntoView === 'function') {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            renderToggle();
        });

        renderToggle();
    }

    window.onLanguageChanged = () => {
        if (hiddenContainer && hiddenContainer.classList.contains('open')) {
            const label = toggleBtn ? toggleBtn.querySelector('span') : null;
            if (label) label.textContent = t('projects.less');
        }
    };

    /* ── Settings (theme + language) ── */
    const settingsModal = document.getElementById('settingsModal');
    const settingsBtnEl = document.getElementById('settingsBtn');

    const syncSettingsUI = (mode, lang) => {
        if (!settingsModal) return;
        settingsModal.querySelectorAll('.seg-btn[data-theme-choice]').forEach(b => {
            const active = b.dataset.themeChoice === mode;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', String(active));
        });
        settingsModal.querySelectorAll('.seg-btn[data-lang-choice]').forEach(b => {
            const active = b.dataset.langChoice === lang;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', String(active));
        });
    };

    const closeSettings = () => {
        if (!settingsModal) return;
        settingsModal.classList.remove('open');
        settingsModal.setAttribute('aria-hidden', 'true');
        if (settingsBtnEl) settingsBtnEl.setAttribute('aria-expanded', 'false');
    };

    if (settingsBtnEl && settingsModal) {
        settingsBtnEl.addEventListener('click', () => {
            if (settingsModal.classList.contains('open')) {
                closeSettings();
                return;
            }
            if (burger && navMenu.classList.contains('open')) {
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
            settingsModal.classList.add('open');
            settingsModal.setAttribute('aria-hidden', 'false');
            settingsBtnEl.setAttribute('aria-expanded', 'true');
            settingsModal.querySelector('.settings-content')?.focus();
        });

        settingsModal.querySelectorAll('.js-close-settings').forEach(el => el.addEventListener('click', closeSettings));

        settingsModal.querySelectorAll('.seg-btn[data-theme-choice]').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.themeChoice;
                try { localStorage.setItem('rmTheme', mode); } catch (e) { /* stockage indisponible */ }
                applyTheme(mode);
                syncSettingsUI(mode, getLang());
            });
        });

        settingsModal.querySelectorAll('.seg-btn[data-lang-choice]').forEach(btn => {
            btn.addEventListener('click', () => {
                setLang(btn.dataset.langChoice);
                syncSettingsUI(getThemeMode(), getLang());
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && settingsModal.classList.contains('open')) closeSettings();
        });
    }

    const schemeMq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const onSchemeChange = () => { if (getThemeMode() === 'system') applyTheme('system'); };
    if (schemeMq) {
        if (typeof schemeMq.addEventListener === 'function') schemeMq.addEventListener('change', onSchemeChange);
        else if (typeof schemeMq.addListener === 'function') schemeMq.addListener(onSchemeChange);
    }

    /* ── Init locals ── */
    applyI18n();
    applyTheme(getThemeMode());
    syncSettingsUI(getThemeMode(), getLang());
});