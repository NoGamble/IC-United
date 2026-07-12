/* ============================================================
   IC UNITED FC — Honors Page Logic
   ============================================================ */

(function () {
  const yearNav  = document.getElementById('honorsYears');
  const list     = document.getElementById('honorsList');

  /* ---- Collect unique years ---- */
  const years = [...new Set(HONORS.map(h => h.year))].sort((a, b) => b - a);
  renderHonorsSnapshot();

  /* ---- Render year buttons ---- */
  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'honors-year-btn';
    btn.textContent = y;
    btn.dataset.year = y;
    btn.addEventListener('click', () => scrollToYear(y));
    yearNav.appendChild(btn);
  });

  function renderHonorsSnapshot() {
    const yearEl = document.getElementById('honorsSnapshotYear');
    const titleEl = document.getElementById('honorsSnapshotTitle');
    const totalEl = document.getElementById('honorsSnapshotTotal');
    const recordEl = document.getElementById('honorsSnapshotRecord');
    if (!yearEl || !titleEl || !totalEl || !recordEl || !HONORS.length) return;

    const latest = [...HONORS].sort((a, b) => Number(b.year) - Number(a.year))[0];
    yearEl.textContent = latest.year;
    titleEl.textContent = latest.title;
    totalEl.textContent = HONORS.length;
    recordEl.textContent = `${latest.stats.wins}W / ${latest.stats.goals}GF`;
  }

  /* ---- Render honor cards ---- */
  let activeId = null;

  HONORS.forEach((h, i) => {
    /* Card */
    const card = document.createElement('div');
    card.className = 'honor-card';
    card.setAttribute('data-rank', h.rank);
    card.setAttribute('data-year', h.year);
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-reveal-delay', String((i % 4) + 1));
    card.innerHTML = `
      <div class="honor-card-trophy">${h.trophy}</div>
      <div class="honor-card-main">
        <div class="honor-card-year">${h.year}</div>
        <div class="honor-card-title">${h.title}</div>
        <div class="honor-card-comp">${h.competition}</div>
      </div>
      <div class="honor-card-toggle">+</div>
    `;

    /* Detail panel */
    const detail = document.createElement('div');
    detail.className = 'honor-detail';
    detail.id = 'detail-' + h.id;
    detail.innerHTML = buildDetail(h);

    card.addEventListener('click', () => toggleDetail(h.id, card, detail));

    list.appendChild(card);
    list.appendChild(detail);
  });

  /* ---- Re-run reveal observer for dynamically added elements ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  /* ---- Toggle detail ---- */
  function toggleDetail(id, card, detail) {
    const isOpen = detail.classList.contains('open');

    /* Close all */
    document.querySelectorAll('.honor-card.expanded').forEach(c => c.classList.remove('expanded'));
    document.querySelectorAll('.honor-detail.open').forEach(d => d.classList.remove('open'));

    if (!isOpen) {
      card.classList.add('expanded');
      detail.classList.add('open');
      activeId = id;
    } else {
      activeId = null;
    }
  }

  /* ---- Build detail HTML ---- */
  function buildDetail(h) {
    const players = h.playerIds.map(id => PLAYERS.find(p => p.id === id)).filter(Boolean);
    const scorer  = PLAYERS.find(p => p.id === h.topScorer?.playerId);
    const assister = PLAYERS.find(p => p.id === h.topAssister?.playerId);

    const playerRows = players.map(p => `
      <div class="honor-player-row" data-player-id="${p.id}">
        <div class="honor-player-avatar">${getPlayerAvatarContent(p)}</div>
        <div class="honor-player-info">
          <div class="honor-player-name">${p.name}</div>
          <div class="honor-player-pos">${POSITION_LABELS[p.position] || p.position}</div>
        </div>
        <div class="honor-player-num">#${p.number}</div>
      </div>
    `).join('');

    return `
      <div class="honor-detail-inner">
        <div>
          <div class="honor-players-label">Match Stats</div>
          <div class="honor-stats-grid">
            <div class="honor-stat"><div class="honor-stat-val">${h.stats.matches}</div><div class="honor-stat-label">Matches</div></div>
            <div class="honor-stat"><div class="honor-stat-val">${h.stats.wins}</div><div class="honor-stat-label">Wins</div></div>
            <div class="honor-stat"><div class="honor-stat-val">${h.stats.goals}</div><div class="honor-stat-label">Goals</div></div>
            <div class="honor-stat"><div class="honor-stat-val">${h.stats.goalsAgainst}</div><div class="honor-stat-label">Conceded</div></div>
          </div>

          <div class="honor-performers">
            ${scorer ? `
            <div class="honor-performer">
              <div class="honor-performer-role">Top Scorer</div>
              <div class="honor-performer-name">${scorer.name}</div>
              <div class="honor-performer-stat">${h.topScorer.goals} G</div>
            </div>` : ''}
            ${assister ? `
            <div class="honor-performer">
              <div class="honor-performer-role">Top Assister</div>
              <div class="honor-performer-name">${assister.name}</div>
              <div class="honor-performer-stat">${h.topAssister.assists} A</div>
            </div>` : ''}
          </div>
        </div>

        <div>
          <div class="honor-players-label">Squad (${players.length} players)</div>
          <div class="honor-player-list">${playerRows}</div>
        </div>
      </div>
    `;
  }

  /* ---- Scroll to year ---- */
  function scrollToYear(year) {
    const firstCard = document.querySelector(`.honor-card[data-year="${year}"]`);
    if (!firstCard) return;
    firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.querySelectorAll('.honors-year-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.year === year)
    );
  }

  /* ---- Update active year on scroll ---- */
  const yearBtns = document.querySelectorAll('.honors-year-btn');
  const allCards = document.querySelectorAll('.honor-card');

  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const year = e.target.dataset.year;
        yearBtns.forEach(b => b.classList.toggle('active', b.dataset.year === year));
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  allCards.forEach(c => scrollObserver.observe(c));

  /* ---- Link player rows to players page ---- */
  document.addEventListener('click', e => {
    const row = e.target.closest('[data-player-id]');
    if (row) {
      window.location.href = `players.html#player-${row.dataset.playerId}`;
    }
  });
})();
