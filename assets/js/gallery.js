// assets/js/gallery.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded');
    
    // Créer la modale si elle n'existe pas
    if (!document.getElementById('gallery-modal')) {
        createGalleryModal();
    }
    
    // Récupérer les éléments de la modale
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

    // Données des images pour chaque projet
    const galleryData = {
        minae: [
            {
                src: 'assets/images/minae-dashboard.jpg',
                alt: 'Application MINAE',
                desc: 'Application web développée pour le Ministère de l\'Agriculture et de l\'Élevage'
            },
            {
                src: 'assets/images/minae-dashboard-2.jpg',
                alt: 'Tableau de bord MINAE',
                desc: 'Vue d\'ensemble du tableau de bord avec indicateurs clés'
            },
            {
                src: 'assets/images/dash-sat.png',
                alt: 'Tableau de bord SAT',
                desc: 'Vue d\'ensemble du tableau de bord avec liste des tableau en lecture seule'
            },
            {
                src: 'assets/images/insert-donnee-sat.png',
                alt: 'Gestion des dossiers',
                desc: 'tableau SAT'
            },
            
            {
                src: 'assets/images/minae-recherche.jpg',
                alt: 'Gestion des dossiers',
                desc: 'Interface de gestion complète des dossiers administratifs'
            },
            {
                src: 'assets/images/send.png',
                alt: 'Tableau de bord SAT',
                desc: 'transfer de donnée'
            },
            {
                src: 'assets/images/minae-login.jpg',
                alt: "Login d'un service",
                desc: 'Interface de gestion complète des dossiers administratifs'
            },
            {
                src: 'assets/images/dash-sgcc.png',
                alt: 'Gestion des dossiers',
                desc: 'dash service'
            },
            {
                src: 'assets/images/lecture-sgcc.png',
                alt: 'Gestion des dossiers',
                desc: 'lecture service'
            },
            {
                src: 'assets/images/login-admin.png',
                alt: 'Admin',
                desc: 'admin login'
            },
            {
                src: 'assets/images/dash-admin.png',
                alt: 'Admin',
                desc: 'admin dashboard'
            },
            {
                src: 'assets/images/crud-user.png',
                alt: 'Admin',
                desc: 'CRUD utilisatuers'
            }
        ],
        flowlesstech: [
            {
                src: 'assets/images/flw-dash.png',
                alt: 'Site e-commerce FlowlessTech',
                desc: 'Site e-commerce moderne dédié à la vente de PC gamer'
            },
            {
                src: 'assets/images/flw-dash-prod.png',
                alt: 'Page produit',
                desc: "Nouveau produit afficher dans l'acceuil "
            },
            {
                src: 'assets/images/flw-footer.png',
                alt: 'Page produit',
                desc: "footer dashboard "
            },
            {
                src: 'assets/images/boutique1.png',
                alt: 'Page produit',
                desc: "Contenu de la boutique "
            },
            {
                src: 'assets/images/boutique2.png',
                alt: 'Page produit',
                desc: "Contenu de la boutique "
            },
            {
                src: 'assets/images/produit1.png',
                alt: 'Page produit',
                desc: "affichage d'un article "
            },            {
                src: 'assets/images/produit2.png',
                alt: 'Page produit',
                desc: "affichage d'un article"
            },
            {
                src: 'assets/images/panier1.png',
                alt: 'Panier d\'achat',
                desc: 'Interface du panier d\'achat'
            },
            {
                src: 'assets/images/panier+promo.png',
                alt: 'Panier d\'achat',
                desc: 'Interface du panier d\'achat'
            },
            {
                src: 'assets/images/paiment.png',
                alt: 'Panier d\'achat',
                desc: 'validation de paiment'
            }
        ],
        sonatra: [
            {
                src: 'assets/images/sonatraJS.png',
                alt: 'Application SONATRA+',
                desc: 'Application de gestion pour coopérative de taxi-brousse'
            },
            {
                src: 'assets/images/client1.png',
                alt: 'Client',
                desc: 'Client choix'
            },
            {
                src: 'assets/images/client-inscription.png',
                alt: 'Client',
                desc: 'Client inscription'
            },
            {
                src: 'assets/images/client-login.png',
                alt: 'Client',
                desc: 'Client login'
            },
            {
                src: 'assets/images/reservation.png',
                alt: 'Client',
                desc: 'Reservetion'
            },
            {
                src: 'assets/images/facture.png',
                alt: 'Client',
                desc: 'facturation du reservation'
            },
            {
                src: 'assets/images/liste-trajet.png',
                alt: 'Client',
                desc: 'Liste trajet'
            },
                        {
                src: 'assets/images/infos.png',
                alt: 'Client',
                desc: 'Informations'
            },
            {
                src: 'assets/images/meteo.png',
                alt: 'Client',
                desc: 'Meteo en temps reel'
            },
            {
                src: 'assets/images/admin-dash.png',
                alt: 'Admin',
                desc: 'Dashboard Admin'
            },
            {
                src: 'assets/images/stat1.png',
                alt: 'Admin',
                desc: 'stat Admin'
            },
            {
                src: 'assets/images/stat2.png',
                alt: 'Admin',
                desc: 'statAdmin'
            },{
                src: 'assets/images/stat3.png',
                alt: 'Admin',
                desc: 'stat Admin'
            }

        ],
        'hospital-java': [
            {
                src: 'assets/images/hospitalJAVA.png',
                alt: 'Application hospitalière Java',
                desc: 'Application desktop de gestion hospitalière'
            },
            {
                src: 'assets/images/hospital1.jpg',
                alt: 'Gestion des patients',
                desc: 'Interface de gestion des dossiers patients'
            },
            {
                src: 'assets/images/hospital2.jpg',
                alt: 'Gestion des rendez-vous',
                desc: 'Calendrier des rendez-vous médicaux'
            }
        ],
        'csharp-sonatra': [
            {
                src: 'assets/images/sonatraCsharp.png',
                alt: 'Application C# Sonatra',
                desc: 'Version desktop du projet SONATRA+ en C#'
            },
            {
                src: 'assets/images/csharp1.jpg',
                alt: 'Interface principale',
                desc: 'Interface Windows Forms de l\'application'
            },
            {
                src: 'assets/images/csharp2.jpg',
                alt: 'Gestion des données',
                desc: 'Base de données SQL Server intégrée'
            }
        ],
        hardware: [
            {
                src: 'assets/images/setup2.jpg',
                alt: 'Expertise Hardware',
                desc: 'Assemblage complet de PC gamer'
            },
            {
                src: 'assets/images/hardware1.jpg',
                alt: 'Diagnostic matériel',
                desc: 'Diagnostic et dépannage hardware'
            },
            {
                src: 'assets/images/hardware2.jpg',
                alt: 'Optimisation',
                desc: 'Optimisation de performances matérielles'
            }
        ],
        'diverse-apps': [
            {
                src: 'assets/images/divers-projects.jpg',
                alt: 'Applications diverses',
                desc: 'Collection de projets variés'
            },
            {
                src: 'assets/images/diverse1.jpg',
                alt: 'Système de location',
                desc: 'Application de location de voiture en C#'
            },
            {
                src: 'assets/images/diverse2.jpg',
                alt: 'Suivi de vols',
                desc: 'Application de suivi de vols aériens en Python'
            }
        ]
    };

    // Fonction pour créer la modale
    function createGalleryModal() {
        const modalHTML = `
            <div id="gallery-modal" class="hidden fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div class="relative max-w-4xl w-full max-h-[90vh]">
                    <button id="close-modal" class="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 z-10">
                        &times;
                    </button>
                    <img id="modal-image" src="" alt="" class="w-full max-h-[70vh] object-contain rounded-lg">
                    <div class="flex justify-center mt-4">
                        <button id="prev-btn" class="bg-white/20 text-white px-4 py-2 rounded-l-lg hover:bg-white/30">
                            <i class="ri-arrow-left-line"></i>
                        </button>
                        <span id="image-indicator" class="bg-white/20 text-white px-4 py-2">
                            <span id="current-index">1</span>/<span id="total-images">1</span>
                        </span>
                        <button id="next-btn" class="bg-white/20 text-white px-4 py-2 rounded-r-lg hover:bg-white/30">
                            <i class="ri-arrow-right-line"></i>
                        </button>
                    </div>
                    <p id="image-description" class="text-white text-center mt-2 text-sm opacity-80"></p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Ouvrir la modale au clic sur un bouton "Aperçu"
    document.addEventListener('click', function(e) {
        if (e.target.closest('.gallery-image')) {
            const button = e.target.closest('.gallery-image');
            const group = button.getAttribute('data-group');
            console.log('Opening gallery for group:', group);
            openGallery(group);
        }
    });

    function openGallery(group) {
        currentGroup = group;
        currentImageIndex = 0;
        
        const groupImages = galleryData[group];
        if (groupImages && groupImages.length > 0) {
            updateModalImage();
            galleryModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            console.log('Modal opened successfully for:', group);
        } else {
            console.error('No images found for group:', group);
            // Fallback - utiliser l'image principale
            galleryModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            modalImage.src = galleryData[group]?.[0]?.src || '';
            modalImage.alt = galleryData[group]?.[0]?.alt || 'Image du projet';
            imageDescription.textContent = galleryData[group]?.[0]?.desc || '';
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

    // Navigation dans la modale
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const groupImages = galleryData[currentGroup];
            if (groupImages) {
                currentImageIndex = (currentImageIndex - 1 + groupImages.length) % groupImages.length;
                updateModalImage();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const groupImages = galleryData[currentGroup];
            if (groupImages) {
                currentImageIndex = (currentImageIndex + 1) % groupImages.length;
                updateModalImage();
            }
        });
    }

    // Fermer la modale
    if (closeModal) {
        closeModal.addEventListener('click', closeGallery);
    }

    // Fermer en cliquant à l'extérieur
    galleryModal?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeGallery();
        }
    });

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGallery();
            } else if (e.key === 'ArrowLeft') {
                prevBtn?.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn?.click();
            }
        }
    });

    function closeGallery() {
        galleryModal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Modal closed');
    }

    // Log pour vérification
    console.log('Gallery initialized. Buttons found:', document.querySelectorAll('.gallery-image').length);
});