# Claude Code Brief

Use `reference/original-template.jpg` as the visual source of truth.

Before changing code:
1. Inspect the whole project.
2. Read docs/asset-inventory.json and docs/design-system.md.
3. Inspect all supplied crops.
4. Identify any visual mismatch or missing asset.
5. Plan before implementation.

Do not flatten the design into a screenshot.
Do not convert text into images.
Do not invent a new visual style.

Reconstruct:
- header
- hero
- about
- statistics
- traits panel
- music carousel
- tours
- footer

After each major implementation:
- render the page
- compare it with the reference
- correct spacing, proportions, typography and image cropping
- check desktop and mobile
- keep decorative elements subtle.

When an asset is labelled `candidate`, treat it as a provisional extraction that may need edge cleanup.
