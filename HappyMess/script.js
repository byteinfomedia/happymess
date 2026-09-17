/* ============================================
   HAPPY MESS — interactions
   ============================================ */

const header = document.getElementById('siteHeader');
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

// 1. Header gets a border/shadow once the page scrolls
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 2. Mobile menu toggle
const closeMenu = () => {
  header.classList.remove('nav-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-item.is-open').forEach(item => {
    item.classList.remove('is-open');
    const btn = item.querySelector('.nav-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
};

hamburger.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  if (!isOpen) closeMenu();
});

// 3. Dropdowns — hover handles desktop via CSS; this covers tap + keyboard
const isCompact = () => window.matchMedia('(max-width: 860px)').matches;

document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
  const btn = item.querySelector('.nav-toggle');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !item.classList.contains('is-open');

    // only one panel open at a time
    document.querySelectorAll('.nav-item.has-dropdown').forEach(other => {
      if (other !== item) {
        other.classList.remove('is-open');
        const b = other.querySelector('.nav-toggle');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('is-open', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
  });
});

// Close the menu after picking a real link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Click outside / Escape closes everything
document.addEventListener('click', (e) => {
  if (!e.target.closest('#mainNav') && !e.target.closest('#hamburger')) closeMenu();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Reset state when resizing across the breakpoint
let lastCompact = isCompact();
window.addEventListener('resize', () => {
  const now = isCompact();
  if (now !== lastCompact) {
    lastCompact = now;
    closeMenu();
  }
});

// 4. Scroll-reveal — sections settle into place once, as they enter view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// 5. Hero confetti — a handful of drifting shapes, generated once on load
(function confetti() {
  const field = document.getElementById('confettiField');
  if (!field) return;
  const colors = ['#FF4F5E', '#FFC53D', '#6C5CE7', '#2FBF8F'];
  const shapes = window.innerWidth < 640 ? 10 : 16;

  for (let i = 0; i < shapes; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 8;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * (Math.random() > 0.5 ? 1 : 2.4)}px`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${20 + Math.random() * 70}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${6 + Math.random() * 6}s`;
    piece.style.animationDelay = `${Math.random() * 5}s`;
    field.appendChild(piece);
  }
})();
