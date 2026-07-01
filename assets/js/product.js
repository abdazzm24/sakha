function renderProductGrid(containerId, products = PRODUCTS) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(p => `
    <div class="product-card reveal" onclick="window.location.href='product-detail.html?id=${p.id}'">
      <div class="product-card-image">
        <img src="${p.image}" alt="${p.name}" onerror="handleImgError(this)">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-desc">${p.description}</div>
        <div class="product-card-footer">
          <div class="product-price">
            Mulai dari
            <span>${formatRupiah(p.price)}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();addToCart(${p.id})">+ Pesan</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderProductDetail() {
  const id = getParam('id');
  const product = getProductById(id);
  if (!product) { document.getElementById('product-detail-content').innerHTML = '<p>Produk tidak ditemukan.</p>'; return; }

  document.title = `${product.name} — SakhaWear`;

  const el = document.getElementById('product-detail-content');
  if (!el) return;
  el.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-images">
        <div class="product-main-image">
          <img src="${product.images[0]}" id="main-img" alt="${product.name}" onerror="handleImgError(this)">
        </div>
        <div class="product-thumbnails">
          ${product.images.map((img, i) => `
            <div class="product-thumb ${i===0?'active':''}" onclick="selectThumb(this,'${img}')">
              <img src="${img}" alt="thumb ${i+1}" onerror="handleImgError(this)">
            </div>
          `).join('')}
        </div>
      </div>
      <div class="product-detail-info">
        <span class="badge badge-primary product-detail-category">${product.category}</span>
        <h1 class="product-detail-name">${product.name}</h1>
        <div class="product-detail-price">${formatRupiah(product.price)} <small>/ pcs (min. ${product.minOrder} pcs)</small></div>
        <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))} <span class="product-review-count">(${product.reviewCount} ulasan)</span></div>
        <p class="product-detail-desc">${product.longDescription}</p>
        <div class="product-specs">
          <div class="spec-row"><span class="spec-label">Material</span><span class="spec-value">${product.material}</span></div>
          <div class="spec-row"><span class="spec-label">Ukuran</span><span class="spec-value">${product.sizes.join(', ')}</span></div>
          <div class="spec-row"><span class="spec-label">Warna</span><span class="spec-value">${product.colors.join(', ')}</span></div>
          <div class="spec-row"><span class="spec-label">Min. Order</span><span class="spec-value">${product.minOrder} pcs</span></div>
        </div>
        <ul class="feature-list">
          ${product.features.map(f => `<li class="feature-list-item"><svg width="16" height="16" fill="none" stroke="var(--primary)" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`).join('')}
        </ul>
        <div class="product-detail-actions">
          <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id})">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Tambah ke Keranjang
          </button>
          <a href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(product.name)}" target="_blank" class="btn btn-outline btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Konsultasi WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Breadcrumb
  const bc = document.getElementById('breadcrumb-name');
  if (bc) bc.textContent = product.name;
}

function selectThumb(el, src) {
  document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('main-img');
  if (main) main.src = src;
}

// Filter products
function filterProducts() {
  const q = document.getElementById('search-input')?.value.toLowerCase() || '';
  const cat = document.querySelector('.filter-chip.active')?.dataset.cat || 'all';
  let filtered = PRODUCTS;
  if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  if (cat !== 'all') filtered = filtered.filter(p => p.category === cat);
  renderProductGrid('products-grid', filtered);
  initScrollReveal();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('products-grid')) {
    renderProductGrid('products-grid');
    if (typeof initScrollReveal === 'function') initScrollReveal();
    document.getElementById('search-input')?.addEventListener('input', filterProducts);
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterProducts();
      });
    });
  }
  if (document.getElementById('product-detail-content')) renderProductDetail();
});