const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = !navLinks.hidden;
    navLinks.hidden = isOpen;
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 759px)').matches) {
        navLinks.hidden = true;
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const mq = window.matchMedia('(min-width: 760px)');
  const syncNav = () => {
    if (mq.matches) {
      navLinks.hidden = false;
    } else {
      navLinks.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };
  mq.addEventListener('change', syncNav);
  syncNav();
}
