# Sumanth Manjunath — website

Static site, no build step. Open `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

**Read `BUILD-NOTES.md` first** — it explains why the `-candidate.png` files are
not used and what still needs real content.

## Layout

| Folder | Contents |
|---|---|
| `reference/` | `original-template.jpg` — the visual source of truth |
| `assets/images/` | production photography (re-extracted, feathered alpha) |
| `assets/images/reference-crops/` | untouched context crops, reference only |
| `assets/svg/decorative/` | mandala, wave, lotus, corner floral, rules |
| `assets/svg/icons/` | 18 UI icons |
| `components/` | HTML fragments, kept in sync with `index.html` |
| `css/` | `style.css` (tokens + base) then `components/*.css` |
| `js/` | `main.js` boots the four `js/modules/` behaviours |
| `pages/` | seven interior pages, shells complete |
| `docs/` | asset inventory, asset map, design system, palette |

## Conventions

- CSS loads base-first, `responsive.css` last. Component files own their own
  selectors; shared tokens live in `:root` in `style.css`.
- JS uses classic scripts on `window.SM` so the site runs from `file://`.
  Each module is independent and fails soft.
- Every colour comes from a custom property. Don't hard-code hex outside `:root`.
- Text stays HTML. Never flatten a section into an image.
