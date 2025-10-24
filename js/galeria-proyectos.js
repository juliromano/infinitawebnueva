/* ===========================================
    GALERÍA DE PROYECTOS - JAVASCRIPT
    Funcionalidad para filtros, Isotope y Magnific Popup
============================================ */

// ===========================================
// CONFIGURACIÓN GLOBAL
// ===========================================
'use strict';

// Cache de elementos del DOM
const $window = $(window);
const $document = $(document);

// Variables globales
let $portfolio = null;
let $filters = null;
let isotopeInstance = null;

// ===========================================
// INICIALIZACIÓN PRINCIPAL
// ===========================================
$document.ready(function() {
    console.log('🚀 Inicializando Galería de Proyectos...');
    
    // Inicializar componentes
    initPortfolio();
    initMagnificPopup();
    initAOS();
    
    console.log('✅ Galería de Proyectos inicializada correctamente');
});

// ===========================================
// FUNCIONES DE PORTFOLIO
// ===========================================

/**
 * Inicializa el portfolio con Isotope
 */
function initPortfolio() {
    console.log('📦 Inicializando Portfolio...');
    
    // Cache de elementos
    $portfolio = $('#portfolio');
    $filters = $('.portfolio-filter .filter');
    
    if (!$portfolio.length) {
        console.error('❌ No se encontró el elemento #portfolio');
        return;
    }
    
    // Inicializar Isotope directamente (sin imagesLoaded)
    console.log('🖼️ Inicializando Isotope...');
    
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(function() {
        isotopeInstance = $portfolio.isotope({
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: '.grid-sizer',
                gutter: 0
            },
            transitionDuration: '0.6s',
            stagger: 30
        });
        
        // Agregar clase para animaciones
        $portfolio.find('.grid-item').addClass('isotope-item');
        
        console.log('✅ Isotope inicializado correctamente');
    }, 300);
    
    // Inicializar filtros
    initFilters();
}

/**
 * Inicializa los filtros del portfolio
 */
function initFilters() {
    console.log('🔍 Inicializando filtros...');
    
    $filters.on('click', function(e) {
        e.preventDefault();
        
        const $this = $(this);
        const filterValue = $this.data('filter');
        
        // Actualizar estado activo
        $filters.removeClass('active').attr('aria-selected', 'false');
        $this.addClass('active').attr('aria-selected', 'true');
        
        console.log(`🔍 Filtrando por: ${filterValue}`);
        
        // Aplicar filtro con Isotope
        if (isotopeInstance) {
            isotopeInstance.isotope({ filter: filterValue });
        }
        
        // Animar items
        animateItems();
    });
}

/**
 * Anima los items cuando se aplica un filtro
 */
function animateItems() {
    const $items = $portfolio.find('.grid-item.isotope-item');
    
    $items.each(function(index) {
        const $item = $(this);
        
        // Resetear animación
        $item.css({
            'opacity': '0',
            'transform': 'translateY(30px)'
        });
        
        // Aplicar animación con delay
        setTimeout(() => {
            $item.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, index * 100);
    });
}

// ===========================================
// MAGNIFIC POPUP
// ===========================================

/**
 * Inicializa Magnific Popup para la galería
 */
function initMagnificPopup() {
    console.log('🖼️ Inicializando Magnific Popup...');
    
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            tPrev: 'Anterior (Flecha izquierda)',
            tNext: 'Siguiente (Flecha derecha)',
            tCounter: '<span class="mfp-counter">%curr% de %total%</span>'
        },
        image: {
            titleSrc: function(item) {
                return 'Proyecto ' + (item.index + 1);
            }
        },
        callbacks: {
            beforeOpen: function() {
                console.log('🖼️ Abriendo lightbox...');
                
                // Ocultar scroll del body
                $('body').addClass('mfp-open');
                
                // Agregar clase personalizada
                $('.mfp-bg').addClass('custom-mfp-bg');
                $('.mfp-container').addClass('custom-mfp-container');
            },
            close: function() {
                console.log('❌ Cerrando lightbox...');
                
                // Restaurar scroll del body
                $('body').removeClass('mfp-open');
            },
            imageLoadComplete: function() {
                console.log('✅ Imagen cargada en lightbox');
            },
            change: function() {
                console.log('🔄 Cambiando imagen en lightbox');
            }
        },
        closeOnContentClick: false,
        closeBtnInside: true,
        mainClass: 'mfp-fade',
        removalDelay: 300
    });
    
    console.log('✅ Magnific Popup inicializado correctamente');
}

// ===========================================
// AOS (ANIMATE ON SCROLL)
// ===========================================

/**
 * Inicializa AOS para animaciones de scroll
 */
function initAOS() {
    console.log('🎭 Inicializando AOS...');
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 0
        });
        
        console.log('✅ AOS inicializado correctamente');
    } else {
        console.warn('⚠️ AOS no está disponible');
    }
}

// ===========================================
// FUNCIONES UTILITARIAS
// ===========================================

/**
 * Función para recargar Isotope (útil para cambios dinámicos)
 */
function reloadPortfolio() {
    console.log('🔄 Recargando portfolio...');
    
    if (isotopeInstance) {
        isotopeInstance.isotope('reloadItems');
        isotopeInstance.isotope('layout');
        console.log('✅ Portfolio recargado');
    }
}

/**
 * Función para cambiar el layout de Isotope
 */
function changeLayout(layoutMode) {
    console.log(`🔄 Cambiando layout a: ${layoutMode}`);
    
    if (isotopeInstance) {
        isotopeInstance.isotope({ layoutMode: layoutMode });
        console.log('✅ Layout cambiado correctamente');
    }
}

/**
 * Función para obtener información del portfolio
 */
function getPortfolioInfo() {
    if (!isotopeInstance) return null;
    
    const $items = $portfolio.find('.grid-item');
    const $visibleItems = $portfolio.find('.grid-item.isotope-item:visible');
    
    return {
        totalItems: $items.length,
        visibleItems: $visibleItems.length,
        currentFilter: $filters.filter('.active').data('filter')
    };
}

// ===========================================
// EVENTOS DE WINDOW
// ===========================================

/**
 * Maneja el redimensionamiento de la ventana
 */
$window.on('resize', debounce(function() {
    console.log('📱 Redimensionando ventana...');
    
    if (isotopeInstance) {
        isotopeInstance.isotope('layout');
    }
    
    // Recargar AOS en mobile
    if ($window.width() < 768 && typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

/**
 * Función debounce para optimizar eventos
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================================
// NAVEGACIÓN POR TECLADO
// ===========================================

/**
 * Maneja la navegación por teclado en la galería
 */
$document.on('keydown', function(e) {
    // Solo si hay un lightbox abierto
    if ($('.mfp-wrap').hasClass('mfp-ready')) {
        switch(e.key) {
            case 'Escape':
                if (typeof $.magnificPopup !== 'undefined') {
                    $.magnificPopup.close();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                $('.mfp-arrow-left').click();
                break;
            case 'ArrowRight':
                e.preventDefault();
                $('.mfp-arrow-right').click();
                break;
        }
    }
});

// ===========================================
// FUNCIONES DE DESARROLLO
// ===========================================

/**
 * Función para debug (solo en desarrollo)
 */
function debugPortfolio() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🐛 Debug del Portfolio:');
        console.log('- Isotope:', isotopeInstance ? 'Inicializado' : 'No inicializado');
        console.log('- Items totales:', $portfolio.find('.grid-item').length);
        console.log('- Items visibles:', $portfolio.find('.grid-item.isotope-item:visible').length);
        console.log('- Filtro activo:', $filters.filter('.active').data('filter'));
        console.log('- AOS:', typeof AOS !== 'undefined' ? 'Disponible' : 'No disponible');
        console.log('- Magnific Popup:', typeof $.magnificPopup !== 'undefined' ? 'Disponible' : 'No disponible');
    }
}

// ===========================================
// EXPORTAR FUNCIONES (para uso externo)
// ===========================================
window.GaleriaProyectos = {
    init: initPortfolio,
    reload: reloadPortfolio,
    changeLayout: changeLayout,
    getInfo: getPortfolioInfo,
    debug: debugPortfolio
};

// ===========================================
// INICIALIZACIÓN AUTOMÁTICA AL CARGAR
// ===========================================
console.log('📋 Script de Galería de Proyectos cargado');
console.log('🔧 Funciones disponibles:', Object.keys(window.GaleriaProyectos));
