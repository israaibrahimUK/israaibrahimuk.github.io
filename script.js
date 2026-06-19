(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-menu');
  const year = document.getElementById('year');
  const allowedThemes = new Set(['light', 'dark']);
  let storedTheme;

  try {
    storedTheme = localStorage.getItem('theme');
  } catch (error) {
    console.warn('Unable to read theme from localStorage.', error);
    storedTheme = undefined;
  }

  if (allowedThemes.has(storedTheme)) {
    root.dataset.theme = storedTheme;
  }

  const updateThemeButton = () => {
    if (!themeToggle) {
      return;
    }

    const isDark = root.dataset.theme === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (error) {
        console.warn('Unable to save theme to localStorage.', error);
      }
      updateThemeButton();
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
