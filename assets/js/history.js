function renderHistory() {
  const container = document.getElementById('history-list');
  const empty = document.getElementById('history-empty');
  if (!container) return;

  // Merge dummy + localStorage orders
  const localOrders = JSON.parse(localStorage.getItem('sw_orders') || '[]');
  const dummyOrders = typeof TRANSACTIONS !== 'undefined' ? TRANSACTIONS.map(t => ({
    id: t.id, customer: t.customer, school: t.school,
    items: t.items.map(i => ({ name: i.name, qty: i.qty, price: i.price, image: `assets/images/products/${i.name.toLowerCase().replace(/ /g,'-')}.png` })),
    total: t.total, status: t.status, date: t.date, paymentMethod: t.paymentMethod
  })) : [];

  const orders = [...localOrders, ...dummyOrders];

  if (orders.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  const statusLabel = { selesai: 'Selesai', proses: 'Diproses', pending: 'Pending', batal: 'Dibatalkan' };
  const statusClass = { selesai: 'badge-success', proses: 'badge-warning', pending: 'badge-primary', batal: 'badge-danger' };

  container.innerHTML = orders.map(order => `
    <div class="history-item">
      <div class="history-header">
        <div class="history-order-id">No. Pesanan: <span>${order.id}</span> &nbsp;·&nbsp; ${order.date}</div>
        <span class="badge ${statusClass[order.status] || 'badge-primary'}">${statusLabel[order.status] || order.status}</span>
      </div>
      <div class="history-items-row">
        ${order.items.slice(0, 4).map(item => `
          <div class="history-item-card">
            <div class="history-item-thumb">
              <img src="${item.image || ''}" alt="${item.name}" onerror="this.style.display='none'">
            </div>
            <div>
              <div class="history-item-name">${item.name}</div>
              <div class="history-item-qty">${item.qty} pcs</div>
            </div>
          </div>
        `).join('')}
        ${order.items.length > 4 ? `<span class="history-more">+${order.items.length-4} item lainnya</span>` : ''}
      </div>
      <div class="history-footer">
        <div class="history-order-meta">Pembayaran: ${order.paymentMethod || '-'}</div>
        <div class="history-total">Total: <span>${formatRupiah(order.total)}</span></div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderHistory);