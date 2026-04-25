# pcc-paper

Companion page to *Product-Customer Coupling: Why Product-Market Fit Happens When It Happens* (Babel, 2026; SSRN [6618399](https://ssrn.com/abstract=6618399), DOI [10.2139/ssrn.6618399](https://doi.org/10.2139/ssrn.6618399)).

Live: <https://egomango.github.io/pcc-paper/>

The page condenses the paper's argument into seven scrolling sections paired with a sticky coverage matrix. It is a reading guide, not a substitute — every claim links back to the SSRN preprint.

## Stack

- Astro 6, static output to GitHub Pages
- IBM Plex Sans + Mono via Fontsource
- No client framework. Hand-written SVG matrix, IntersectionObserver-driven scroll observer, vitest for unit tests
- Plausible analytics in production only, gated on `PUBLIC_PLAUSIBLE_SRC`

## Develop

```sh
pnpm install
pnpm dev          # http://localhost:4321/pcc-paper/
pnpm test         # vitest
pnpm build        # static build to ./dist
pnpm og           # regenerate public/og.png (needs dev server running)
```

## Architecture

- `src/config/paper.ts` — single source of truth for title, DOI, SSRN URL, author, license. Read by `Base.astro` (JSON-LD `ScholarlyArticle`) and `index.astro` (footer).
- `src/scripts/states.ts` — matrix states; drives both desktop (`StickyCanvas`) and mobile (`MatrixInline`).
- `src/content/*.md` — section copy. Order set in `src/pages/index.astro`.
- `src/scripts/scroll-observer.ts` — trigger-line scroll observer (active section = latest one whose top has crossed 30% of viewport, with a near-bottom override for the closing section).

## Deploy

Push to `main` → GitHub Actions → Pages. The `PUBLIC_PLAUSIBLE_SRC` repo secret is injected at build time.

## License

CC-BY 4.0. See [paper config](src/config/paper.ts) for canonical metadata.
