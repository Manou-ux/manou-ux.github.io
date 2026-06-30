/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — gallery.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    /* ── Project screenshots modal ── */
    const galleryModal = document.getElementById('projectGalleryModal');
    const openGalleryButtons = document.querySelectorAll('.js-open-gallery-modal');
    const closeGalleryButtons = document.querySelectorAll('.js-close-gallery-modal');
    const galleryGrid = document.querySelector('.project-gallery-grid');
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

        const syncBodyScrollLock = () => {
            const isGalleryOpen = galleryModal.classList.contains('open');
            const isAnyModalOpen = isGalleryOpen || isPreviewOpen;
            document.body.style.overflow = isAnyModalOpen ? 'hidden' : '';
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
            const imageSources = rawGallery.split(',').map((item) => item.trim()).filter(Boolean);
            const fallbackCardImage = button.closest('.proj-item')?.querySelector('.proj-img img');
            const fallbackSrc = fallbackCardImage?.getAttribute('src');
            const fallbackAlt = button.dataset.galleryAlt || fallbackCardImage?.getAttribute('alt') || 'Capture ecran';
            const sources = imageSources.length > 0 ? imageSources : (fallbackSrc ? [fallbackSrc] : []);

            currentGalleryItems = sources.map((src, idx) => ({
                src,
                alt: `${button.dataset.galleryAlt || fallbackAlt}${sources.length > 1 ? ` ${idx + 1}` : ''}`.trim()
            }));

            galleryGrid.innerHTML = currentGalleryItems
                .map((item, idx) => `<img src="${item.src}" alt="${item.alt}" class="js-gallery-thumb${idx === 0 ? ' is-active' : ''}" tabindex="0">`)
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
            galleryModal.classList.add('open');
            galleryModal.setAttribute('aria-hidden', 'false');
            syncBodyScrollLock();
            setActiveImage(activeIndex);
        };

        const closeGalleryModal = () => {
            galleryModal.classList.remove('open');
            galleryModal.setAttribute('aria-hidden', 'true');
            syncBodyScrollLock();
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
        };

        const closeImagePreviewModal = () => {
            if (!imagePreviewModal) return;
            exitFullscreenPreview();
            imagePreviewModal.classList.remove('open');
            imagePreviewModal.setAttribute('aria-hidden', 'true');
            isPreviewOpen = false;
            syncBodyScrollLock();
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
                await previewHost.requestFullscreen();
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
                await document.exitFullscreen();
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
            } else if (isPreviewOpen && e.key === 'ArrowRight') {
                setActiveImage(activeIndex + 1);
            } else if (isPreviewOpen && e.key === 'ArrowLeft') {
                setActiveImage(activeIndex - 1);
            }
        });
    }

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