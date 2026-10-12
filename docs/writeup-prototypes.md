# Project writeup prototypes

Open `/prototypes/writeups.html` with `npm run dev`. These are exploratory layouts, separate from the selected production homepage. They are not included in the production build or sitemap.

## Design plan

Keep the portfolio's visual vocabulary: paper #f7f7f2, ink #27312f, muted #606b65, lilac #e7e1f4, sage #dde7d2, connection blue #315f91. Fraunces carries headings; DM Sans carries body text. Use left-aligned prose, a maximum 66-character reading measure, and generous space around the network diagram.

Compare three placements:

```text
Project companion       Case study                 Connection lab
[project illustration]  [portfolio / writeups]      [learning question]
[title + project links] [article title + purpose]   [diagram + step control]
[expand learning notes] [contents | long article]  [explanation | notes]
[diagram + lessons]     [diagram + lessons]        [full writeup]
```

The companion keeps learning evidence close to the project. The case study makes room for future longer articles. The lab makes the protocol itself the entry point. Numbering only represents actual connection steps.

## Brief review

A generic blog card grid would separate learning from the projects. Replace it with the existing PlayKit artwork and a concrete question: how do friends' phones connect? Keep the original fonts rather than introducing an unrelated editorial theme. Spend the visual emphasis on signaling versus game-data paths. Reuse factual article content across all three options so placement can be compared fairly.

## Content grounding

Checked against the local PlayKit `docs/phone-sync.md`, `src/sync/transport.ts`, and README on 2026-10-13. Host-authoritative state, ordered data channels, WebSocket signaling via Worker/Durable Object, queued candidates, and the STUN-only deployment are implemented. TURN is an optional architecture extension, not an enabled production service. Learning motivation comes from the user's brief; no invented debugging incidents or performance results are included.

Protocol references appear alongside the explanations in the prototype. The walkthrough is a conceptual visualization, not a network test; trickle ICE can overlap the SDP exchange.

Recommended direction: case study, entered from a “What I learned” link beside each project. Use the companion for short notes; add the lab as an interactive figure inside articles that benefit from one. Future article structure: learning goal, project context, architecture, decisions and limits, and next experiments. Only publish new articles once their content is ready.
