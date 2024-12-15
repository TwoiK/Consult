// script.js

function setActiveNavLink() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Add active class only to current page link
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}



// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '☰';
    document.querySelector('.navbar').appendChild(mobileMenuButton);

    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-active');
        mobileMenuButton.innerHTML = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        if (!navbar.contains(e.target) && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            mobileMenuButton.innerHTML = '☰';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        mobileMenuButton.innerHTML = '☰';
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink(); 
    initializeMobileMenu();
    window.addEventListener('scroll', handleNavbarScroll);
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Don't animate on page load, only on scroll
        if (!entry.target.classList.contains('initial-load')) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Wait for page load
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class and initial-load class to elements
    const elements = document.querySelectorAll('.overview, .service-card');
    

    elements.forEach(el => {
        el.classList.add('fade-in', 'initial-load');
    });

    // Remove initial-load class after a brief delay
    setTimeout(() => {
        elements.forEach(el => {
            el.classList.remove('initial-load');
            observer.observe(el);
        });
    }, 100);
});

//animation for goal area

// Add this to your script.js
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for goal areas
    const goalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                goalObserver.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all goal areas
    const goalAreas = document.querySelectorAll('.goal-area');
    goalAreas.forEach(area => {
        area.classList.add('goal-animate'); // Add initial class
        goalObserver.observe(area);
    });
});



// In your script.js
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false; // Flag to track if animation has occurred

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true; // Set flag to true when animation starts
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const steps = 50;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, duration / steps);
                });
            }
        });
    }, observerOptions);

    // Observe the stats container instead of individual numbers
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});