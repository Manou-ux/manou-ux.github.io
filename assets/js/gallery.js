// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded');
    
    const galleryModal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentIndexSpan = document.getElementById('current-index');
    const totalImagesSpan = document.getElementById('total-images');
    const imageDescription = document.getElementById('image-description');

    let currentGroup = '';
    let currentImageIndex = 0;

    // Données complètes de toutes les images
    const galleryData = {
        dashboard: [
            {
                src: 'assets/images/minae-dashboard.jpg',
                alt: 'Tableau de bord principal MINAE',
                desc: 'Vue d\'ensemble du tableau de bord avec indicateurs clés'
            },
            {
                src: 'assets/images/minae-dashboard-2.jpg',
                alt: 'Tableau de bord détaillé',
                desc: 'Détail des statistiques et métriques importantes'
            },
            {
                src: 'assets/images/minae-dashboard-3.jpg',
                alt: 'Tableau de bord détaillé',
                desc: 'Détail des statistiques et métriques importantes'
            }
        ],
        login : [
            {
                src: 'assets/images/minae-login.jpg',
                alt: 'Gestion des dossiers',
                desc: 'Interface de gestion complète des dossiers administratifs'
            },
            {
                src: 'assets/images/minae-login-2.jpg',
                alt: 'Détail d\'un dossier',
                desc: 'Visualisation détaillée d\'un dossier avec historique'
            },
            {
                src: 'assets/images/minae-login-3.jpg',
                alt: 'Détail d\'un dossier',
                desc: 'Visualisation détaillée d\'un dossier avec historique'
            }

        ],
        recherche: [
            {
                src: 'assets/images/minae-recherche.jpg',
                alt: 'Recherche avancée',
                desc: 'Module de recherche avec filtres multiples'
            },
            {
                src: 'assets/images/minae-recherche-2.jpg',
                alt: 'Résultats de recherche',
                desc: 'Affichage des résultats de recherche avec options d\'export'
            }
        ],
        rapports: [
            {
                src: 'assets/images/minae-rapports.jpg',
                alt: 'Génération de rapports',
                desc: 'Interface de génération automatique de rapports'
            },
            {
                src: 'assets/images/minae-rapports-2.jpg',
                alt: 'Statistiques détaillées',
                desc: 'Tableaux de bord statistiques avancés'
            }
        ]
    };

    // Ouvrir la modal au clic sur une image
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', function() {
            const group = this.getAttribute('data-group');
            console.log('Opening gallery for group:', group);
            openGallery(group);
        });
    });

    function openGallery(group) {
        currentGroup = group;
        currentImageIndex = 0;
        
        const groupImages = galleryData[group];
        if (groupImages && groupImages.length > 0) {
            updateModalImage();
            galleryModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Mettre à jour les indicateurs
            totalImagesSpan.textContent = groupImages.length;
            currentIndexSpan.textContent = currentImageIndex + 1;
            
            console.log('Modal opened successfully');
        }
    }

    function updateModalImage() {
        const groupImages = galleryData[currentGroup];
        if (groupImages && groupImages[currentImageIndex]) {
            const currentImage = groupImages[currentImageIndex];
            modalImage.src = currentImage.src;
            modalImage.alt = currentImage.alt;
            imageDescription.textContent = currentImage.desc;
            
            currentIndexSpan.textContent = currentImageIndex + 1;
            totalImagesSpan.textContent = groupImages.length;
        }
    }

    // Navigation dans la modal
    prevBtn.addEventListener('click', function() {
        const groupImages = galleryData[currentGroup];
        if (groupImages) {
            currentImageIndex = (currentImageIndex - 1 + groupImages.length) % groupImages.length;
            updateModalImage();
        }
    });

    nextBtn.addEventListener('click', function() {
        const groupImages = galleryData[currentGroup];
        if (groupImages) {
            currentImageIndex = (currentImageIndex + 1) % groupImages.length;
            updateModalImage();
        }
    });

    // Fermer la modal
    closeModal.addEventListener('click', closeGallery);
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGallery();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });

    function closeGallery() {
        galleryModal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Modal closed');
    }

    // Vérification que tous les éléments existent
    console.log('Gallery elements check:', {
        galleryModal: !!galleryModal,
        modalImage: !!modalImage,
        closeModal: !!closeModal,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        galleryImages: document.querySelectorAll('.gallery-image').length
    });
});