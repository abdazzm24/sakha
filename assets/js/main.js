// ===== SHARED UTILITIES =====

// Format currency
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

// Get URL param
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// Image placeholder SVG
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function imgPlaceholderHTML(label = '') {
  return `<div class="img-placeholder">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
    ${label ? `<span>${escapeHTML(label)}</span>` : ''}
  </div>`;
}

function handleImgError(img) {
  if (!img || !img.parentElement) return;
  img.parentElement.innerHTML = imgPlaceholderHTML(img.alt || '');
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  let mobileMenu = document.querySelector('.mobile-menu');
  if (!navbar) return;

  if (hamburger && !mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobile-menu';
    const navLinks = Array.from(document.querySelectorAll('.navbar-menu .navbar-link'));
    navLinks.forEach(link => {
      const clone = link.cloneNode(true);
      clone.classList.remove('active');
      mobileMenu.appendChild(clone);
    });
    document.body.appendChild(mobileMenu);
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Active link
  const links = document.querySelectorAll('.navbar-link[href^="#"]');
  const sections = [];
  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ el, link });
  });

  window.addEventListener('scroll', () => {
    let active = null;
    sections.forEach(({ el, link }) => {
      if (window.scrollY + 100 >= el.offsetTop) active = link;
    });
    links.forEach(l => l.classList.remove('active'));
    if (active) active.classList.add('active');
  });

  // Hamburger
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
    });

    mobileMenu.querySelectorAll('.navbar-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Cart badge
  updateCartBadge();
}

// ===== CART BADGE =====
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('sw_cart') || '[]');
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = {
    success: '<svg width="18" height="18" fill="none" stroke="#059669" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    error: '<svg width="18" height="18" fill="none" stroke="#E80137" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info: '<svg width="18" height="18" fill="none" stroke="#107DE4" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icons[type] || icons.info}<span class="toast-text">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; toast.style.transition = 'all 0.3s ease'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== MODAL =====
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== ACTIVE NAV (non-SPA pages) =====
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && href !== '#' && path.includes(href.replace('.html',''))) {
      link.classList.add('active');
    }
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initScrollTop();
  setActiveNavLink();
});