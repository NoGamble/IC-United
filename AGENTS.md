# Repository Guidelines

## Project Structure & Module Organization

This repository is a static showcase site for IC United FC. Top-level HTML files define each page: `index.html`, `honors.html`, `players.html`, `gallery.html`, and `clubs.html`. Shared styles live in `css/styles.css`; page-specific styles live in matching files such as `css/home.css` and `css/players.css`. Shared browser behavior is in `js/main.js`, while page-specific scripts live in `js/honors.js`, `js/players.js`, `js/gallery.js`, and `js/clubs.js`. Content data is centralized in `js/data.js`; prefer updating that file instead of hard-coding repeated content into pages.

## Build, Test, and Development Commands

There is no build step or package manager manifest. The site can be served directly as static files.

- `python3 -m http.server 8000`: serve the repository at `http://localhost:8000`.
- `open http://localhost:8000/index.html`: preview the home page in a browser on macOS.
- `rg "TEAM|PLAYERS|HONORS" js`: quickly inspect shared data references.

Use a local server rather than opening files directly when testing relative paths, scripts, and browser behavior.

## Coding Style & Naming Conventions

Use two-space indentation for HTML, CSS, and JavaScript, matching the existing files. Keep semantic HTML sections clearly separated with short comments when the page is long. CSS class names use lowercase kebab-case with component-style prefixes, for example `nav-link`, `hero-photo`, and `player-card`. JavaScript uses `const`/`let`, camelCase variables, and small immediately invoked blocks for page behavior. Keep shared helpers in `js/main.js`; keep page-only logic in the corresponding page script.

## Testing Guidelines

No automated tests are configured. Before submitting changes, manually verify every affected page in desktop and mobile viewport widths. Check navigation state, burger menu behavior, scroll reveal animations, drawers/lightboxes, and any data-driven rendering. If changing motion or cursor behavior, also verify keyboard navigation and `prefers-reduced-motion` friendliness where relevant.

## Commit & Pull Request Guidelines

Git history is not available in this checkout, so use concise, conventional commit messages such as `feat: add player profile drawer` or `fix: correct gallery filter state`. Pull requests should include a short description, affected pages, manual test notes, and screenshots or screen recordings for visual changes. Link related issues when available and call out any content updates made in `js/data.js`.

## Security & Configuration Tips

Do not commit private student contact details or unpublished team media without permission. Keep external assets lightweight and reliable; document any new third-party dependency or remote asset source in the pull request.
