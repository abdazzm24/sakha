document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect to dashboard
  if (sessionStorage.getItem('sw_admin') && window.location.pathname.includes('login.html')) {
    window.location.href = 'dashboard/index.html';
    return;
  }

  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('login-name')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    if (!name || !password) {
      showLoginError('Nama dan password harus diisi.');
      return;
    }

    // Simulate login — any name+password combo works
    sessionStorage.setItem('sw_admin', JSON.stringify({ name, role: 'Admin' }));
    showLoginSuccess();
    setTimeout(() => { window.location.href = 'dashboard/index.html'; }, 1000);
  });
});

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function showLoginSuccess() {
  const btn = document.getElementById('login-btn');
  if (btn) { btn.textContent = 'Masuk...'; btn.disabled = true; }
}

// Guard for dashboard pages
function requireAuth() {
  if (!sessionStorage.getItem('sw_admin')) {
    window.location.href = '../login.html';
  }
}

function getAdminName() {
  const admin = JSON.parse(sessionStorage.getItem('sw_admin') || '{}');
  return admin.name || 'Admin';
}

function logout() {
  sessionStorage.removeItem('sw_admin');
  window.location.href = '../login.html';
}