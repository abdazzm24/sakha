// ===== DASHBOARD INIT =====
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  renderAdminName();
  initDashboardSidebar();
  if (document.getElementById('dash-stats')) renderDashStats();
  if (document.getElementById('dash-recent-orders')) renderRecentOrders();
  if (document.getElementById('dash-products-table')) renderDashProducts();
  if (document.getElementById('dash-articles-table')) renderDashArticles();
  if (document.getElementById('dash-users-table')) renderDashUsers();
  if (document.getElementById('dash-transactions-table')) renderDashTransactions();
});

function renderAdminName() {
  const els = document.querySelectorAll('.admin-name');
  els.forEach(el => el.textContent = getAdminName());
}

function initDashboardSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.dashboard-overlay');
  const body = document.body;

  const setSidebarState = (open) => {
    if (!sidebar) return;
    sidebar.classList.toggle('open', open);
    overlay && overlay.classList.toggle('show', open);
    body.classList.toggle('sidebar-open', open && window.innerWidth <= 1024);
  };

  if (toggle && sidebar) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const shouldOpen = !sidebar.classList.contains('open');
      setSidebarState(shouldOpen);
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => setSidebarState(false));
  }

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) setSidebarState(false);
    });
  });

  if (sidebar) {
    sidebar.addEventListener('click', (e) => e.stopPropagation());
  }

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !toggle?.contains(e.target)) {
      setSidebarState(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setSidebarState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      setSidebarState(false);
      body.classList.remove('sidebar-open');
    }
  });
}

// ===== DASHBOARD HOME =====
function renderDashStats() {
  const stats = [
    { label: 'Total Produk', value: PRODUCTS.length, icon: 'box', color: 'blue', change: '+2 bulan ini' },
    { label: 'Total Artikel', value: ARTICLES.length, icon: 'file', color: 'green', change: '+1 bulan ini' },
    { label: 'Total Pengguna', value: USERS.length, icon: 'users', color: 'pink', change: '+3 bulan ini' },
    { label: 'Total Transaksi', value: TRANSACTIONS.length, icon: 'receipt', color: 'orange', change: `${formatRupiah(TRANSACTIONS.reduce((s,t)=>s+t.total,0))}` }
  ];

  const icons = {
    box: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    file: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    users: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    receipt: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`
  };

  document.getElementById('dash-stats').innerHTML = stats.map(s => `
    <div class="dash-stat-card">
      <div class="dash-stat-icon ${s.color}">${icons[s.icon]}</div>
      <div class="dash-stat-info">
        <div class="dash-stat-number">${s.value}</div>
        <div class="dash-stat-label">${s.label}</div>
        <div class="dash-stat-change up">${s.change}</div>
      </div>
    </div>
  `).join('');
}

function renderRecentOrders() {
  const el = document.getElementById('dash-recent-orders');
  if (!el) return;
  const recent = TRANSACTIONS.slice(0, 5);
  el.innerHTML = recent.map(t => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>${t.customer}</td>
      <td>${t.school}</td>
      <td>${formatRupiah(t.total)}</td>
      <td><span class="badge ${getStatusBadge(t.status)}">${t.status}</span></td>
      <td>${t.date}</td>
    </tr>
  `).join('');
}

// ===== PRODUCTS TABLE =====
function renderDashProducts() {
  const el = document.getElementById('dash-products-table');
  if (!el) return;
  el.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td>
        <div class="table-product-cell">
          <div class="table-thumb"><img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'"></div>
          <span>${p.name}</span>
        </div>
      </td>
      <td>${p.category}</td>
      <td>${formatRupiah(p.price)}</td>
      <td>${p.minOrder} pcs</td>
      <td><span class="badge badge-success">Aktif</span></td>
      <td>
        <button class="table-action-btn table-action-edit" onclick="editProduct(${p.id})">Edit</button>
        <button class="table-action-btn table-action-delete" onclick="deleteRow(this, '${p.name}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

// ===== ARTICLES TABLE =====
function renderDashArticles() {
  const el = document.getElementById('dash-articles-table');
  if (!el) return;
  el.innerHTML = ARTICLES.map(a => `
    <tr>
      <td><strong>${a.title.substring(0,50)}...</strong></td>
      <td>${a.category}</td>
      <td>${a.author}</td>
      <td>${a.date}</td>
      <td><span class="badge badge-success">Published</span></td>
      <td>
        <button class="table-action-btn table-action-edit">Edit</button>
        <button class="table-action-btn table-action-delete" onclick="deleteRow(this, 'artikel')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

// ===== USERS TABLE =====
function renderDashUsers() {
  const el = document.getElementById('dash-users-table');
  if (!el) return;
  el.innerHTML = USERS.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.school}</td>
      <td>${u.role}</td>
      <td>${u.orders}</td>
      <td><span class="badge ${u.status==='active'?'badge-success':'badge-warning'}">${u.status==='active'?'Aktif':'Nonaktif'}</span></td>
      <td>
        <button class="table-action-btn table-action-edit">Edit</button>
        <button class="table-action-btn table-action-delete" onclick="deleteRow(this, u.name)">Hapus</button>
      </td>
    </tr>
  `).join('');
}

// ===== TRANSACTIONS TABLE =====
function renderDashTransactions() {
  const el = document.getElementById('dash-transactions-table');
  if (!el) return;
  el.innerHTML = TRANSACTIONS.map(t => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>${t.customer}</td>
      <td>${t.school}</td>
      <td>${t.items.map(i => i.name).join(', ')}</td>
      <td>${formatRupiah(t.total)}</td>
      <td><span class="badge ${getStatusBadge(t.status)}">${t.status}</span></td>
      <td>${t.date}</td>
      <td>
        <button class="table-action-btn table-action-edit" onclick="changeStatus(this)">Ubah Status</button>
      </td>
    </tr>
  `).join('');
}

// ===== ACTIONS =====
function editProduct(id) { window.location.href = `product-form.html?id=${id}`; }

function deleteRow(btn, name) {
  if (confirm(`Hapus "${name}"?`)) {
    btn.closest('tr').remove();
    showToast(`Berhasil dihapus`, 'success');
  }
}

function changeStatus(btn) {
  const statuses = ['pending', 'proses', 'selesai', 'batal'];
  const cell = btn.closest('tr').querySelectorAll('td')[5];
  const badge = cell.querySelector('.badge');
  const cur = badge.textContent;
  const next = statuses[(statuses.indexOf(cur) + 1) % statuses.length];
  badge.textContent = next;
  badge.className = `badge ${getStatusBadge(next)}`;
  showToast('Status berhasil diubah', 'success');
}

function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span style="font-size:0.875rem;font-weight:500">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.3s'; setTimeout(()=>toast.remove(),300); }, 3000);
}