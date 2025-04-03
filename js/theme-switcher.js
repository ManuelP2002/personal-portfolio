const themeSwitcher = document.querySelector('.theme-switcher');
const body = document.querySelector('.neobrutalism');

// Theme options
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

// Current theme state
let currentTheme = localStorage.getItem('theme') || THEMES.LIGHT;

// Always apply neobrutalism styling
document.body.classList.add('neobrutalism');

// Update theme switcher icon
function updateThemeSwitcherIcon() {
    const icon = themeSwitcher.querySelector('i');

    icon.className = '';

    if (currentTheme == THEMES.LIGHT) {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}
// Theme switcher click handler
function handleThemeSwitcherClick() {
    if (currentTheme === THEMES.LIGHT) {
        applyTheme(THEMES.DARK)
    } else {
        applyTheme(THEMES.LIGHT);
    }

    updateThemeSwitcherIcon();
}

// Initialize theme on page load
function initializeTheme() {
    applyTheme(currentTheme);

    updateThemeSwitcherIcon();
}

// Apply selected theme
function applyTheme(theme) {
    body.removeAttribute('data-theme');

    if (theme === THEMES.DARK) {
        body.setAttribute('data-theme', 'dark');
    }

    localStorage.setItem('theme', theme);
    currentTheme = theme;
}




document.addEventListener('DOMContentLoaded', initializeTheme);

themeSwitcher.addEventListener('click', handleThemeSwitcherClick);