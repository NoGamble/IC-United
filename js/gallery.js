/* ============================================================
   IC UNITED FC — Gallery Page Logic
   ============================================================ */

(function () {
  const masonry = document.getElementById('galleryMasonry');
  const filter  = document.getElementById('galleryFilter');
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbDate  = document.getElementById('lbDate');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');

  let currentItems = [...GALLERY];
  let currentIndex = 0;

  /* ---- Build items ---- */
  GALLERY.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.dataset.cat   = item.category;
    el.dataset.ratio = item.ratio;
    el.dataset.index = i;
    el.setAttribute('data-cursor', 'image');
    const photoSrc = IMAGE_CONFIG.gallery[item.id] || '';
    el.innerHTML = `
      <div class="gallery-item-inner">
        ${photoSrc
          ? `<img src="${photoSrc}" alt="${item.title}" loading="lazy">`
          : `<div class="gallery-item-placeholder">${item.title}</div>`
        }
        <div class="gallery-item-overlay">
          <div class="gallery-item-caption">
            <span class="gallery-item-title">${item.title}</span>
            <span class="gallery-item-date">${item.date}</span>
          </div>
        </div>
        <div class="gallery-item-zoom">⊕</div>
        <div class="gallery-item-cat">
          <span class="badge badge-gray">${item.category}</span>
        </div>
      </div>
    `;
    el.addEventListener('click', () => openLb(i));
    masonry.appendChild(el);
  });

  /* ---- Category filter ---- */
  filter.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    currentItems = cat === 'all' ? [...GALLERY] : GALLERY.filter(g => g.category === cat);

    document.querySelectorAll('.gallery-item').forEach(el => {
      if (cat === 'all' || el.dataset.cat === cat) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  });

  /* ---- Lightbox ---- */
  function openLb(rawIndex) {
    const item = GALLERY[rawIndex];
    currentIndex = currentItems.findIndex(i => i.id === item.id);
    if (currentIndex === -1) currentIndex = 0;
    renderSlide();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderSlide() {
    const item = currentItems[currentIndex];
    if (!item) return;
    const photoSrc = IMAGE_CONFIG.gallery[item.id] || '';
    if (photoSrc) {
      lbImg.innerHTML = `<img src="${photoSrc}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover">`;
    } else {
      lbImg.textContent = item.title;
    }
    lbTitle.textContent = item.title;
    lbDate.textContent  = item.date;
    lbPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
    lbNext.style.opacity = currentIndex === currentItems.length - 1 ? '0.3' : '1';
  }

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  lbPrev.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderSlide(); } });
  lbNext.addEventListener('click', () => { if (currentIndex < currentItems.length - 1) { currentIndex++; renderSlide(); } });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft'  && currentIndex > 0) { currentIndex--; renderSlide(); }
    if (e.key === 'ArrowRight' && currentIndex < currentItems.length - 1) { currentIndex++; renderSlide(); }
  });
})();
