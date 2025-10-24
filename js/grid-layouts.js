/* ===========================================
   PROJECTS GRID JAVASCRIPT - INFINITA ARQUITECTURA
   ===========================================
   Funcionalidad para filtrado de proyectos con clases wide/tall
   Grid layout dinámico y efectos de animación
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // ELEMENTOS DEL DOM
    // ===========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const imageGallery = document.querySelector('.gallery');
    const projectsFilter = document.querySelector('.projects-filter, .projects-filter-altamira');
    const bottomShadow = document.querySelector('.bottom-shadow');
    
    if (!imageGallery || !filterButtons.length) {
        console.log('Grid layout: Elementos no encontrados');
        return;
    }

    // Mostrar filtros inmediatamente
    if (projectsFilter) {
        projectsFilter.classList.add('visible');
    }

    // ===========================================
    // FUNCIÓN PARA APLICAR FILTRO
    // ===========================================
    function applyFilter(filterValue) {
        const originalImages = Array.from(imageGallery.querySelectorAll('.gallery-item'));
        
        // Limpiar galería
        imageGallery.innerHTML = '';
        
        // Filtrar imágenes
        const filteredImages = originalImages.filter(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all') return true;
            return category && category.includes(filterValue);
        });
        
        // Clonar y agregar imágenes filtradas
        const newImages = filteredImages.map(item => item.cloneNode(true));
        newImages.forEach(item => imageGallery.appendChild(item));
        
        // ===========================================
        // LAYOUT ESPECIAL PARA FILTRO "URBAN"
        // ===========================================
        if (filterValue === 'urban') {
            imageGallery.style.gridTemplateColumns = '1fr 1fr';
            imageGallery.style.gap = '2rem';
            
            newImages.forEach((item, index) => {
                item.className = 'gallery-item';
                item.style.gridColumnStart = 'span 1';
                item.style.gridRowStart = 'span 1';
                item.classList.add('wide', 'tall'); // Hacer todas las imágenes grandes (2x2 grid)
            });
        } else {
            // ===========================================
            // LAYOUT POR DEFECTO CON CLASES WIDE/TALL
            // ===========================================
            imageGallery.style.gridTemplateColumns = 'auto auto auto auto';
            imageGallery.style.gap = '1rem';
            
            newImages.forEach((item, index) => {
                item.className = 'gallery-item';
                item.style.gridColumnStart = 'span 1';
                item.style.gridRowStart = 'span 1';
                
                // Aplicar clases wide/tall según posición
                if (index % 5 === 0) {
                    item.classList.add('wide', 'tall');
                    item.style.gridColumnStart = 'span 2';
                    item.style.gridRowStart = 'span 2';
                } else if (index % 5 === 1) {
                    item.classList.add('wide');
                    item.style.gridColumnStart = 'span 2';
                } else if (index % 5 === 2) {
                    item.classList.add('tall');
                    item.style.gridRowStart = 'span 2';
                }
            });
        }
    }

    // ===========================================
    // EVENT LISTENERS PARA BOTONES DE FILTRO
    // ===========================================
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Aplicar filtro
            const filterValue = this.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });

    // ===========================================
    // SCROLL EVENT PARA MOSTRAR/OCULTAR FILTROS
    // ===========================================
    if (projectsFilter && bottomShadow) {
        window.addEventListener('scroll', function() {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerTop = footer.offsetTop;
                const windowHeight = window.innerHeight;
                
                if (footerTop <= windowHeight) {
                    projectsFilter.classList.remove('visible');
                    bottomShadow.classList.add('hidden');
                } else {
                    projectsFilter.classList.add('visible');
                    bottomShadow.classList.remove('hidden');
                }
            }
        });
    }

    // ===========================================
    // HOVER EFFECTS ENHANCEMENT
    // ===========================================
    const projectItems = document.querySelectorAll('.gallery-item');
    projectItems.forEach(item => {
        const overlay = item.querySelector('.project-overlay');
        const arrow = item.querySelector('.project-arrow');
        
        item.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            
            if (arrow) {
                arrow.style.transform = 'translateY(0) rotate(45deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            
            if (arrow) {
                arrow.style.transform = 'translateY(20px) rotate(0deg)';
            }
        });
    });

    // ===========================================
    // SCROLL ANIMATIONS
    // ===========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos del grid
    projectItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // ===========================================
    // RESPONSIVE ADJUSTMENTS
    // ===========================================
    function adjustGridForMobile() {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        if (isSmallMobile) {
            imageGallery.style.gridTemplateColumns = '1fr';
            imageGallery.style.gap = '15px';
        } else if (isMobile) {
            imageGallery.style.gridTemplateColumns = '1fr 1fr';
            imageGallery.style.gap = '20px';
        }
    }
    
    // Ajustar en carga y resize
    adjustGridForMobile();
    window.addEventListener('resize', adjustGridForMobile);

    // ===========================================
    // KEYBOARD NAVIGATION
    // ===========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0].classList.add('active');
            applyFilter('all');
        }
    });

    // ===========================================
    // TOUCH SUPPORT FOR MOBILE
    // ===========================================
    if ('ontouchstart' in window) {
        projectItems.forEach(item => {
            let touchStartTime;
            
            item.addEventListener('touchstart', function() {
                touchStartTime = Date.now();
            });
            
            item.addEventListener('touchend', function(e) {
                const touchDuration = Date.now() - touchStartTime;
                
                if (touchDuration < 200) {
                    this.classList.add('hovered');
                    
                    setTimeout(() => {
                        this.classList.remove('hovered');
                    }, 1000);
                }
            });
        });
    }

    // ===========================================
    // APLICAR FILTRO INICIAL
    // ===========================================
    applyFilter('all');
    
    console.log('Projects Grid with Wide/Tall classes initialized successfully');
});
