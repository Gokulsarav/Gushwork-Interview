# Mangalam HDPE Pipes — Product Page
A single-page product landing site for Mangalam HDPE Pipes. Built as part of a frontend assignment to showcase a clean, responsive product page with interactive elements.

## What's in here
index.html    → all the markup, section by section
styles.css    → styling, responsive breakpoints, design tokens
script.js     → gallery, FAQ accordion, stepper, modals, etc.
assets/       → logos, icons, product images


## Sections breakdown
The page is split into these main blocks:
1. **Header** — logo + nav + CTA button. Goes sticky on scroll.
2. **Product hero** — badges (BIS, ISO, CE), feature list, price box, and a thumbnail gallery with prev/next navigation and hover-to-zoom.
3. **Tech specs** — dark-themed table showing diameter ranges, pressure ratings, SDR values, temperature range, certifications, etc.
4. **Features grid** — six cards covering chemical resistance, flexibility, leak-proof joints, cost savings, sustainability, and quality assurance.
5. **FAQ** — accordion style, only one item open at a time.
6. **Applications carousel** — horizontal scroll with nav buttons.
7. **Manufacturing process** — 8-step stepper. Content swaps dynamically (title, image, checklist) instead of rendering all steps at once.
8. **Testimonials** — client review cards.
9. **Portfolio** — related products/services (fittings, installation, PE-RT pipes).
10. **Resources** — downloadable PDFs section.
11. **Contact CTA + Footer** — quote form and full footer with links.

## Styling notes
CSS variables (`:root`) for colors, spacing, and transitions — makes it easy to tweak the palette later.
Fonts: **Urbanist** for headings, **Inter** for body text. Both from Google Fonts.
Full-width section backgrounds done with `::before` pseudo-elements so the content stays centered in a wrapper.
Media queries handle mobile, tablet, and wide screens. Nothing fancy, just practical breakpoints.

## How the JS works
**Gallery** — clicking thumbnails swaps the main image. Prev/next buttons cycle through. There's a mouse-tracking zoom on hover that maps cursor position to a scaled-up view of the image.

**FAQ** — exclusive accordion. Open one, the rest close. Toggles the chevron icon direction too.

**Manufacturing stepper** — data-driven. Instead of hardcoding 8 separate content blocks, it updates one container with the right title/image/checklist based on which step is active. Keeps the DOM light.

**Carousel** — the applications section scrolls horizontally with custom left/right buttons.

**Modals** — two popups (catalogue download + quote request). Click the backdrop to close. Pretty standard stuff.

**Sticky header** — adds a class when you scroll past the hero, changes the header appearance.

## Running it

Just open `index.html` in a browser. No build step, no dependencies, no server needed. It's plain HTML/CSS/JS.

## Things I'd add next
Form validation (right now the forms don't do anything)
Maybe pull the manufacturing steps data from a JSON file instead of keeping it in the JS
Scroll animations (AOS or something similar) to make section reveals feel smoother
