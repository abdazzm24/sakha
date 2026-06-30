// ===== CART MANAGEMENT =====

function getCart() {
  return JSON.parse(localStorage.getItem('sw_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('sw_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, image: product.image, qty });
  }
  saveCart(cart);
  showToast(`${product.name} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (qty <= 0) removeFromCart(productId);
    else { item.qty = qty; saveCart(cart); }
  }
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

// ===== RENDER CART PAGE =====
function renderCartPage() {
  const container = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const summarySection = document.getElementById('cart-summary-section');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (summarySection) summarySection.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (summarySection) summarySection.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" onerror="handleImgError(this)">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatRupiah(item.price)}/pcs</div>
        <div class="cart-item-note">Min. order: ${getProductById(item.id)?.minOrder || 12} pcs</div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <div class="cart-item-total">${formatRupiah(item.price * item.qty)}</div>
        <button class="cart-item-remove" onclick="removeItem(${item.id})">Hapus</button>
      </div>
    </div>
  `).join('');

  renderSummary();
}

function renderSummary() {
  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;
  const el = document.getElementById('summary-content');
  if (!el) return;
  el.innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="summary-row"><span>Ongkos Kirim</span><span class="summary-note">Gratis</span></div>
    <div class="summary-row"><span>Total</span><span class="summary-total-value">${formatRupiah(total)}</span></div>
  `;
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
    renderCartPage();
  }
}

function removeItem(id) {
  removeFromCart(id);
  renderCartPage();
  showToast('Item dihapus dari keranjang', 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});