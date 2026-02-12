// ================================
// CUSTOM CURSOR
// ================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = (e.clientX + 6) + 'px';
            cursorFollower.style.top = (e.clientY + 6) + 'px';
        }, 100);
    }
});

// Expand cursor on hover
document.querySelectorAll('a, button, .clickable, .icon-card').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        }
    });
    elem.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        }
    });
});

// ================================
// THEME TOGGLE
// ================================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        const isDark = document.body.classList.contains('dark-mode');
        icon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (icon) icon.textContent = '☀️';
    }
});

// ================================
// MODAL SYSTEM
// ================================
function openModal(modalName) {
    const modal = document.getElementById(modalName + '-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalName) {
    const modal = document.getElementById(modalName + '-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe icon cards
document.addEventListener('DOMContentLoaded', () => {
    const iconCards = document.querySelectorAll('.icon-card');
    iconCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ================================
// SMOOTH SCROLL
// ================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default if it's just "#" or has onclick
            if (href === '#' || this.hasAttribute('onclick')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ================================
// NAVIGATION SCROLL EFFECT
// ================================
let lastScrollY = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    if (nav) {
        // Add shadow when scrolled
        if (scrollY > 50) {
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }
    
    lastScrollY = scrollY;
});

// ================================
// PARALLAX EFFECT
// ================================
const heroBackground = document.querySelector('.hero-bg');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// ================================
// ANIMATIONS KEYFRAMES (CSS)
// ================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(-100px, -50px) rotate(120deg); }
        66% { transform: translate(50px, -100px) rotate(240deg); }
    }

    @keyframes floatCard {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
    }

    @keyframes rotate {
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('✨ Portfolio JavaScript loaded successfully!');