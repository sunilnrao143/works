# Build notes

The site is built. Open `index.html` in a browser, or serve the folder
(`python3 -m http.server`) — everything works from `file://` too, because the JS
uses classic scripts on a `window.SM` namespace rather than ES modules.

---

## The thing you should know first

**The nine `-candidate.png` cutouts are unusable, and the build does not use them.**

The manifest described them as RGBA transparent cutouts. They are RGB with solid
white backgrounds — no alpha channel at all — so on the `#050B10` page they would
each have rendered as a white rectangle. Measured blank coverage:

| File | Near-white | Verdict |
|---|---|---|
| `templecandidate.png` | 99.8% | empty |
| `cornerbottomrightcandidate.png` | 99.7% | empty |
| `cornertoprightcandidate.png` | 98.7% | empty |
| `cornertopleftcandidate.png` | 98.0% | empty |
| `rightsideornamentcandidate.png` | 98.0% | empty |
| `leftsideornamentcandidate.png` | 93.8% | near-empty, and the surviving marks are the baked-in "01 HERO MODULE" text |
| `herobottomornamentcandidate.png` | 69.5% | fragment only |
| `heroartistcandidate.png` | 46.5% | usable body, but the segmentation ate his hair and left a white hole where his head is |
| `aboutportraitcandidate.png` | 38.1% | the only broadly intact one |

White-keying them was not an option: the artwork is gold line art on white, so
any threshold that removes the background also removes the linework, and on the
hero artist it would punch a hole straight through his head.

**What I did instead**, which is what `docs/asset-extraction-guide.md` §6
recommends anyway:

- **Photography re-extracted** from the master crops, with a Gaussian-feathered
  alpha edge so each cutout dissolves into the dark background instead of ending
  on a hard rectangle. Every master also carried 12–17px of white padding, which
  is trimmed. An automated check asserts no near-white edges survive.
- **Decorative line art rebuilt as SVG** — mandala, wave divider, lotus, corner
  floral, diamond rule — so it scales and recolours from the palette.

The originals are left untouched in `assets/images/reference-crops/` for
comparison.

---

## Fixed from the previous build

1. **Three dead `url()` paths** in `css/style.css` pointed at `assets/extracted/`
   and `assets/raw/`, folders that don't exist. All decorative backgrounds are
   now real and resolve — a script checks all 379 references on every build.
2. **The mobile nav was unreachable.** Below 1000px `.navlinks` was hidden and
   the `MENU` button had no handler, so eight links simply vanished. There is now
   a real drawer with focus management, Escape-to-close and a resize guard.
3. **Social icons were bare `<img>` tags** — not links, and hidden entirely below
   700px. They are now anchors with `aria-label`, and they live in the drawer on
   mobile. Spotify was in the reference footer but missing from the icon set.
4. **Fonts were declared but never loaded.** Playfair Display and Inter now load
   with `preconnect` + `display=swap`. See `assets/fonts/README.md` to self-host.
5. **`.hero-mandala` was a `border-radius:50%` div.** Replaced by a traced SVG.
6. **Placeholder biography replaced with the real copy** — it was legible in the
   reference all along. Also corrected "the rich musical tradition" to "the rich
   **Mysore violin** tradition", which is what the reference actually says.
7. **The module gutter had no reserved space** outside About, so at ~1300px the
   `03`/`04` labels could overlap the content. Now a shared `--rail` token.
8. **Missing from the reference:** the Promo Video tab, both "View all" pill
   buttons, the wave divider and lotus, the nav active-dot, the filled-gold
   primary button, the four-icon footer, and the "Designed with ♡" colophon.
9. **Tours were a 3-column grid**; the reference is five cards in one row.
10. **Invented `#media` and `#gallery` sections** that aren't in the reference —
    removed; those nav links now go to real pages.

## Scaffolding that is now real

All 25 stubs are filled: 7 component fragments, 7 component stylesheets, 5 JS
files, 7 interior pages. CSS is split by component and loaded in cascade order
with `responsive.css` last.

## Quality floor

Keyboard focus rings, skip link, `prefers-reduced-motion` honoured throughout
(the particle canvas doesn't start at all), `width`/`height` on every image to
avoid layout shift, `loading="lazy"` below the fold, labelled form controls,
scroll-spy nav, and a print stylesheet. Particles pause when the hero scrolls out
of view or the tab is hidden.

---

## What still needs you

- **Tour dates are May–Aug 2024** — two years stale. Real dates needed.
- **Social and ticket links are `href="#"`.** Needs real URLs.
- **Newsletter has no endpoint.** It currently says so honestly rather than
  faking success. Wire it in `js/main.js`.
- **Interior pages have finished shells but no content** — each says what it's
  waiting for.
- **Photo credits and licensing** for the reference imagery.
- Consider AVIF/WebP with `<picture>` for the four photographic assets.
