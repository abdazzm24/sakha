function renderPortfolioMasonry(containerId, portfolios = PORTFOLIOS) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = portfolios.map(p => `
    <div class="portfolio-card reveal" onclick="window.location.href='portfolio-detail.html?id=${p.id}'">
      <div class="portfolio-card-image portfolio-card-image--${p.height >= 380 ? 'xlarge' : p.height >= 360 ? 'tall' : p.height >= 320 ? 'medium' : 'short'}">
        <img src="${p.image}" alt="${p.school}" class="responsive-cover-img" onerror="handleImgError(this)">
      </div>
      <div class="portfolio-card-overlay">
        <div class="portfolio-card-info">
          <div class="portfolio-card-school">${p.school}</div>
          <div class="portfolio-card-address">${p.address}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderPortfolioDetail() {
  const id = getParam('id');
  const portfolio = getPortfolioById(id);
  if (!portfolio) { document.getElementById('portfolio-detail-content').innerHTML = '<p>Portfolio tidak ditemukan.</p>'; return; }

  document.title = `${portfolio.school} — Portfolio SakhaWear`;

  const el = document.getElementById('portfolio-detail-content');
  if (!el) return;
  el.innerHTML = `
    <div class="portfolio-detail-layout">
      <div class="portfolio-detail-img">
        <img src="${portfolio.image}" alt="${portfolio.school}" class="responsive-cover-img" onerror="this.parentElement.style.minHeight='400px';this.parentElement.innerHTML='<div class=&quot;img-placeholder&quot;><span>Gambar tidak tersedia</span></div>'">
      </div>
      <div>
        <div class="portfolio-info-card">
          <div class="portfolio-info-title">${portfolio.school}</div>
          <div class="portfolio-info-address">${portfolio.address || portfolio.city}</div>
          <div class="portfolio-info-row"><span class="portfolio-info-label">Kota</span><span class="portfolio-info-value">${portfolio.city}</span></div>
          <div class="portfolio-info-row"><span class="portfolio-info-label">Jenis Seragam</span><span class="portfolio-info-value">${portfolio.type}</span></div>
          <div class="portfolio-info-row"><span class="portfolio-info-label">Jumlah</span><span class="portfolio-info-value">${portfolio.qty}</span></div>
          <div class="portfolio-info-row"><span class="portfolio-info-label">Tahun</span><span class="portfolio-info-value">${portfolio.year}</span></div>
          <p class="product-detail-desc">${portfolio.description}</p>
          <a href="https://wa.me/6289507436454?text=Halo, saya ingin memesan seragam seperti ${encodeURIComponent(portfolio.school)}" target="_blank" class="btn btn-primary btn-full">
            Pesan Seragam Serupa
          </a>
        </div>
      </div>
    </div>
  `;

  const bc = document.getElementById('breadcrumb-name');
  if (bc) bc.textContent = portfolio.school;
}

function filterPortfolios() {
  const cat = document.querySelector('.filter-chip.active')?.dataset.cat || 'all';
  const filtered = cat === 'all' ? PORTFOLIOS : PORTFOLIOS.filter(p => p.type === cat);
  renderPortfolioMasonry('portfolio-masonry', filtered);
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('portfolio-masonry')) {
    renderPortfolioMasonry('portfolio-masonry');
    if (typeof initScrollReveal === 'function') initScrollReveal();
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterPortfolios();
      });
    });
  }
  if (document.getElementById('portfolio-detail-content')) renderPortfolioDetail();
});