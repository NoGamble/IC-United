# IC United FC

Static showcase website for IC United FC, the football team of the Integrated Circuit College. The site presents the team identity, honors, players, gallery, and Fan Wall for teammates, classmates, and visitors.

Live site:

```txt
https://icunited.top
```

## Pages

- `index.html`: Home page with hero section, honors ticker, latest honor, and page navigation.
- `honors.html`: Honors page with competition results, squads, top scorers, and top assisters.
- `players.html`: Player roster grouped by grade, with profile drawers and avatar zoom.
- `gallery.html`: Gallery page with category filters and lightbox viewing.
- `clubs.html`: Fan Wall showing players' favorite clubs, league groups, supporters, and club crests.

## Project Structure

```txt
.
├── index.html
├── honors.html
├── players.html
├── gallery.html
├── clubs.html
├── css/
│   ├── styles.css      # Shared site styles
│   ├── home.css
│   ├── honors.css
│   ├── players.css
│   ├── gallery.css
│   └── clubs.css
├── js/
│   ├── data.js         # Team, player, honor, gallery, and club data
│   ├── main.js         # Shared interactions
│   ├── honors.js
│   ├── players.js
│   ├── gallery.js
│   └── clubs.js
└── assets/
    ├── icons/
    │   ├── emblem.png
    │   ├── favicon.png
    │   └── clubs/
    └── images/
        ├── players/
        └── gallery/
```

## Local Preview

This is a static site with no build step and no npm dependency.

```bash
cd /Users/tonali/Projects/IC-United
python3 -m http.server 8000
```

Then open:

```txt
http://localhost:8000/index.html
```

## Content Editing

Most content is maintained in `js/data.js`:

- `TEAM`: basic team information
- `PLAYERS`: player profiles and stats
- `HONORS`: competition results and match data
- `CLUBS`: Fan Wall club metadata
- `GALLERY`: gallery item metadata
- `IMAGE_CONFIG`: image path mapping

When adding a player:

1. Add the player object to `PLAYERS`.
2. Put the avatar in `assets/images/players/`.
3. Add the image path to `IMAGE_CONFIG.players`.

Example:

```js
17: 'assets/images/players/17.jpg'
```

## Image Rules

Player avatars:

```txt
assets/images/players/{player-id}.jpg
```

Gallery images:

```txt
assets/images/gallery/{gallery-id}.jpg
```

Original club crests:

```txt
assets/icons/clubs/{club-id}.png
assets/icons/clubs/{club-id}.jpg
assets/icons/clubs/{club-id}.jpeg
assets/icons/clubs/{club-id}.webp
```

Processed transparent club crests:

```txt
assets/icons/clubs/clean/{club-id}.png
```

The Fan Wall loads the processed transparent PNG from `clean/` first. Current club crests have been cleaned, cropped, centered, and normalized for consistent visual size.

## Features

- Custom cursor
- Responsive mobile navigation
- Scroll reveal animations
- Player profile drawer
- Avatar zoom modal
- Gallery lightbox
- Fan Wall card flip interaction
- Header snapshot panels for roster, honors, and clubs
- Local favicon generated from the college emblem

## Deployment

The site is currently deployed at:

```txt
https://ic-united.uestc520.workers.dev/
```

Recommended Cloudflare Pages settings:

```txt
Framework preset: None / Static HTML
Build command: exit 0
Build output directory: /
Root directory: /
```

Because this is a static site, it can also be deployed to GitHub Pages, Netlify, Vercel, or a school-hosted server.

For Mainland China visitors, the default `workers.dev` or `pages.dev` domain may be unreliable. For a public launch, consider using a custom domain or a Mainland-friendly mirror hosted through a school server or domestic CDN.

## Maintenance Notes

- Do not commit private student information or unauthorized photos.
- After editing `css/styles.css`, check all pages.
- After editing `js/data.js`, check Home, Honors, Players, Gallery, and Fan Wall.
- If an updated image does not appear, hard refresh the browser or increase the resource version query in the relevant HTML file.
