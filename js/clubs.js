/* ============================================================
   IC UNITED FC — Clubs / Fan Wall Logic
   ============================================================ */

(function () {
  const tabsEl   = document.getElementById('leagueTabs');
  const panelsEl = document.getElementById('leaguePanels');
  const CLUB_LOGO_VERSION = '2';

  function getClubLogoCandidates(club) {
    if (club.logo) return [club.logo];
    const id = club.id.toLowerCase();
    const base = `assets/icons/clubs/${id}`;
    return [`assets/icons/clubs/clean/${id}.png`, `${base}.png`, `${base}.jpg`, `${base}.jpeg`, `${base}.webp`]
      .map(path => `${path}?v=${CLUB_LOGO_VERSION}`);
  }

  function buildClubCrest(club, modifier = '') {
    return `
      <div class="club-crest ${modifier}" style="--club-color:${club.color};--club-secondary:${club.secondary}">
        <img class="club-logo-img" data-logo-candidates="${getClubLogoCandidates(club).join('|')}" alt="${club.name} crest">
        <span>${club.abbr}</span>
      </div>
    `;
  }

  function initClubLogos() {
    document.querySelectorAll('.club-logo-img').forEach(img => loadClubLogo(img, 0));
  }

  function loadClubLogo(img, index) {
    const candidates = (img.dataset.logoCandidates || '').split('|').filter(Boolean);
    if (index >= candidates.length) return;

    img.onload = () => {
      img.classList.add('loaded');
      img.closest('.club-crest')?.classList.add('has-logo');
    };
    img.onerror = () => loadClubLogo(img, index + 1);
    img.src = candidates[index];
  }

  renderFanwallSnapshot();

  /* ---- Build league tabs ---- */
  LEAGUES.forEach((league, i) => {
    const tab = document.createElement('button');
    tab.className = 'league-tab' + (i === 0 ? ' active' : '');
    tab.textContent = league;
    tab.dataset.league = league;
    tab.addEventListener('click', () => activateLeague(league));
    tabsEl.appendChild(tab);
  });

  function renderFanwallSnapshot() {
    const clubTotalEl = document.getElementById('fanwallClubTotal');
    const leagueTotalEl = document.getElementById('fanwallLeagueTotal');
    const supporterTotalEl = document.getElementById('fanwallSupporterTotal');
    const leagueListEl = document.getElementById('fanwallLeagueList');
    if (!clubTotalEl || !leagueTotalEl || !supporterTotalEl || !leagueListEl) return;

    const supporterCount = PLAYERS.filter(p => p.clubId).length;
    clubTotalEl.textContent = CLUBS.length;
    leagueTotalEl.textContent = LEAGUES.length;
    supporterTotalEl.textContent = supporterCount;
    leagueListEl.innerHTML = LEAGUES.map(league => {
      const count = CLUBS.filter(c => c.league === league).length;
      return `
        <div class="fanwall-league-row">
          <div class="fanwall-league-name">${league}</div>
          <div class="fanwall-league-count">${count}</div>
        </div>
      `;
    }).join('');
  }

  /* ---- Build panels ---- */
  LEAGUES.forEach((league, i) => {
    const panel = document.createElement('div');
    panel.className = 'league-panel' + (i === 0 ? ' active' : '');
    panel.dataset.league = league;

    const clubs = CLUBS.filter(c => c.league === league);
    const grid  = document.createElement('div');
    grid.className = 'clubs-grid';

    clubs.forEach(club => {
      const supporters = PLAYERS.filter(p => p.clubId === club.id);

      const avatarHtml = supporters.slice(0, 5).map(p => `
        <div class="mini-avatar" title="${p.name}">${getPlayerAvatarContent(p)}</div>
      `).join('');

      const supporterRows = supporters.length
        ? supporters.map(p => `
          <a href="players.html#player-${p.id}" class="club-supporter-row">
            <div class="club-supporter-avatar">${getPlayerAvatarContent(p)}</div>
            <div class="club-supporter-name">${p.name}</div>
            <div class="club-supporter-pos">${POSITION_LABELS[p.position] || p.position}</div>
          </a>
        `).join('')
        : '<div style="color:var(--gray-dark);font-size:0.8rem;padding:0.5rem 0">暂无队员支持该俱乐部</div>';

      const wrap = document.createElement('div');
      wrap.className = 'club-card-wrap';
      wrap.innerHTML = `
        <div class="club-card">
          <div class="club-card-front" style="background: linear-gradient(135deg, ${club.color}22 0%, var(--navy-mid) 60%)">
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,${club.color}18,transparent 70%);border-radius:var(--r-lg)"></div>
            ${buildClubCrest(club, 'club-crest--front')}
            <div class="club-card-name">${club.name}</div>
            <div class="club-card-league">${club.league}</div>
            <div class="club-card-avatars">${avatarHtml}</div>
            <div class="club-card-count"><strong>${supporters.length}</strong> supporter${supporters.length !== 1 ? 's' : ''}</div>
            <div class="club-card-hint">Hover to flip</div>
          </div>
          <div class="club-card-back" style="border-top: 3px solid ${club.color}">
            <div class="club-card-back-heading">
              ${buildClubCrest(club, 'club-crest--small')}
              <div class="club-card-back-title">${club.name}</div>
            </div>
            <div class="club-card-back-league" style="color:${club.color}">${club.league}</div>
            <div class="club-back-label">IC United Supporters</div>
            <div class="club-supporters-list">${supporterRows}</div>
          </div>
        </div>
      `;
      grid.appendChild(wrap);
    });

    if (clubs.length === 0) {
      grid.innerHTML = `<p style="color:var(--gray-dark);font-size:0.9rem">本联赛暂无球队数据。</p>`;
    }

    panel.appendChild(grid);
    panelsEl.appendChild(panel);
  });

  initClubLogos();

  /* ---- Activate league ---- */
  function activateLeague(league) {
    tabsEl.querySelectorAll('.league-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.league === league)
    );
    panelsEl.querySelectorAll('.league-panel').forEach(p =>
      p.classList.toggle('active', p.dataset.league === league)
    );
  }
})();
