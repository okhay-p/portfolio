# Oakkar Phyo — portfolio

Run `npm install` and `npm run dev`, then open http://localhost:5173.

The selected design is variant 3: a sidebar introduction and a collection of projects. The original three design variations are preserved on `prototype/portfolio-variants` at commit `62c1b16`. This settles the layout question; the main site uses the selected direction and has no prototype switcher.

Typography: [Fraunces](https://fonts.google.com/specimen/Fraunces), a soft expressive serif, for headings and the wordmark; DM Sans for body text. Fraunces is self-hosted, with its SIL Open Font License in `public/fonts/Fraunces-OFL.txt`. Softness is set to 100 with wonky letterforms enabled; headings use medium weights and the wordmark uses a heavier weight.

The character artwork was supplied by the user: `public/images/oakkar-character-v2.png`. Its white backdrop blends into the page through CSS. Project illustrations are generated 3D-style still-life images, not project screenshots. Generation prompts are saved in `docs/project-image-generation.md`. The earlier generated portrait and its prompt are preserved in the prototype branch.

Projects and public repository metadata were retrieved with GitHub CLI on 2026-10-06. `src/github-repositories.js` contains only the three included public original repositories, excluding private repos, forks, and the friend’s portfolio. Featured project descriptions were checked against source files and repository metadata. The full inventory of 24 repositories is outside the site repository at `/home/oakkar/.codex/portfolio-repositories.md`.

Skills include Hermes, OpenCode, and Codex under AI-assisted development.

Use `npm run build` for a production build, and `npm run preview` to inspect it.

Every production build regenerates `dist/sitemap.xml` from the built HTML pages using canonical URLs on `https://oakkarphyo.com`. Adding or removing a published HTML page updates the sitemap on the next build and deployment. `404.html` is excluded; page sections and external project links are not separate pages. `public/robots.txt` points crawlers to the sitemap.

The completed content interview and project status decisions are captured in `docs/portfolio-content-decisions.md`. The three featured stories are PlayKit, Home server, and archived AkashaLearn.
