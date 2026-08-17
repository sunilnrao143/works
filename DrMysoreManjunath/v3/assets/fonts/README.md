# Fonts

The build loads **Playfair Display** (display serif) and **Inter** (UI sans) from
Google Fonts via a `<link>` in each page's `<head>`. Both are SIL Open Font
License 1.1, so self-hosting is permitted.

To self-host — recommended for production, and required if the site must work
offline or without third-party requests:

1. Download both families and drop the `.woff2` files in this folder.
2. Add `@font-face` blocks to `css/style.css` with `font-display:swap`.
3. Delete the three Google Fonts `<link>` tags from every `.html` file.

Until then the site degrades to Georgia / system-ui, which is why
`--serif` and `--sans` both carry full fallback stacks.
