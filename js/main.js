/* ============================================================
   IC UNITED FC — Shared JS Utilities
   ============================================================ */

/* ---- Custom Cursor ---- */
(function () {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function tick() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  document.querySelectorAll('[data-cursor="image"]').forEach(el => {
    el.addEventListener('mouseenter', () => { document.body.classList.remove('cursor-hover'); document.body.classList.add('cursor-image'); });
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-image'));
  });
})();

/* ---- Nav scroll state ---- */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- Nav active link ---- */
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    const match = href.split('/').pop();
    if ((path === 'index.html' || path === '') && (href === 'index.html' || href === './')) {
      a.classList.add('active');
    } else if (match && match !== 'index.html' && path.includes(match)) {
      a.classList.add('active');
    }
  });
})();

/* ---- Mobile nav burger ---- */
(function () {
  const burger = document.querySelector('.nav-burger');
  const links  = document.querySelector('.nav-links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
  });
  links.querySelectorAll('.nav-link').forEach(a =>
    a.addEventListener('click', () => { links.classList.remove('open'); burger.classList.remove('open'); })
  );
})();

/* ---- Scroll reveal (IntersectionObserver) ---- */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ---- Drawer helper ---- */
function openDrawer(drawerEl, overlayEl) {
  drawerEl.classList.add('open');
  overlayEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer(drawerEl, overlayEl) {
  drawerEl.classList.remove('open');
  overlayEl.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Lightbox helper ---- */
function openLightbox(lb, items, index) {
  lb._items = items;
  lb._index = index;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderLightboxSlide(lb);
}
function closeLightbox(lb) {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function renderLightboxSlide(lb) {
  const item = lb._items[lb._index];
  const imgEl = lb.querySelector('.lightbox-img');
  const titleEl = lb.querySelector('.lightbox-caption-title');
  const dateEl  = lb.querySelector('.lightbox-caption-date');
  imgEl.textContent = item.title;
  if (titleEl) titleEl.textContent = item.title;
  if (dateEl)  dateEl.textContent  = item.date;
}

function getPlayerAvatarContent(player) {
  const photoSrc = IMAGE_CONFIG.players[player.id] || '';
  return photoSrc
    ? `<img src="${photoSrc}" alt="${player.name}" loading="lazy">`
    : player.nameEn.charAt(0).toUpperCase();
}

(function () {
  const avatarSelector = [
    '.player-card-avatar',
    '.drawer-avatar',
    '.honor-player-avatar',
    '.mini-avatar',
    '.club-supporter-avatar'
  ].join(',');

  let modal;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'avatar-modal';
    modal.innerHTML = `
      <button class="avatar-modal-close" type="button" aria-label="Close">Close</button>
      <div class="avatar-modal-frame">
        <img class="avatar-modal-img" alt="">
        <div class="avatar-modal-name"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.closest('.avatar-modal-close')) closeAvatarModal();
    });
    return modal;
  }

  function openAvatarModal(img) {
    const lb = ensureModal();
    const modalImg = lb.querySelector('.avatar-modal-img');
    const name = lb.querySelector('.avatar-modal-name');
    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt || 'Player photo';
    name.textContent = img.alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAvatarModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const avatar = e.target.closest(avatarSelector);
    const img = avatar?.querySelector('img');
    if (!img) return;
    e.preventDefault();
    e.stopPropagation();
    openAvatarModal(img);
  }, true);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAvatarModal();
  });
})();
