// Simple auto-slider utility (used for testimonials or hero slider if needed)
function initSlider(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slides = container.querySelectorAll('.slide');
  if (!slides.length) return;
  let current = 0;
  const interval = options.interval || 4000;

  function goTo(idx) {
    slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  slides[0].classList.add('active');
  let timer = setInterval(() => goTo(current + 1), interval);

  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(current + 1), interval); });
}