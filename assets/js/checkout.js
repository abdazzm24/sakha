function renderCheckoutSummary() {
  const cart = getCart();
  const container = document.getElementById('checkout-items');
  if (!container) return;

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="order-summary-item">
      <div class="order-item-img">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
      </div>
      <div class="order-item-info">
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-qty">${item.qty} pcs</div>
      </div>
      <div class="order-item-price">${formatRupiah(item.price * item.qty)}</div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const el = document.getElementById('checkout-total');
  if (el) el.innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="summary-row"><span>Ongkos Kirim</span><span class="summary-note">Gratis</span></div>
    <div class="summary-row"><span>Total Pembayaran</span><span class="summary-total-value">${formatRupiah(subtotal)}</span></div>
  `;
}

function submitCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('co-name')?.value;
  const phone = document.getElementById('co-phone')?.value;
  const school = document.getElementById('co-school')?.value;
  const address = document.getElementById('co-address')?.value;

  if (!name || !phone || !school || !address) {
    showToast('Lengkapi semua data terlebih dahulu', 'error');
    return;
  }

  const cart = getCart();
  const order = {
    id: 'TRX-' + Date.now(),
    customer: name, phone, school, address,
    items: cart,
    total: getCartTotal(),
    status: 'pending',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || 'Transfer Bank'
  };

  // Save to history
  const history = JSON.parse(localStorage.getItem('sw_orders') || '[]');
  history.unshift(order);
  localStorage.setItem('sw_orders', JSON.stringify(history));

  // Clear cart
  localStorage.removeItem('sw_cart');
  updateCartBadge();

  // Show success
  document.getElementById('checkout-form-section').style.display = 'none';
  document.getElementById('checkout-success').style.display = 'block';
  document.getElementById('success-order-id').textContent = order.id;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  const form = document.getElementById('checkout-form');
  if (form) form.addEventListener('submit', submitCheckout);
});