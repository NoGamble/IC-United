/* ============================================================
   IC UNITED FC — Players Page Logic
   ============================================================ */

(function () {
  const grid     = document.getElementById('playersGrid');
  const filter   = document.getElementById('playersFilter');
  const countEl  = document.getElementById('playersCount');
  const drawer   = document.getElementById('playerDrawer');
  const overlay  = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');
  const body     = document.getElementById('drawerBody');

  renderSquadSnapshot();

  /* ---- Build grade filter buttons ---- */
  const grades = [...new Set(PLAYERS.map(p => p.grade))].sort((a, b) => a - b);
  grades.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.grade = g;
    btn.textContent = g + '级';
    btn.setAttribute('role', 'tab');
    filter.appendChild(btn);
  });

  /* ---- Render all cards ---- */
  PLAYERS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.grade = p.grade;
    card.dataset.id    = p.id;
    card.id = `player-card-${p.id}`;
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-reveal-delay', String((i % 5) + 1));

    const initials  = p.nameEn.charAt(0).toUpperCase();
    const photoSrc  = IMAGE_CONFIG.players[p.id] || '';
    const avatarContent = photoSrc
      ? `<img src="${photoSrc}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : initials;
    card.innerHTML = `
      <div class="player-card-avatar">
        ${avatarContent}
        <div class="player-card-number">${p.number}</div>
      </div>
      <div class="player-card-pos">${POSITION_LABELS[p.position] || p.position}</div>
      <div class="player-card-name">${p.name}</div>
      <div class="player-card-grade">${p.grade}级</div>
      <div class="player-card-stats">
        <div class="player-card-stat">
          <div class="player-card-stat-val">${p.goals}</div>
          <div class="player-card-stat-label">进球</div>
        </div>
        <div class="player-card-stat">
          <div class="player-card-stat-val">${p.assists}</div>
          <div class="player-card-stat-label">助攻</div>
        </div>
        <div class="player-card-stat">
          <div class="player-card-stat-val">${p.appearances}</div>
          <div class="player-card-stat-label">出场</div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openPlayer(p));
    grid.appendChild(card);
  });

  /* ---- Re-run reveal ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  updateCount();

  function renderSquadSnapshot() {
    const totalEl = document.getElementById('squadTotal');
    const rangeEl = document.getElementById('squadRange');
    const shapeEl = document.getElementById('squadShape');
    const barsEl  = document.getElementById('squadPositionBars');
    if (!totalEl || !rangeEl || !shapeEl || !barsEl) return;

    const grades = PLAYERS.map(p => p.grade).filter(Boolean);
    const minGrade = Math.min(...grades);
    const maxGrade = Math.max(...grades);
    const groups = [
      { key: 'GK', label: 'GK', match: ['GK'] },
      { key: 'DF', label: 'DF', match: ['CB', 'LB', 'RB'] },
      { key: 'MF', label: 'MF', match: ['CDM', 'CM', 'CAM'] },
      { key: 'FW', label: 'FW', match: ['LW', 'RW', 'ST'] },
    ].map(group => ({
      ...group,
      count: PLAYERS.filter(p => group.match.includes(p.position)).length
    }));
    const maxCount = Math.max(...groups.map(g => g.count), 1);

    totalEl.textContent = PLAYERS.length;
    rangeEl.textContent = `${minGrade}–${maxGrade}`;
    shapeEl.textContent = groups.map(g => `${g.label}${g.count}`).join(' / ');
    barsEl.innerHTML = groups.map(g => `
      <div class="squad-position-row">
        <div class="squad-position-name">${g.label}</div>
        <div class="squad-position-track">
          <div class="squad-position-fill" style="transform:scaleX(${g.count / maxCount})"></div>
        </div>
        <div class="squad-position-count">${g.count}</div>
      </div>
    `).join('');
  }

  /* ---- Grade filter ---- */
  filter.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const grade = btn.dataset.grade;
    document.querySelectorAll('.player-card').forEach(card => {
      if (grade === 'all' || card.dataset.grade === grade) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    updateCount(grade);
  });

  function updateCount(grade) {
    const total = grade && grade !== 'all'
      ? PLAYERS.filter(p => String(p.grade) === String(grade)).length
      : PLAYERS.length;
    countEl.textContent = `${total} Players`;
  }

  /* ---- Drawer ---- */
  function openPlayer(p) {
    const club = CLUBS.find(c => c.id === p.clubId);
    const photoSrc = IMAGE_CONFIG.players[p.id] || '';
    const drawerAvatarContent = photoSrc
      ? `<img src="${photoSrc}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : p.nameEn.charAt(0);
    body.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-avatar">${drawerAvatarContent}</div>
        <div>
          <div class="drawer-info-pos">${POSITION_LABELS[p.position] || p.position}</div>
          <div class="drawer-info-name">#${p.number} ${p.name}</div>
          <div class="drawer-info-meta">${p.grade}级 · ${p.nameEn}</div>
        </div>
      </div>

      <div class="drawer-stats-grid">
        <div class="drawer-stat"><div class="drawer-stat-val">${p.goals}</div><div class="drawer-stat-label">进球</div></div>
        <div class="drawer-stat"><div class="drawer-stat-val">${p.assists}</div><div class="drawer-stat-label">助攻</div></div>
        <div class="drawer-stat"><div class="drawer-stat-val">${p.appearances}</div><div class="drawer-stat-label">出场</div></div>
      </div>

      <div class="drawer-section-label">Player Info</div>
      <div class="drawer-detail-row"><span class="drawer-detail-key">Position</span><span class="drawer-detail-val">${POSITION_LABELS[p.position]}</span></div>
      <div class="drawer-detail-row"><span class="drawer-detail-key">Height</span><span class="drawer-detail-val">${p.height}</span></div>
      <div class="drawer-detail-row"><span class="drawer-detail-key">Hometown</span><span class="drawer-detail-val">${p.hometown}</span></div>
      <div class="drawer-detail-row">
        <span class="drawer-detail-key">Favourite Club</span>
        <span class="drawer-club-badge">
          ${club ? `<span class="drawer-club-dot" style="background:${club.color}"></span>` : ''}
          ${p.favoriteClub}
        </span>
      </div>

      <div class="drawer-section-label">Bio</div>
      <p class="drawer-bio">${p.bio}</p>
    `;
    openDrawer(drawer, overlay);
  }

  closeBtn.addEventListener('click', () => closeDrawer(drawer, overlay));
  overlay.addEventListener('click', () => closeDrawer(drawer, overlay));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(drawer, overlay); });

  /* ---- Handle anchor link from honors page ---- */
  const hash = location.hash;
  if (hash && hash.startsWith('#player-')) {
    const id = parseInt(hash.replace('#player-', ''));
    const p  = PLAYERS.find(pl => pl.id === id);
    if (p) {
      setTimeout(() => {
        const card = document.getElementById(`player-card-${id}`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        openPlayer(p);
      }, 400);
    }
  }
})();
