/* ═══════════════════════════════════════════
   RAJOSVAH MANOU — data.js
   Données des projets (rendu piloté par main.js)
   ═══════════════════════════════════════════ */

const PROJECTS = [
    {
        num: '01',
        title: 'DiabetesTrack',
        type: 'App Mobile',
        desc: 'Suivi du diabète : glycémie, médicaments et alimentation.',
        tags: ['Flutter', 'Dart'],
        image: 'assets/images/app_icon.webp',
        alt: 'DiabetesTrack',
        galleryAlt: 'Captures d\u2019ecran DiabetesTrack',
        gallery: [
            'assets/images/diabetesTrack/img1.webp',
            'assets/images/diabetesTrack/img2.webp',
            'assets/images/diabetesTrack/img3.webp',
            'assets/images/diabetesTrack/img4.webp',
            'assets/images/diabetesTrack/img5.webp',
            'assets/images/diabetesTrack/img5-1.webp',
            'assets/images/diabetesTrack/img6.webp',
            'assets/images/diabetesTrack/img7.webp',
            'assets/images/diabetesTrack/img8.webp',
            'assets/images/diabetesTrack/img9.webp'
        ],
        links: [
            { type: 'github', label: 'Code Source', url: 'https://github.com/Manou-ux/DiabetesTrack.git' }
        ],
        featured: true
    },

    {
        num: '02',
        title: 'Suivi des Dossiers du Ministère',
        type: 'App Web',
        desc: 'Application web développée pour le Ministère de l\u2019Agriculture et de l\u2019Élevage (MINAE) — Anosy, Antananarivo. Centralise le suivi des dossiers, déployée sur serveur IIS.',
        tags: ['Laravel', 'Tailwind CSS', 'Blade', 'JavaScript', 'PostgreSQL'],
        image: 'assets/images/MINAE.webp',
        alt: 'Application MINAE',
        galleryAlt: 'Captures d\u2019ecran MINAE',
        gallery: [
            'assets/images/minae/Admin.webp',
            'assets/images/minae/ajout-user.webp',
            'assets/images/minae/crud-user.webp',
            'assets/images/minae/dash-admin.webp',
            'assets/images/minae/dash-sat.webp',
            'assets/images/minae/dash-sgcc.webp',
            'assets/images/minae/insert-donnee-sat.webp',
            'assets/images/minae/lecture-sgcc.webp',
            'assets/images/minae/login-admin.webp',
            'assets/images/minae/minae-dashboard-2.webp',
            'assets/images/minae/minae-dashboard.webp',
            'assets/images/minae/minae-login.webp',
            'assets/images/minae/minae-recherche.webp',
            'assets/images/minae/send.webp'
        ],
        links: [
            { type: 'private', label: 'Code Source', msg: 'Code source privé (projet client).' }
        ],
        featured: true
    },

    {
        num: '03',
        title: 'FlowlessTech',
        type: 'E-commerce',
        desc: 'Site e-commerce moderne dédié à la vente de PC gamer et matériel informatique. Gestion complète des produits, panier, commandes et paiements. Design responsive et optimisé.',
        tags: ['WordPress', 'WooCommerce', 'JavaScript', 'MySQL'],
        image: 'assets/images/flowlesstech.webp',
        alt: 'FlowlessTech',
        galleryAlt: 'Captures d\u2019ecran FlowlessTech',
        gallery: [
            'assets/images/flowlesstech/flw-dash.webp',
            'assets/images/flowlesstech/flw-dash-prod.webp',
            'assets/images/flowlesstech/boutique1.webp',
            'assets/images/flowlesstech/produit1.webp',
            'assets/images/flowlesstech/produit2.webp',
            'assets/images/flowlesstech/panier1.webp',
            'assets/images/flowlesstech/panier+promo.webp',
            'assets/images/flowlesstech/paiment.webp',
            'assets/images/flowlesstech/flw-footer.webp'
        ],
        links: [
            { type: 'alert', label: 'Code Source', msg: 'Le code source est actuellement indisponible.' }
        ],
        featured: true
    },

    {
        num: '04',
        title: 'SONATRA+ (C#)',
        type: 'Desktop C#',
        desc: 'Version desktop du projet SONATRA+ développée en C# avec interface Windows Forms et base de données SQL Server.',
        tags: ['C#', 'SQL Server', 'Visual Studio'],
        image: 'assets/images/sonatraCsharp.webp',
        alt: 'SONATRA+ C#',
        galleryAlt: 'Captures d\u2019ecran SONATRA+ C#',
        gallery: [
            'assets/images/sonatraCsharp/chargement.webp',
            'assets/images/sonatraCsharp/chauffeur.webp',
            'assets/images/sonatraCsharp/connexion.webp',
            'assets/images/sonatraCsharp/dash.webp',
            'assets/images/sonatraCsharp/reservation.webp',
            'assets/images/sonatraCsharp/stats.webp',
            'assets/images/sonatraCsharp/trajet.webp',
            'assets/images/sonatraCsharp/voiture.webp'
        ],
        links: [
            { type: 'github', label: 'Code Source', url: 'https://github.com/Manou-ux/SONATRA_PLUS-Windows-Form-CSharp.git' }
        ],
        featured: false
    },

    {
        num: '05',
        title: 'Gestion Hospitalière',
        type: 'Desktop Java',
        desc: 'Application desktop de gestion hospitalière — patients, données médicales, prescriptions et fiches médicales. Développée en Java avec NetBeans.',
        tags: ['Java SE', 'MySQL', 'NetBeans'],
        image: 'assets/images/hospitalJAVA.webp',
        alt: 'Gestion Hospitalière',
        galleryAlt: 'Captures d\u2019ecran Gestion Hospitalière',
        gallery: [
            'assets/images/hospitalJAVA/add.webp',
            'assets/images/hospitalJAVA/diag.webp',
            'assets/images/hospitalJAVA/facts.webp',
            'assets/images/hospitalJAVA/fiche1.webp',
            'assets/images/hospitalJAVA/fiche2.webp',
            'assets/images/hospitalJAVA/liste.webp',
            'assets/images/hospitalJAVA/login.webp',
            'assets/images/hospitalJAVA/maj.webp',
            'assets/images/hospitalJAVA/menu.webp',
            'assets/images/hospitalJAVA/stat-sang.webp',
            'assets/images/hospitalJAVA/stat-sex.webp'
        ],
        links: [
            { type: 'github', label: 'Code Source', url: 'https://github.com/Manou-ux/Hospital-Management-System.git' }
        ],
        featured: false
    },

    {
        num: '06',
        title: 'SONATRA+',
        type: 'App Web',
        desc: 'Application de gestion complète pour coopérative de taxi-brousse. Gestion des trajets, chauffeurs, véhicules, réservations et facturation.',
        tags: ['Node.js', 'Express.js', 'MySQL'],
        image: 'assets/images/sonatraJS.webp',
        alt: 'SONATRA+',
        galleryAlt: 'Captures d\u2019ecran SONATRA+',
        gallery: [
            'assets/images/sonatraJS/admin-dash.webp',
            'assets/images/sonatraJS/client-inscription.webp',
            'assets/images/sonatraJS/client-login.webp',
            'assets/images/sonatraJS/client1.webp',
            'assets/images/sonatraJS/facture.webp',
            'assets/images/sonatraJS/infos.webp',
            'assets/images/sonatraJS/liste-trajet.webp',
            'assets/images/sonatraJS/meteo.webp',
            'assets/images/sonatraJS/reservation.webp',
            'assets/images/sonatraJS/stat1.webp',
            'assets/images/sonatraJS/stat2.webp',
            'assets/images/sonatraJS/stat3.webp'
        ],
        links: [
            { type: 'github', label: 'Code Source', url: 'https://github.com/Manou-ux/sonatra-node-js-.git' }
        ],
        featured: false
    },

    {
        num: '07',
        title: 'Excellente maîtrise du hardware',
        type: 'Matériel',
        desc: 'Connaissances élevées en matériels informatiques. Assemblage complet d\u2019unités centrales, diagnostic matériel, maintenance préventive et corrective, conseils d\u2019achat et d\u2019optimisation de systèmes.',
        tags: ['Assemblage', 'Diagnostic', 'Maintenance', 'Optimisation'],
        image: 'assets/images/autres/pc1.webp',
        alt: 'Assemblage et diagnostic matériel',
        galleryAlt: 'Photos matériel informatique',
        gallery: [
            'assets/images/autres/pc1.webp',
            'assets/images/autres/pc2.webp',
            'assets/images/autres/pc4.webp',
            'assets/images/autres/pc5.webp',
            'assets/images/autres/pc6.webp'
        ],
        links: [
            { type: 'contact', label: 'Me contacter' }
        ],
        featured: false
    }
];

const SITE = {
    name: 'Rajosvah Manou',
    role: 'Développeur & Technicien Informatique',
    email: 'rajosvahmanou@gmail.com',
    phone: '+261388338001',
    city: 'Antananarivo, Madagascar & Remote',
    url: 'https://rajosvah-Portfolio.vercel.app',
    github: 'https://github.com/Manou-ux',
    linkedin: 'https://linkedin.com/in/manou-rajosvah-ba5448390'
};