/* ============================================
   HAPPY MESS — interactions
   ============================================ */

// 1. Header gets a border/shadow once the page scrolls
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 2. Mobile menu toggle
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// 3. Scroll-reveal — sections settle into place once, as they enter view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// 4. Hero confetti — a handful of drifting shapes, generated once on load
(function confetti() {
  const field = document.getElementById('confettiField');
  if (!field) return;
  const colors = ['#FF4F5E', '#FFC53D', '#6C5CE7', '#2FBF8F'];
  const shapes = 16;

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
