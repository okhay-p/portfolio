# Rendering for technical writeups and a blog

Research date: 2026-10-13.

Recommendation: generate article HTML at build time (SSG), rather than adopting request-time SSR just to add writing. Astro with static output is a good fit for this Vite and vanilla JavaScript portfolio. Preserve the existing design, CSS, assets, and interaction scripts while moving page templates and article content into build-generated pages.

The current repository uses Vite and serves static output. Its homepage content is inserted by client JavaScript. For writing, prefer one real URL and complete HTML document per article, with its own title, description, canonical URL, and share metadata. Google can render JavaScript, but explicitly recommends server rendering or prerendering for speed and compatibility with crawlers that cannot execute JavaScript. This supports delivering article HTML directly; it does not require request-time rendering. [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Astro prerenders pages at build time by default. Request-time SSR becomes useful when the HTML must depend on the visitor (for example, authenticated content), or must reflect fresh data without rebuilding. Neither is inherent to a personal technical blog. Static publishing means a rebuild and deployment whenever content changes. [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/)

A suitable initial structure is a `/writing/` index and `/writing/<slug>/` article pages, written in Markdown (MDX only when embedded components are needed). Include dates and tags, code highlighting, RSS, and article metadata. Treat blog posts and technical writeups as one content collection with an optional type field; separate collections are only needed if their schemas or publishing workflows differ. These are architecture recommendations inferred from the stated use case, not requirements imposed by the sources.

No runtime migration is necessary for generated static HTML. The existing deployment and recursive HTML sitemap approach can remain, subject to checking canonical URLs and the final generated paths when implementing the change.
