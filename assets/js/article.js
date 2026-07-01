function renderArticlesGrid(containerId, articles = ARTICLES) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = articles.map(a => `
    <div class="article-card reveal" onclick="window.location.href='article-detail.html?id=${a.id}'">
      <div class="article-card-image">
        <img src="${a.image}" alt="${a.title}" class="responsive-cover-img" onerror="handleImgError(this)">
      </div>
      <div class="article-card-body">
        <span class="article-card-tag">${a.category}</span>
        <div class="article-card-title">${a.title}</div>
        <div class="article-card-meta">
          <span>${a.author}</span>
          <span>·</span>
          <span>${a.date}</span>
          <span>·</span>
          <span>${a.readTime} baca</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderArticleDetail() {
  const id = getParam('id');
  const article = getArticleById(id);
  if (!article) { document.getElementById('article-detail-content').innerHTML = '<p>Artikel tidak ditemukan.</p>'; return; }

  document.title = `${article.title} — SakhaWear`;

  const el = document.getElementById('article-detail-content');
  if (!el) return;

  el.innerHTML = `
    <div class="article-detail-layout">
      <div>
        <span class="article-card-tag">${article.category}</span>
        <h1 class="article-detail-title">${article.title}</h1>
        <div class="article-detail-meta">
          <span>${article.author}</span><span>·</span><span>${article.date}</span><span>·</span><span>${article.readTime} baca</span>
        </div>
        <div class="article-detail-image-wrapper">
          <img src="${article.image}" alt="${article.title}" class="responsive-cover-img" onerror="handleImgError(this)">
        </div>
        <div class="article-body">${article.content}</div>
      </div>
      <div class="article-sidebar">
        <div class="sidebar-card">
          <div class="article-sidebar-title">Artikel Lainnya</div>
          ${ARTICLES.filter(a => a.id !== article.id).slice(0,4).map(a => `
            <a href="article-detail.html?id=${a.id}" class="article-sidebar-link">
              <div class="article-sidebar-thumb">
                <img src="${a.image}" alt="${a.title}" class="responsive-cover-img" onerror="handleImgError(this)">
              </div>
              <div>
                <div class="article-sidebar-text">${a.title}</div>
                <div class="article-sidebar-date">${a.date}</div>
              </div>
            </a>
          `).join('')}
        </div>
        <div class="sidebar-card">
          <div class="article-sidebar-title">Kategori</div>
          ${[...new Set(ARTICLES.map(a => a.category))].map(cat => `
            <div class="article-sidebar-category" onclick="window.location.href='articles.html?cat=${encodeURIComponent(cat)}'">${cat}</div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const bc = document.getElementById('breadcrumb-name');
  if (bc) bc.textContent = article.title.substring(0, 40) + '...';
}

function filterArticles() {
  const q = document.getElementById('search-input')?.value.toLowerCase() || '';
  const cat = document.querySelector('.filter-chip.active')?.dataset.cat || 'all';
  let filtered = ARTICLES;
  if (cat !== 'all') filtered = filtered.filter(a => a.category === cat);
  if (q) filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
  renderArticlesGrid('articles-grid', filtered);
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('articles-grid')) {
    renderArticlesGrid('articles-grid');
    if (typeof initScrollReveal === 'function') initScrollReveal();
    document.getElementById('search-input')?.addEventListener('input', filterArticles);
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterArticles();
      });
    });
  }
  if (document.getElementById('article-detail-content')) renderArticleDetail();
});