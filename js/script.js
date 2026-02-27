/* ============================================
   MAKABONGWE SIMELANE - PERSONAL WEBSITE JS
   Navigation, Form Handling, and Interactivity
   ============================================ */

/* ============================================
   DOM READY - Initialize Everything
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeFormHandling();
    setActiveNavLink();
    initializeScrollAnimations();
    console.log('Website initialized successfully');
});

/* ============================================
   NAVIGATION FUNCTIONALITY
   ============================================ */

/**
 * Initialize mobile navigation toggle
 * Handles hamburger menu for responsive design
 */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.nav-container');
        if (!isClickInsideNav && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
}

/* ============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================ */

/**
 * Set the active navigation link based on current page
 * Highlights the navigation item matching the current page
 */
function setActiveNavLink() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the matching link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

/**
 * Initialize contact form submission
 * Handles form validation and user feedback
 */
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (validateContactForm(formData)) {
                // Process the form (in a real scenario, this would send to a backend)
                handleFormSubmission(formData);
            }
        });
    }
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateContactForm(formData) {
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Check message length
    if (formData.message.length < 10) {
        showNotification('Message should be at least 10 characters long', 'error');
        return false;
    }

    return true;
}

/**
 * Handle form submission
 * @param {Object} formData - Validated form data
 */
function handleFormSubmission(formData) {
    // Get form status element
    const formStatus = document.getElementById('formStatus');
    const contactForm = document.getElementById('contactForm');

    // Show success message
    if (formStatus) {
        formStatus.classList.remove('hidden');
        formStatus.classList.add('show');
    }

    // Log form data (in production, this would be sent to backend)
    console.log('Form submitted with data:', formData);

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        if (formStatus) {
            formStatus.classList.add('hidden');
            formStatus.classList.remove('show');
        }
    }, 5000);

    // Show a confirmation message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
}

/**
 * Show notification to user
 * @param {string} message - Message to display
 * @param {string} type - Notification type: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#DCFCE7' : type === 'error' ? '#FEE2E2' : '#DBEAFE'};
        color: ${type === 'success' ? '#166534' : type === 'error' ? '#991B1B' : '#164E63'};
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        border-left: 4px solid ${type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#06B6D4'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Initialize scroll-based animations
 * Adds fade-in effects as elements come into view
 */
function initializeScrollAnimations() {
    // Add animation styles to head
    addAnimationStyles();

    // Get all elements that should be animated
    const animatedElements = document.querySelectorAll(
        '.overview-card, .skill-item, .value-card, .tech-interest-card, ' +
        '.mindset-card, .takeaway-item, .connect-card, .contact-item'
    );

    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

/**
 * Add animation keyframes to document
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */

/**
 * Add smooth scrolling to anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Debounce function to optimize event handling
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} - True if element is visible
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add hover effect to card elements
 * Provides visual feedback on mouse hover
 */
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll(
        '.overview-card, .skill-item, .value-card, .contact-item'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/* ============================================
   WINDOW LOAD EVENT
   ============================================ */

/**
 * Additional initialization on window load
 * Runs after all resources are loaded
 */
window.addEventListener('load', function() {
    initializeCardHoverEffects();
    initializeSmoothScroll();
    console.log('All resources loaded and page fully initialized');
});

/* ============================================
   ERROR HANDLING
   ============================================ */

/**
 * Global error handler
 */
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

console.log('Makabongwe Simelane - Personal Website - JavaScript loaded successfully');
