<h1 align="center">IC United FC</h1>

<p align="center">
  A modern static website for the <strong>Integrated Circuit College football team</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-Static_Site-E34F26?logo=html5&logoColor=white" alt="Static HTML">
  <img src="https://img.shields.io/badge/CSS-Responsive_UI-1572B6?logo=css3&logoColor=white" alt="Responsive CSS">
  <img src="https://img.shields.io/badge/JavaScript-Data_Driven-F7DF1E?logo=javascript&logoColor=111" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/Build-None-2E3440" alt="No build step">
</p>

---

IC United FC presents the team identity, honors, squad profiles, match gallery, and Fan Wall in a lightweight HTML/CSS/JavaScript site.

```txt
Live: https://icunited.top
Backup: https://ic-united.uestc520.workers.dev/
```

## ✦ Highlights

- Full static site: no framework, no build step, no npm dependency.
- Five focused pages: Home, Honors, Players, Gallery, and Clubs.
- Data-driven content through `js/data.js`.
- Player profile drawers, avatar zoom, gallery lightbox, and Fan Wall club crests.
- Local image assets for player portraits, gallery moments, college emblem, favicon, and club logos.

## ▸ Quick Start

```bash
cd /Users/tonali/Projects/IC-United
python3 -m http.server 8000
```

Open:

```txt
http://127.0.0.1:8000/index.html
```

Use `127.0.0.1` for local preview. If you need to test on a phone in the same Wi-Fi network, start with:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Then visit the computer's LAN IP from the phone.

## ◈ Site Map

| Page | Purpose |
| --- | --- |
| `index.html` | Hero, identity, latest honor, navigation cards, and ticker |
| `honors.html` | Competition results, match stats, squads, scorers, and assisters |
| `players.html` | Player cards, grade filters, profile drawers, and avatar zoom |
| `gallery.html` | Match/training photos with filters and lightbox preview |
| `clubs.html` | Fan Wall grouped by league and favorite club |

## ◇ Project Structure

```txt
.
├── index.html / honors.html / players.html / gallery.html / clubs.html
├── css/
│   ├── styles.css      # Shared layout, nav, drawer, lightbox, modal
│   ├── home.css        # Home page
│   ├── honors.css      # Honors page
│   ├── players.css     # Players page
│   ├── gallery.css     # Gallery page
│   └── clubs.css       # Fan Wall page
├── js/
│   ├── data.js         # Team content, player data, honors, clubs, gallery
│   ├── main.js         # Shared interactions
│   └── *.js            # Page-specific rendering logic
└── assets/
    ├── icons/          # Emblem, favicon, club crests
    └── images/         # Player portraits and gallery images
```

## ◆ Content Updates

Most site content lives in `js/data.js`.

| Data Block | What It Controls |
| --- | --- |
| `TEAM` | Team name, slogan, years, and metadata |
| `PLAYERS` | Player profile, number, grade, stats, position, and favorite club |
| `HONORS` | Trophies, match records, squads, top scorer, and top assister |
| `CLUBS` | Fan Wall club metadata and colors |
| `GALLERY` | Gallery items, categories, dates, and image IDs |
| `IMAGE_CONFIG` | Local image path mapping |

When adding a player:

1. Add the player object to `PLAYERS`.
2. Place the portrait in `assets/images/players/`.
3. Register the path in `IMAGE_CONFIG.players`.

```js
17: 'assets/images/players/17.jpg'
```

## ◎ Asset Rules

```txt
Player portraits:     assets/images/players/{player-id}.jpg
Gallery images:       assets/images/gallery/{gallery-id}.jpg
Raw club crests:      assets/icons/clubs/{club-id}.png|jpg|jpeg|webp
Clean club crests:    assets/icons/clubs/clean/{club-id}.png
College emblem:       assets/icons/emblem.png
Favicon:              assets/icons/favicon.png
```

Fan Wall loads transparent crests from `assets/icons/clubs/clean/` first. Keep club logos centered and visually similar in size.

## △ Deployment

Recommended Cloudflare Pages settings:

```txt
Framework preset: None / Static HTML
Build command: exit 0
Build output directory: /
Root directory: /
```

Because this is a static site, it can also run on GitHub Pages, Netlify, Vercel, a school server, or any basic static hosting service.

## ✓ Maintenance Checklist

- After editing `js/data.js`, check all five pages.
- After editing `css/styles.css`, check desktop and mobile navigation.
- After replacing images, hard refresh the browser or bump the relevant `?v=` resource version.
- Do not commit private student information or unauthorized photos.
- Keep `README.md` and `assets/icons/clubs/README.md` updated when asset rules change.
