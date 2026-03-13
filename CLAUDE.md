# CLAUDE.md

> Always keep `CLAUDE.md` and `AGENTS.md` in sync with the same contents.
> If you update `CLAUDE.md`, always update `AGENTS.md` with the same changes.

## Project

Marketing website and news section for **Visio.ai** — an AI co-pilot for store operations. Deployed as a static site.

GitHub repo: https://github.com/stuartbrameld/visio-website

## Build

Based on the first-party Astro blog starter template (`withastro/astro/examples/blog`), using Astro version 5.

## Tech Stack

- **Framework**: Astro 5 (static site generation)
- **Content**: Markdown + MDX via Astro Content Collections
- **Styling**: Vanilla CSS with CSS custom properties (no Tailwind, no CSS-in-JS)
- **Fonts**: IBM Plex Sans (primary) + JetBrains Mono (monospace) via Google Fonts
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

## News

All content is published under `/news` (not `/blog`). This reflects the site's focus on legitimate, substantive content — company updates, announcements, and industry insights — rather than informal blog-style posts.

News posts go in `src/content/news/`. Default to plain Markdown (`.md`) over `.mdx`.

News frontmatter fields:

```yaml
title: 'Precision Retail: The future is about maximizing your store''s full potential'
description: 'Precision Retail is a methodology focused on prioritizing resources and efforts to maximize ROI in physical stores, bringing the same level of control and learning speed that e-commerce has long enjoyed.'
author: 'Matheus Flores'
pubDate: 'Oct 15 2025'
heroImage: '../../assets/blog-placeholder-1.jpg'
```

- **Required**: `title`, `description`, `author`, `pubDate`, `heroImage` — all news posts must include these fields or the build will fail (enforced by the Zod schema in `src/content.config.ts`).
- **Optional**: `updatedDate`, `pinned` (boolean — pinned posts sort first on the news listing page), `tags` (string array — displayed as chips on listing and post pages; current values: `Precision Retail`, `Success Story`, `Platform Update`)
- Hero images should be placed in `src/assets/`
- **No horizontal rules**: Strip all `---` from news post body content (outside frontmatter). Headings alone provide section separation.

### Tool Pages

Tool announcements (e.g. Payroll Prep) are published as news articles — not standalone pages. Write them as article-style prose with the `Platform Update` tag.

- **Format**: Plain Markdown in `src/content/news/`, same frontmatter as any news post
- **Tag**: `['Platform Update']`
- **SVG illustrations**: Animated product SVGs go in `public/tools/` and are embedded in the article body using `<figure>` + `<img>` tags (CSS animations within SVGs work when loaded via `<img>`)
- **Structure**: Intro (problem statement) → How it works (prose, not grid) → SVG illustration → Benefits (narrative paragraphs) → Customer quotes → FAQ (bold Q&A pairs)
- **Tone**: Article-style prose, not landing-page copy. No CTA buttons, gradient bands, or trust logo bars

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
│   └── news/            # Markdown/MDX news posts
├── layouts/
│   └── BlogPost.astro   # News post page layout
├── pages/
│   ├── index.astro      # Marketing landing page
│   ├── about.astro      # About page
│   ├── news/
│   │   ├── index.astro  # News listing
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
├── fonts/
└── tools/               # Animated product SVGs for tool articles
```

## Design System & Brand

For the full brand identity (colours, typography, voice, shape language, motion, detection overlays, dark mode), see **`docs/brand-book.md`**.

**Design direction**: Premium, refined, quiet confidence. Like Linear/Stripe — not HubSpot/Monday. Generous whitespace, polished details, no flashy effects.

### Colours

The brand uses a blue primary with cyan secondary and orange accent. All colours are defined as CSS custom properties in `global.css`:

- **Primary**: `--color-primary-500` (#0566F7 Electric Royal) — buttons, links, brand colour
- **Secondary**: `--color-secondary-500` (#0891B2 Cyan Vivid) — info labels, secondary actions
- **Accent**: `--color-accent-500` (#F97316 Tangerine) — CTAs on dark, warnings
- **Near-black**: `--color-neutral-950` (#030712) / Abyss (#082035) for dark surfaces
- **Neutrals**: `--color-neutral-50` through `--color-neutral-950` (pure gray, no hue tint)
- **Semantic**: success (#15803D), warning (#92400E), error (#DC2626), info (#0891B2)
- Each colour has a full 50–950 scale — see `docs/brand-book.md` Section 4 for all steps

### Typography

- **Primary font**: `var(--font-body)` — IBM Plex Sans, weights 300–700
- **Monospace**: `var(--font-mono)` — JetBrains Mono, weights 400–500
- Marketing base size: 16px. Scale ratio: 1.125 (Major Second)
- Display headings (42px+): weight 300. Small headings (16-20px): weight 600
- `font-variant-numeric: tabular-nums` on all numbers
- Uppercase: overlines and tags only — never for body text or headings
- **Reference**: For typography questions (line-height, paragraph spacing, prose styling), reference the [Tailwind Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) and Tailwind best practices as a benchmark — but implement in vanilla CSS, not as a dependency

### Spacing & Layout

- Use spacing variables: `--space-xs` through `--space-5xl`
- Max content width: `--max-width` (1200px), narrow: `--max-width-narrow` (720px)
- Use the `.container` class for page-width content
- Border radius: `--radius-card` (6px), `--radius-button` (4px), `--radius-chip` (2px)

### Motion

- Entrances: 200ms ease-out. Exits: 150ms ease-in
- Standard pattern: opacity + 4px translateY only. No scale, no bounce, no spring
- Motion confirms action — never decorates

### Components

- Buttons: `.btn`, `.btn--primary`, `.btn--secondary`
- Section labels: small uppercase primary-coloured text above section headings
- Feature cards: white cards with border, rounded corners, hover lift effect
- Icons: Lucide (stroke-only, 1.5px stroke, `currentColor`)

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
- Don't change the font imports (IBM Plex Sans + JetBrains Mono) without approval

## Skills

Using the Anthropic frontend design skill: `anthropics/skills@frontend-design`
