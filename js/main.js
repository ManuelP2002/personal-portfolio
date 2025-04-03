const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const backToTop = document.querySelector('.back-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectitems = document.querySelectorAll('.project-item');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const typedTextElement = document.querySelector('.typed-text');
const cvButton = document.getElementById('cvDownload');

// Language switcher
let currentLanguage = localStorage.getItem('language') || 'en';

// Update all text based on language selected
function  updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all elements with a translation key
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');

        // Handle nested keys
        if (key.includes('.')) {
            const keyParts = key.split('.');
            let translation = translations[lang];

            for (const part of keyParts) {
                translation = translation?.[part] || key;
            }

            element.textContent = translation
        } else {
            element.textContent = translations[lang][key] || key;
        }
    });

    // Update logo text
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.textContent = translations[lang].header.logo;
    }

    // Update contact from placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = translations[lang][key] || '';
    });

    updateTypedText();

    if (cvButton) {
        cvButton.href = cvButton.getAttribute(`data-cv-${lang}`)
        cvButton.download = `Manuel_Portilla_CV_${lang.toUpperCase()}.pdf`
    }
}

// Language switcher click event
document.querySelectorAll('.language-switcher').forEach(switcher => {
    switcher.addEventListener('click', function() {
        console.log('Language button clicked');
        const lang = this.getAttribute('data-lang');
        console.log('Selected language:', lang);
        if (translations[lang]) {
            console.log('Valid language found');
            updateLanguage(lang);
            document.querySelectorAll('.language-switcher').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// CV download click event
cvButton.addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = this.href;
    link.download = this.download;
    link.style.display = 'none'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Typed text effect
let typedTextString = [];
let currentStringIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function updateTypedText() {
    // Clear existing timeout
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    // Reset variables
    typedTextString = translations[currentLanguage].profession || [];
    currentStringIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;

    // Only start if we have valid data
    if (typedTextString.length > 0 && typedTextElement) {
        typeEffect();
    }
}

function typeEffect() {
    const currentString = typedTextString[currentStringIndex] || '';
    let typingDelay = 150; // Base speed

    if (isDeleting) {
        typingDelay = 75; // Faster delete speed
    } else if (currentCharIndex === currentString.length) {
        typingDelay = 2000; // Pause at end
    }

    // Update text content
    typedTextElement.textContent = currentString.substring(0, currentCharIndex);

    // Manage states
    if (!isDeleting && currentCharIndex < currentString.length) {
        currentCharIndex++;
    } else if (!isDeleting) {
        isDeleting = true;
    } else if (isDeleting && currentCharIndex > 0) {
        currentCharIndex--;
    } else {
        // Move to next string
        isDeleting = false;
        currentStringIndex = (currentStringIndex + 1) % typedTextString.length;
    }

    // Recall function with proper cleanup
    typingTimeout = setTimeout(typeEffect, typingDelay);
}

// Scroll Event Listener
window.addEventListener('scroll', () => {
    // Header scroll effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled')
    }

    // Back-to-top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to cicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectitems.forEach(item => {
            if (filter == 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Back-to-top button
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav lnks based on scroll position
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}



// Call functions on page load
window.addEventListener('DOMContentLoaded', () => {
   // Set initial language
   updateLanguage(currentLanguage);

   document.querySelectorAll('.language-switcher').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
   });
   
    // Set initial active state for filter buttons
    if (filterBtns.length > 0) {
        filterBtns[0].classList.add('active');
    }

    window.addEventListener('scroll', highlightNavLink);

    if (typedTextElement) {
        setTimeout(typeEffect, 1000);
    }  
});

// Customization Options
const customization = {
    // Values to customize portfolio
    name: "Manuel Portila",
    primaryColor: "#746CC0",
    secondaryColor: "#C4B289",
    logoText: "Goli's Portfolio",
    enableDarkMode: true,

    apply: function() {
        // Update name
        document.querySelectorAll('.hero h1 span.highlight').forEach(el => {
            el.textContent = this.name;
        });

        // Update colors
        document.documentElement.style.setProperty('--primary-color', this.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);

        // Update logo text
        document.querySelector('.logo').textContent = this.logoText;

        // Toggle dark mode option
        if (!this.enableDarkMode) {
            themeSwitcher.style.display = 'None';
        }
    }
}

// Apply customizations
customization.apply();