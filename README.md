# Portfolio — throwaway design prototype

Question: which minimal portfolio layout best complements stylized 3D objects and characters?

Run `npm install`, then `npm run prototype`. Open http://localhost:5173.

- `/?variant=A` — **Soft & human**: warm editorial typography, a generated character portrait, two featured projects.
- `/?variant=B` — **After hours**: dark studio, oversized typography, abstract sculpture, a typographic project index.
- `/?variant=C` — **Objects of curiosity**: persistent introduction sidebar and an asymmetric object collection.

Use the floating bottom arrows or keyboard ← / → to switch. Each URL survives reloads. The switcher is development-only. Hover the 3D objects to tilt them; reduced-motion preferences disable idle movement.

Everything is illustrative: projects, biography, and contact email are sample content. Project links lead to the about section for this design exploration. No data is persisted.

Captured on `prototype/portfolio-variants`. No direction has been selected yet. Once selected, record the verdict and implement the chosen direction in production code; preserve this branch as the visual reference.

The character in A and C is now a transparent AI-generated PNG, replacing the procedural Three.js character. Abstract project objects remain interactive Three.js scenes. Asset: `public/images/oakkar-portrait-v1.png`; full generation prompt: `public/images/oakkar-portrait-v1.prompt.md`.
