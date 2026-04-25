/**
 * GLOBAL JS — Loading, Navigation, Scroll, Animations, Profile Photo
 * -------------------------------------------------------------------
 * Fungsi-fungsi global yang dipakai di seluruh halaman.
 */

// ============ LOADING SCREEN ============
let loadingScreenHidden = false;
function hideLoadingScreen() {
    if (loadingScreenHidden) return;
    loadingScreenHidden = true;
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

document.addEventListener('DOMContentLoaded', hideLoadingScreen);
if (document.readyState !== 'loading') {
    hideLoadingScreen();
}

// ============ MOBILE NAVIGATION ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============ NAVBAR BACKGROUND ON SCROLL ============
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ============ SCROLL ANIMATION ============
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

const animatedElements = document.querySelectorAll(
    '.project-card, .org-card, .award-card, .timeline-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ PROFILE PHOTO (dari images.js) ============
function applyProfilePhoto() {
    const img = document.getElementById('introProfilePhoto');
    const placeholder = document.getElementById('introPhotoPlaceholder');
    if (!img || !placeholder) return;
    if (typeof IMAGES !== 'undefined' && IMAGES.profile) {
        img.src = IMAGES.profile;
        img.alt = 'Profile';
        img.onload = () => {
            img.classList.add('loaded');
            placeholder.classList.add('hidden');
        };
        img.onerror = () => {
            placeholder.classList.remove('hidden');
        };
    } else {
        placeholder.classList.remove('hidden');
    }
}

// ============ LAZY LOADING ============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============ EASTER EGG: KONAMI CODE ============
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    if (konamiCode.join('') === konamiSequence.join('')) {
        alert('🎮 Konami Code Activated! You found the easter egg!');
        document.body.style.animation = 'rainbow 2s linear infinite';
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ============ CONSOLE MESSAGE ============
console.log('%c👋 Hello there!', 'font-size: 20px; color: #ffffff; background-color: #0a0a0a; padding: 10px;');
console.log('%cThanks for checking out the code! Feel free to explore.', 'font-size: 14px; color: #b0b0b0;');

// ============ INIT ON DOM LOAD ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully! 🚀');
    updateActiveNavLink();
    applyProfilePhoto();
});
