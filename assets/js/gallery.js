/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — gallery.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Project Items: tilt effect on hover ── */
    const projItems = document.querySelectorAll('.proj-item');

    projItems.forEach(item => {
        const img = item.querySelector('.proj-img');
        if (!img) return;

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;

            img.style.transform = `
                perspective(800px)
                rotateY(${x * 6}deg)
                rotateX(${-y * 4}deg)
                scale(1.02)
            `;
        });

        item.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
    });


    /* ── Lazy Load Images with fade-in ── */
    const images = document.querySelectorAll('img[src]');

    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                if (img.complete) img.style.opacity = '1';
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    images.forEach(img => imgObserver.observe(img));


    /* ── Horizontal number ticker on stats ── */
    const stats = document.querySelectorAll('.stat-num');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const rawText = el.textContent.trim();
                const match = rawText.match(/^(\d+)/);
                if (!match) return;

                const target = parseInt(match[1]);
                const suffix = rawText.replace(match[1], '');
                let start = 0;
                const duration = 1200;
                const startTime = performance.now();

                function tick(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    el.textContent = current + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => countObserver.observe(stat));


    /* ── Project Image Parallax on scroll ── */
    function applyParallax() {
        const scrolled = window.scrollY;
        document.querySelectorAll('.proj-img img').forEach(img => {
            const rect = img.closest('.proj-item').getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            const shift = center * 0.05;
            img.style.transform = `translateY(${shift}px) scale(1.08)`;
        });
    }

    // Only on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', applyParallax, { passive: true });
    }

});