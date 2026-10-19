# Oakkar Phyo — portfolio

Requires Node.js 22.12 or newer. Run `npm install` and `npm run dev`, then open http://localhost:4321.

The site uses Astro static generation. Homepage content and writeups are complete HTML at build time; JavaScript only enhances the homepage cabinet: without it, each niche links to a plain catalogue of placards on the same page. There is no server adapter or request-time rendering. Cloudflare continues serving the generated `dist/` assets using the existing Wrangler configuration.

Routes: `/` is the cabinet of projects, `/writing` lists learning notes, and `/writing/playkit-webrtc` is the first case study. PlayKit’s placard and the learning-note exhibit link to the writeup. Exhibits can be shared directly, for example `/#exhibit-playkit`.

The homepage is “The Cabinet”: projects are exhibits in a lit display case, with the character standing beside it as curator. Choosing an exhibit zooms into its niche and opens a museum-style placard; on phones the placard is a bottom sheet. It replaced the earlier sidebar-and-collection layout (variant 3), which remains in git history before 20 October 2026. The original three variations are preserved on `prototype/portfolio-variants` at commit `62c1b16`. The three October 2026 redesign prototypes, including the selected cabinet, are in `prototypes/`.

Typography: [Fraunces](https://fonts.google.com/specimen/Fraunces), a soft expressive serif, for headings and the wordmark; DM Sans for body text. Fraunces is self-hosted, with its SIL Open Font License in `public/fonts/Fraunces-OFL.txt`. Softness is set to 100 with wonky letterforms enabled; headings use medium weights and the wordmark uses a heavier weight.

The character artwork was supplied by the user: `public/images/oakkar-character-v2.png`, used as the social preview image. The homepage uses a transparent cutout, `public/images/oakkar-cutout.webp`, generated from it by `node scripts/make-character-cutout.mjs`; check the soles and hair edges after regenerating. Project illustrations are generated 3D-style still-life images, not project screenshots. Generation prompts are saved in `docs/project-image-generation.md`. The earlier generated portrait and its prompt are preserved in the prototype branch.

Projects and public repository metadata were retrieved with GitHub CLI on 2026-10-06. Exhibits live in `src/data/exhibits.js` and link only to public original repositories, excluding private repos, forks, and the friend’s portfolio. Featured project descriptions were checked against source files and repository metadata. The full inventory of 24 repositories is outside the site repository at `/home/oakkar/.codex/portfolio-repositories.md`.

Skills include Hermes, OpenCode, and Codex under AI-assisted development.

Use `npm run check` for Astro/TypeScript validation, `npm run build` for a production build, and `npm run preview` to inspect it at http://localhost:4321 (use another port if the dev server is running). The preview serves built files; rebuild after changing content. `npm test` builds the site and verifies static content, canonical URLs, sitemap entries, local assets, and anchor navigation.

## Adding a writeup

Add a Markdown or MDX file to `src/content/writing/`. Its filename becomes its URL (for example, `new-project.mdx` becomes `/writing/new-project`). Frontmatter is validated by `src/content.config.ts`:

```yaml
---
title: What building this project taught me
description: A short introduction to the project and what I learned.
project: Project name
learningGoal: The specific technology or idea I wanted to learn.
tags: [Technology, Topic]
image: /images/project-image.webp
liveUrl: https://example.com
sourceUrl: https://github.com/owner/project
---
```

`liveUrl` and `sourceUrl` are optional. Use second-level Markdown headings for the article’s sections; the layout generates its contents navigation from those headings. MDX allows embedding Astro components, as the PlayKit article does with `SignalingDiagram.astro`. Plain Markdown works for prose-only articles.

The collection generates article routes, the learning-notes index, and page metadata. To link it from the homepage, add a link to the matching exhibit’s `links` in `src/data/exhibits.js`, for example `{ label: 'What I learned about …', href: '/writing/new-project' }`.

The three exploratory writeup layouts remain in `prototypes/writeups.html`, beside the homepage redesign prototypes. Run `npm run prototype` and open http://localhost:5173/prototypes/ to browse them. These are separate from Astro’s published routes and sitemap.

## Adding an exhibit

Add an entry to `src/data/exhibits.js`; the shelf order is the array order, and the cabinet shows three niches per row (two on phones). Each exhibit needs an `id` (used in its `#exhibit-…` link), `title`, `status`, `tone` (`live`, `archived`, or `soon`, which sets the status dot), the curator’s hover `remark`, placard `details`, a `quote`, and `links`. Illustrated exhibits also need an `image` and a `backdrop` colour matching the image’s background. Set `kind: 'note'` for a pinned paper note or `kind: 'empty'` for a reserved shelf. External links open in a new tab and get an arrow automatically.

Every production build regenerates `dist/sitemap.xml` from the built HTML pages using canonical URLs on `https://oakkarphyo.com`. Adding or removing a published HTML page updates the sitemap on the next build and deployment. `404.html` is excluded; page sections and external project links are not separate pages. `public/robots.txt` points crawlers to the sitemap.

The completed content interview and project status decisions are captured in `docs/portfolio-content-decisions.md`. The three featured stories are PlayKit, Home server, and archived AkashaLearn.
