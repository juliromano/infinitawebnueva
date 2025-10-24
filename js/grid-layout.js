// Grid Layout JavaScript para proyectos
// Funcionalidad para filtros y grid con clases wide/tall

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const imageGallery = document.querySelector('.gallery');
    const projectsFilter = document.querySelector('.projects-filter');
    const bottomShadow = document.querySelector('.bottom-shadow');
    
    if (!imageGallery || !filterButtons.length) {
        console.log('Grid layout: Elementos no encontrados');
        return;
    }

    // Mostrar filtros inmediatamente
    if (projectsFilter) {
        projectsFilter.classList.add('visible');
    }

    // Función para aplicar filtro
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
        
        // Aplicar layout especial para filtro "urban"
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
            // Layout por defecto
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

    // Event listeners para botones de filtro
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

    // Scroll event para mostrar/ocultar filtros
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

    // Aplicar filtro inicial
    applyFilter('all');
});

// CSS para clases wide y tall (si no están en el CSS principal)
const style = document.createElement('style');
style.textContent = `
    .gallery-item.wide {
        grid-column: span 2;
    }
    
    .gallery-item.tall {
        grid-row: span 2;
    }
    
    .gallery-item.wide.tall {
        grid-column: span 2;
        grid-row: span 2;
    }
`;
document.head.appendChild(style);

