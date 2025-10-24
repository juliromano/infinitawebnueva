/**
 * Main JavaScript - Infinita Arquitectura
 * Common functionality for all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    initializeCommon();

    // Initialize page-specific functionality
    initializePageSpecific();
});

/**
 * Initialize common functionality
 */
function initializeCommon() {
    // Initialize AOS animations
    initializeAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Initialize navbar
    initializeNavbar();
    
    // Initialize scroll to top
    initializeScrollToTop();
    
    // Initialize lazy loading
    initializeLazyLoading();
	
    // Initialize forms
    initializeForms();
}

/**
 * Initialize page-specific functionality
 */
function initializePageSpecific() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeIndexPage();
            break;
        case 'projects':
            initializeProjectsPage();
            break;
        case 'blog':
            initializeBlogPage();
            break;
        case 'project-detail':
            initializeProjectDetailPage();
            break;
        default:
            break;
    }
}

/**
 * Get current page name
 * @returns {string} Current page name
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().split('.')[0];
    
    if (filename === 'index' || filename === '') return 'index';
    if (filename === 'projects') return 'projects';
    if (filename === 'blog') return 'blog';
    if (filename.includes('casa') || filename.includes('remodelacion') || filename.includes('altamira')) return 'project-detail';
    
    return 'index';
}

/**
 * Initialize AOS animations
 */
function initializeAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

/**
 * Initialize smooth scrolling
 */
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize navbar functionality
 */
function initializeNavbar() {
    const navbar = document.querySelector('.header');
    const navbarToggler = document.querySelector('.toggle-menu');
    const navbarCollapse = document.querySelector('.dropdown-menu');
    
    if (!navbar) return;
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.header-menu .header-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
		});
	});

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbarCollapse && !navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
		}
	});
}

/**
 * Initialize scroll to top functionality
 */
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
    	}
    });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Initialize forms
 */
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
		e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente!');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    });
}

/**
 * Initialize index page specific functionality
 */
function initializeIndexPage() {
    // Initialize hero video
    initializeHeroVideo();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize counters
    initializeCounters();
}

/**
 * Initialize projects page specific functionality
 */
function initializeProjectsPage() {
    // Projects page specific functionality is handled by projects-filter.js
}

/**
 * Initialize blog page specific functionality
 */
function initializeBlogPage() {
    // Blog page specific functionality
}

/**
 * Initialize project detail page specific functionality
 */
function initializeProjectDetailPage() {
    // Project detail page specific functionality is handled by project-detail.js
}

/**
 * Initialize hero video functionality
 */
function initializeHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const playButton = document.querySelector('.play-button');
    
    if (heroVideo && playButton) {
        playButton.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
                this.style.display = 'none';
            }
        });
        
        heroVideo.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                playButton.style.display = 'none';
            } else {
                this.pause();
                playButton.style.display = 'block';
            }
        });
    }
}

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length === 0 || projectItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
			}
		});
		return false;
	});
}

/**
 * Calcula y establece el tamaño de los elementos del portfolio
 */
function portfolio_item_size() {
	$('#portfolio').find('.grid-item').each(function() {
		var pi_height1 = $(this).outerWidth(true),
			pi_height2 = pi_height1 / 2;
		
		// Elementos largos en desktop
		if ($(this).hasClass('grid-long') && window_w > 991) {
			$(this).css('height', pi_height2);
		} else {
			$(this).css('height', Math.abs(pi_height1));
		}
	});
}

// ===========================================
// FUNCIONES DE SLIDER DE PROYECTOS
// ===========================================

/**
 * Inicializa el slider de proyectos
 */
function initProjectsSlider() {
	console.log('🎠 Inicializando slider de proyectos...');
	
	// Verificar que el elemento existe
	if ($('.featured-projects-slider .owl-carousel').length === 0) {
		console.warn('⚠️ No se encontró el slider de proyectos');
		return;
	}
	
/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
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

/**
 * Utility function to throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
		}
    };
}