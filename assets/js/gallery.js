/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — gallery.js (editorial light)
   ═══════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ── Project screenshots modal ── */
    const galleryModal = document.getElementById('projectGalleryModal');
    const openGalleryButtons = document.querySelectorAll('.js-open-gallery-modal');
    const closeGalleryButtons = document.querySelectorAll('.js-close-gallery-modal');
    const galleryGrid = galleryModal ? galleryModal.querySelector('.project-gallery-grid') : null;
    const imagePreviewModal = document.getElementById('projectImagePreviewModal');
    const imagePreviewMain = document.getElementById('projectImagePreviewMain');
    const closeImagePreviewButtons = document.querySelectorAll('.js-close-image-preview');
    const imagePreviewPrevBtn = document.querySelector('.js-image-preview-prev');
    const imagePreviewNextBtn = document.querySelector('.js-image-preview-next');
    const imagePreviewFullscreenBtn = document.querySelector('.js-image-preview-fullscreen');
    const imagePreviewExitFsBtn = document.querySelector('.js-image-preview-exit-fs');

    if (galleryModal && openGalleryButtons.length > 0 && galleryGrid) {
        let activeIndex = 0;
        let isPreviewOpen = false;
        let touchStartX = 0;
        let touchEndX = 0;
        let currentGalleryItems = [];
        let lastFocusedEl = null;

        const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, img[tabindex="0"], [tabindex]:not([tabindex="-1"])';

        const trapFocus = (e, container) => {
            if (e.key !== 'Tab' || !container) return;
            const focusables = Array.from(container.querySelectorAll(FOCUSABLE))
                .filter(el => el.getClientRects().length > 0 || el === document.activeElement);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        const syncBodyScrollLock = () => {
            const anyOpen = galleryModal.classList.contains('open') || isPreviewOpen;
            document.body.style.overflow = anyOpen ? 'hidden' : '';
        };

        const getGalleryThumbs = () => galleryGrid.querySelectorAll('.js-gallery-thumb');

        const setActiveImage = (index) => {
            const thumbs = getGalleryThumbs();
            if (thumbs.length === 0) return;
            const safeIndex = (index + thumbs.length) % thumbs.length;
            const selectedThumb = thumbs[safeIndex];
            if (!selectedThumb) return;

            activeIndex = safeIndex;

            thumbs.forEach((thumb, thumbIndex) => {
                thumb.classList.toggle('is-active', thumbIndex === safeIndex);
            });

            if (imagePreviewMain && isPreviewOpen && currentGalleryItems[safeIndex]) {
                imagePreviewMain.src = currentGalleryItems[safeIndex].src;
                imagePreviewMain.alt = currentGalleryItems[safeIndex].alt;
            }
        };

        const renderGalleryFromButton = (button) => {
            const rawGallery = button.dataset.gallery || '';
            const imageSources = rawGallery.split(',').map(item => item.trim()).filter(Boolean);
            const fallbackCardImage = button.closest('.proj-card')?.querySelector('.proj-media img');
            const fallbackSrc = fallbackCardImage?.getAttribute('src');
            const fallbackAlt = button.dataset.galleryAlt || fallbackCardImage?.getAttribute('alt') || 'Capture d\'écran';
            const sources = imageSources.length > 0 ? imageSources : (fallbackSrc ? [fallbackSrc] : []);

            currentGalleryItems = sources.map((src, idx) => ({
                src,
                alt: `${button.dataset.galleryAlt || fallbackAlt}${sources.length > 1 ? ` ${idx + 1}` : ''}`.trim()
            }));

            galleryGrid.innerHTML = currentGalleryItems
                .map((item, idx) => `<img src="${item.src}" alt="${item.alt}" class="js-gallery-thumb${idx === 0 ? ' is-active' : ''}" tabindex="0" loading="lazy" decoding="async">`)
                .join('');

            const thumbs = getGalleryThumbs();
            thumbs.forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    setActiveImage(index);
                    openImagePreviewModal();
                });
                thumb.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveImage(index);
                        openImagePreviewModal();
                    }
                });
            });
        };

        const openGalleryModal = (button) => {
            renderGalleryFromButton(button);
            activeIndex = 0;
            lastFocusedEl = document.activeElement;
            galleryModal.classList.add('open');
            galleryModal.setAttribute('aria-hidden', 'false');
            syncBodyScrollLock();
            setActiveImage(activeIndex);
            galleryModal.querySelector('.project-gallery-content')?.focus();
        };

        const closeGalleryModal = () => {
            galleryModal.classList.remove('open');
            galleryModal.setAttribute('aria-hidden', 'true');
            syncBodyScrollLock();
            if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
                lastFocusedEl.focus();
            }
            lastFocusedEl = null;
        };

        const openImagePreviewModal = () => {
            if (!imagePreviewModal || !imagePreviewMain) return;
            if (!currentGalleryItems[activeIndex]) return;
            imagePreviewMain.src = currentGalleryItems[activeIndex].src;
            imagePreviewMain.alt = currentGalleryItems[activeIndex].alt;
            imagePreviewModal.classList.add('open');
            imagePreviewModal.setAttribute('aria-hidden', 'false');
            isPreviewOpen = true;
            syncBodyScrollLock();
            imagePreviewModal.querySelector('.project-image-preview-content')?.focus();
        };

        const closeImagePreviewModal = () => {
            if (!imagePreviewModal) return;
            exitFullscreenPreview();
            imagePreviewModal.classList.remove('open');
            imagePreviewModal.setAttribute('aria-hidden', 'true');
            isPreviewOpen = false;
            syncBodyScrollLock();
            const activeThumb = galleryGrid.querySelector('.js-gallery-thumb.is-active');
            (activeThumb || galleryModal.querySelector('.project-gallery-content'))?.focus();
        };

        const handleSwipe = () => {
            const delta = touchEndX - touchStartX;
            const threshold = 45;
            if (Math.abs(delta) < threshold) return;
            if (delta < 0) {
                setActiveImage(activeIndex + 1);
            } else {
                setActiveImage(activeIndex - 1);
            }
        };

        openGalleryButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openGalleryModal(btn);
            });
        });

        closeGalleryButtons.forEach((btn) => {
            btn.addEventListener('click', closeGalleryModal);
        });

        closeImagePreviewButtons.forEach((btn) => {
            btn.addEventListener('click', closeImagePreviewModal);
        });

        if (imagePreviewPrevBtn) {
            imagePreviewPrevBtn.addEventListener('click', () => setActiveImage(activeIndex - 1));
        }

        if (imagePreviewNextBtn) {
            imagePreviewNextBtn.addEventListener('click', () => setActiveImage(activeIndex + 1));
        }

        if (imagePreviewMain) {
            imagePreviewMain.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (e.deltaY > 0) {
                    setActiveImage(activeIndex + 1);
                } else {
                    setActiveImage(activeIndex - 1);
                }
            }, { passive: false });

            imagePreviewMain.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            imagePreviewMain.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        async function enterFullscreenPreview() {
            if (!imagePreviewMain) return;
            const previewHost = imagePreviewMain;
            if (previewHost.requestFullscreen) {
                try {
                    await previewHost.requestFullscreen();
                } catch (error) {
                    // Fullscreen may be rejected; keep interactive.
                }
            } else {
                imagePreviewModal.querySelector('.project-image-preview-content')?.classList.add('is-fullscreen');
            }
            if (window.matchMedia('(max-width: 1024px)').matches && screen.orientation && screen.orientation.lock) {
                try {
                    await screen.orientation.lock('landscape');
                } catch (error) {
                    // Ignore unsupported orientation lock errors.
                }
            }
        }

        async function exitFullscreenPreview() {
            if (document.fullscreenElement && document.exitFullscreen) {
                try {
                    await document.exitFullscreen();
                } catch (error) {
                    // Ignore exit errors.
                }
            } else {
                imagePreviewModal.querySelector('.project-image-preview-content')?.classList.remove('is-fullscreen');
            }
            if (screen.orientation && screen.orientation.unlock) {
                try {
                    screen.orientation.unlock();
                } catch (error) {
                    // Ignore unlock errors on unsupported platforms.
                }
            }
        }

        const updateFullscreenUi = () => {
            if (!imagePreviewModal) return;
            const isFsActive = Boolean(document.fullscreenElement);
            imagePreviewModal.querySelector('.project-image-preview-content')?.classList.toggle('is-fullscreen', isFsActive);
        };

        if (imagePreviewFullscreenBtn) {
            imagePreviewFullscreenBtn.addEventListener('click', () => {
                enterFullscreenPreview();
            });
        }

        if (imagePreviewExitFsBtn) {
            imagePreviewExitFsBtn.addEventListener('click', () => {
                exitFullscreenPreview();
            });
        }

        document.addEventListener('fullscreenchange', updateFullscreenUi);

        document.addEventListener('keydown', (e) => {
            const isGalleryOpen = galleryModal.classList.contains('open');
            if (!isGalleryOpen && !isPreviewOpen) return;

            if (e.key === 'Escape') {
                if (isPreviewOpen) {
                    closeImagePreviewModal();
                } else {
                    closeGalleryModal();
                }
            } else if (e.key === 'Tab') {
                trapFocus(e, isPreviewOpen ? imagePreviewModal : galleryModal);
            } else if (isPreviewOpen && e.key === 'ArrowRight') {
                e.preventDefault();
                setActiveImage(activeIndex + 1);
            } else if (isPreviewOpen && e.key === 'ArrowLeft') {
                e.preventDefault();
                setActiveImage(activeIndex - 1);
            }
        });
    }

    /* ── Lazy Load Images with fade-in ── */
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if (images.length) {
            const imgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const img = entry.target;
                    img.style.transition = 'opacity 0.6s ease';
                    img.style.opacity = '0';
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    if (img.complete) img.style.opacity = '1';
                    imgObserver.unobserve(img);
                });
            }, { rootMargin: '200px' });

            images.forEach(img => imgObserver.observe(img));
        }
    }

    /* ── Count-up animation on hero stats ── */
    if ('IntersectionObserver' in window) {
        const stats = document.querySelectorAll('.stat-num');
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const rawText = el.textContent.trim();
                const match = rawText.match(/^(\d+)/);
                const target = match ? parseInt(match[1], 10) : 0;
                if (!match || target < 2) return;

                const suffix = rawText.replace(match[1], '').slice(1) === '' ? '' : rawText.slice(match[1].length);
                const zeroPadded = match[1].startsWith('0');

                let start = 0;
                const duration = 1100;
                const startTime = performance.now();

                function tick(now) {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = Math.round(eased * target);
                    el.textContent = (zeroPadded ? String(value).padStart(2, '0') : value) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => countObserver.observe(stat));
    }

});