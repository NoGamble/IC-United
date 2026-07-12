# Club Crest Assets

Place original club crest images in this folder using the lowercase club id as the filename.

Supported names:

- `rm.png`, `rm.jpg`, `rm.jpeg`, or `rm.webp`
- `bar.png`, `bar.jpg`, `bar.jpeg`, or `bar.webp`
- `mci.png`, `bay.png`, `liv.png`, `psg.png`, `ars.png`, `acm.png`, `juv.png`, `atl.png`

Processed transparent files are generated into `clean/` as normalized PNGs, for example `clean/rm.png`.

The Fan Wall loads `clean/{club-id}.png` first, then falls back to the original files. The cleaned files remove edge-connected white backgrounds, preserve interior white parts of the crest, remove small isolated artifacts, crop the crest, and scale it into a consistent transparent canvas so logos display at similar visual sizes.
