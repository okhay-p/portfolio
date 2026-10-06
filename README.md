# Portfolio — throwaway design prototype

Question: which minimal portfolio layout best complements stylized 3D objects and characters?

Run `npm install`, then `npm run prototype`. Open http://localhost:5173.

- `/?variant=A` — **Soft & human**: warm editorial typography, a supplied full-length character image, two featured projects.
- `/?variant=B` — **After hours**: dark studio, oversized typography, abstract sculpture, a typographic project index.
- `/?variant=C` — **Objects of curiosity**: persistent introduction sidebar and an asymmetric object collection.

Use the floating bottom arrows or keyboard ← / → to switch. Each URL survives reloads. The switcher is development-only. Hover the 3D objects to tilt them; reduced-motion preferences disable idle movement.

Featured projects and the public repository list come from `okhay-p` on GitHub, inspected using GitHub CLI. Project illustrations are decorative 3D artwork. Skills include the requested Hermes, OpenCode, and Codex labels. No data is persisted.

Captured on `prototype/portfolio-variants`. No direction has been selected yet. Once selected, record the verdict and implement the chosen direction in production code; preserve this branch as the visual reference.

The character in A and C uses the user-supplied `public/images/oakkar-character-v2.png`. Its white background blends into the light layouts with CSS; the source image is unchanged. Abstract project objects remain interactive Three.js scenes. The earlier generated portrait and its prompt remain available as an unused design reference.

GitHub inventory refreshed on 2026-10-06: 24 repositories total, 7 public, 17 private. Only public metadata is included in `src/github-repositories.js`. The full inventory is kept outside this repository at `/home/oakkar/.codex/portfolio-repositories.md`. Featured project descriptions were checked against public source files, manifests, and repository descriptions.
