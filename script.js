
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize any interactive elements here
    initializeSmoothScrolling();
    initializeResponsiveFeatures();
    initializeNavigationScrollDetection();
    initializeProjectScrollAnimation();
    initializeVideoDelay();
    initializeEmailCopy();
    initializeFooterBackToTop();
});


// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Responsive features and mobile optimizations
function initializeResponsiveFeatures() {
  
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// Utility functions for future use
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
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
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Simple navigation - no animations needed
function initializeNavigationScrollDetection() {
    // Navigation is now handled purely with CSS
    // No JavaScript animations needed
}

// Page load animation for all content sections
function initializeProjectScrollAnimation() {
    const animatedElements = document.querySelectorAll('.header-section, .works-section, .fun-section, .footer-section, .project-image-container, .fun-image-container, .fun-video-container');
    
    if (animatedElements.length === 0) return;
    
    // Check if this is the home page (index.html)
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
    
    // Function to animate all elements with staggered timing
    function animateAllElements() {
        animatedElements.forEach((element, index) => {
            // Add a small delay based on element type for staggered effect
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 200); // 200ms delay between each element for better visibility
        });
    }
    
    // Only animate on home page, show immediately on other pages
    if (isHomePage) {
        animateAllElements();
    } else {
        // If not home page, show elements immediately without animation
        animatedElements.forEach(element => {
            element.classList.add('animate-in');
        });
    }
}

// Export utils for use in other scripts
window.portfolioUtils = utils;


// Initialize video with delay
function initializeVideoDelay() {
    const logoVideo = document.getElementById('logo-video');
    
    if (logoVideo) {
        // Start video after 1.5 seconds delay
        setTimeout(() => {
            logoVideo.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }, 800);
    }
}

// Initialize scroll animations for project pages
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize email copy functionality
function initializeEmailCopy() {
    const emailLink = document.getElementById('email-link');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 'shdsggz@gmail.com';
            
            // Try to copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                    showCopyFeedback(emailLink, 'Copied!');
                }).catch(() => {
                    fallbackCopyTextToClipboard(email, emailLink);
                });
            } else {
                fallbackCopyTextToClipboard(email, emailLink);
            }
        });
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(element, 'Copied!');
        } else {
            showCopyFeedback(element, 'Copy failed');
        }
    } catch (err) {
        showCopyFeedback(element, 'Copy failed');
    }
    
    document.body.removeChild(textArea);
}

// Show visual feedback when email is copied
function showCopyFeedback(element, message) {
    const originalText = element.textContent;
    
    // Add transition class for smooth animation
    element.style.transition = 'all 0.3s ease';
    
    // Fade out current text
    element.style.opacity = '0';
    element.style.transform = 'translateY(5px)';
    
    setTimeout(() => {
        // Change text and color
        element.textContent = message;
        element.style.color = '#1D1D1F';
        
        // Fade in new text
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Reset after delay
        setTimeout(() => {
            // Fade out feedback
            element.style.opacity = '0';
            element.style.transform = 'translateY(-5px)';
            
            setTimeout(() => {
                // Restore original text and styling
                element.textContent = originalText;
                element.style.color = '';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300);
        }, 1200);
    }, 300);
}

// Initialize footer back to top button
function initializeFooterBackToTop() {
    const footerBackToTop = document.getElementById('footer-back-to-top');
    
    if (footerBackToTop) {
        footerBackToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigationScrollDetection();
    initializeScrollAnimations();
});