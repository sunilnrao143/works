# Asset Extraction & Integration Guide

## 1. Source
The supplied AI-generated reference is a single flattened 1024x1536 image. The original internal layers are not recoverable from the JPEG. This package therefore separates what can be safely cropped/segmented from what should be rebuilt as HTML/CSS/SVG.

## 2. Production rule
Never use the complete screenshot as the live homepage. Use it only as a visual reference.

## 3. Asset strategy
- Photography: WebP/AVIF, responsive sizes.
- Transparent decorative artwork: SVG where it can be traced cleanly; otherwise lossless WebP/PNG.
- Icons: SVG.
- Text/UI: HTML/CSS.
- Section borders/dividers: SVG/CSS.
- Hero artist and temple: transparent cutout candidates are supplied. Refine edges before production.

## 4. Responsive strategy
Desktop, tablet and mobile should be art-directed separately. Use picture/srcset for photos and object-position for crops. Do not scale the entire reference image down as one background.

## 5. Fidelity checklist
- Header logo scale and baseline
- Nav spacing and active underline
- Hero headline line breaks
- Artist/mandala overlap
- Temple scale and vertical anchor
- Gold particle density
- Curved section divider
- About portrait frame shape
- Trait panel spacing
- Music card dimensions and gaps
- Tour card widths and date hierarchy
- Tour photograph crop
- Footer columns and ornament
- Gold palette and border opacity
- Typography tracking
- Mobile stacking and horizontal card scrolling

## 6. Recommended next refinement
Refine hero-artist-candidate.png, temple-candidate.png and about-portrait-candidate.png using a dedicated segmentation/background-removal pass. Then trace the mandala, portrait frame and corner ornaments into clean SVGs.
