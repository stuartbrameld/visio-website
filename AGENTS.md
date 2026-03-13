# AGENTS.md

> Always keep `CLAUDE.md` and `AGENTS.md` in sync with the same contents.
> If you update `CLAUDE.md`, always update `AGENTS.md` with the same changes.

## Project

Marketing website and blog for **Visio.ai** — an AI co-pilot for store operations. Deployed as a static site.

GitHub repo: https://github.com/stuartbrameld/visio-website

## Build

Based on the first-party Astro blog starter template (`withastro/astro/examples/blog`), using Astro version 5.

## Tech Stack

- **Framework**: Astro 5 (static site generation)
- **Content**: Markdown + MDX via Astro Content Collections
- **Styling**: Vanilla CSS with CSS custom properties (no Tailwind, no CSS-in-JS)
- **Fonts**: Montserrat (headings) + Inter (body) via Google Fonts
- **Images**: Optimised with `astro:assets` and Sharp
- **Package manager**: pnpm (not npm)
- **Integrations**: `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`

## Astro Docs

All docs are available here:
- https://docs.astro.build/llms.txt
- https://docs.astro.build/llms-full.txt

You can also use the Astro Docs MCP server at https://mcp.docs.astro.build/mcp (use the `search_astro_docs` tool).

## Commands

```bash
pnpm dev       # Start dev server (port 4321)
pnpm build     # Production build
pnpm preview   # Preview production build
```

## Blogs

Blog posts go in `src/content/blog/`. Default to plain Markdown (`.md`) over `.mdx`.

Blog frontmatter fields:

```yaml
title: 'Precision Retail: The future is about maximizing your store''s full potential'
description: 'Precision Retail is a methodology focused on prioritizing resources and efforts to maximize ROI in physical stores, bringing the same level of control and learning speed that e-commerce has long enjoyed.'
author: 'Matheus Flores'
pubDate: 'Oct 15 2025'
heroImage: '../../assets/blog-placeholder-1.jpg'
```

- **Required**: `title`, `description`, `author`, `pubDate`, `heroImage` — all blog posts must include these fields or the build will fail (enforced by the Zod schema in `src/content.config.ts`).
- **Optional**: `updatedDate`
- Hero images should be placed in `src/assets/`

## Project Structure

```
src/
├── assets/              # Images processed by astro:assets
├── components/          # Reusable .astro components
│   ├── BaseHead.astro   # <head> content (meta, fonts, SEO)
│   ├── Header.astro     # Site header with navigation
│   ├── Footer.astro     # Site footer
│   ├── HeaderLink.astro # Nav link with active state detection
│   └── FormattedDate.astro
├── content/
│   └── blog/            # Markdown/MDX blog posts
├── layouts/
│   └── BlogPost.astro   # Blog post page layout
├── pages/
│   ├── index.astro      # Marketing landing page
│   ├── about.astro      # About page
│   ├── blog/
│   │   ├── index.astro  # Blog listing
│   │   └── [...slug].astro
│   └── rss.xml.js       # RSS feed
├── styles/
│   └── global.css       # Global styles, CSS variables, design tokens
├── consts.ts            # Site-wide constants (title, description)
└── content.config.ts    # Content collection schemas
public/
├── logo.svg             # Dark logo (for light backgrounds)
├── logo-white.svg       # White logo (for dark backgrounds)
├── favicon.svg
└── fonts/
```

## Design System & Brand

### Colours

The brand uses a teal/turquoise palette with blue-to-green gradient accents. All colours are defined as CSS custom properties in `global.css`:

- **Primary accent**: `--teal-400` (#1fc0a2) through `--teal-700` (#146770)
- **Gradient**: `--gradient-start` (#1fc0a2) → `--gradient-mid` (#20bccc) → `--gradient-end` (#146770)
- **Logo gradient**: #00A5DB (blue) → #71C27D (green) — do not change these
- **Neutrals**: `--gray-50` through `--gray-900`
- **Semantic tokens**: `--color-accent`, `--color-text`, `--color-bg`, etc.
- **Brand & design system**: For brand guidelines, visual identity, and positioning, see https://github.com/Visio-ai/arch-design-system/tree/master/domains
- **Design direction**: Matheus (CEO) wants a more premium feel — prioritise refinement, generous whitespace, and polished details over flashy effects

### Typography

- **Headings**: `var(--font-display)` — Montserrat, weights 400–800
- **Body**: `var(--font-body)` — Inter, weights 400–600
- Headings use `letter-spacing: -0.02em` and tight line-height (1.15)

### Spacing & Layout

- Use spacing variables: `--space-xs` through `--space-5xl`
- Max content width: `--max-width` (1200px), narrow: `--max-width-narrow` (720px)
- Use the `.container` class for page-width content
- Border radius: `--radius-sm` through `--radius-xl`

### Components

- Buttons: `.btn`, `.btn--primary`, `.btn--secondary`
- Section labels: small uppercase teal text above section headings
- Feature cards: white cards with border, rounded corners, hover lift effect
- Animations: `.animate-in` with delay variants for staggered reveals

## Conventions

### Astro Components

- Use `.astro` files for all components and pages (no React/Vue/Svelte)
- Use scoped `<style>` blocks in components — avoid global styles outside `global.css`
- Use `:global()` selector when styling slotted/child component elements
- Import images through `astro:assets` for optimisation, not from `public/`
- Use `<Image>` component from `astro:assets` for responsive images

### CSS

- No Tailwind — use vanilla CSS with custom properties
- Define new design tokens in `global.css` `:root` if needed
- Use existing spacing/colour/radius variables rather than hardcoded values
- Mobile breakpoint: `768px`

### Logos

- Header (light background): `/logo.svg` — dark text with gradient accents
- Footer (dark background): `/logo-white.svg` — white text with gradient accents
- Do not recreate or modify the logo SVGs

## Do's

- Use CSS custom properties from the design system
- Keep components in `src/components/`
- Use Astro's built-in image optimisation
- Write semantic HTML with proper heading hierarchy
- Test responsive layouts at mobile (375px) and desktop (1280px)
- Use the `.container` wrapper for page content

## Don'ts

- Don't install Tailwind or other CSS frameworks
- Don't add React/Vue/Svelte unless there's a clear need for client-side interactivity
- Don't hardcode colour values — use CSS variables
- Don't put optimisable images in `public/` — use `src/assets/`
- Don't modify the logo SVG files
- Don't change the Google Fonts imports without approval
