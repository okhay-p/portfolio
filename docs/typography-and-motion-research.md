# Portfolio typography and motion research

Researched 8 October 2026, before implementation. Scope: enlarge the existing portfolio's typography using Tailwind's scale and add restrained animations that fit its minimal, illustrated style.

## Findings from primary sources

Tailwind's default scale uses relative units. At a 16px root, `text-xs` is 12px with 16px line height, `text-sm` is 14/20px, `text-base` is 16/24px, `text-lg` is 18/28px, `text-2xl` is 24/32px, `text-4xl` is 36/40px, and `text-5xl` is 48/48px. Responsive variants and font-size/line-height pairs can be applied together. These are available design tokens, not rules assigning a size to each semantic element. [Tailwind font-size documentation](https://tailwindcss.com/docs/font-size)

GOV.UK's current design system uses 19px default paragraphs, reserving 16px paragraphs for occasional smaller copy. Its tested type scale keeps body sizes consistent on small screens and adapts large headings instead. This supports increasing the portfolio's 10–12px paragraphs substantially and keeping mobile body copy readable. GOV.UK's choices are evidence from another design system, not requirements for this portfolio. [GOV.UK paragraphs](https://design-system.service.gov.uk/styles/paragraphs/), [GOV.UK type scale](https://design-system.service.gov.uk/styles/type-scale/)

WCAG 2.2's text-spacing criterion requires content to remain functional when users override line height to 1.5 times font size, paragraph spacing to 2 times font size, tracking to 0.12em, and word spacing to 0.16em. It explicitly does not require authors to use those default values. Avoid fixed text-box heights and clipping. Its resize-text criterion requires text to resize up to 200% without losing content or functionality, with stated exceptions. Neither cited criterion prescribes a universal minimum body font size. [W3C text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), [W3C resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)

`prefers-reduced-motion: reduce` detects the user's operating-system preference. WCAG's animation-from-interactions criterion (Level AAA) allows users to disable nonessential interaction-triggered movement; respecting this preference is an appropriate technique. Scroll-driven parallax is identified as a potential vestibular trigger. [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

Google's web.dev animation guidance recommends animating `transform` and `opacity`, avoiding properties that repeatedly trigger layout or painting. [web.dev animation performance](https://web.dev/articles/animations-guide)

## Recommendations for this portfolio

The following are design decisions informed by those sources, not accessibility conformance claims. Preserve Fraunces headings and DM Sans body copy. Use Tailwind's named scale with rem values and a browser-default root size.

| Role | Tailwind size | Default size | Line height / use |
| --- | --- | --- | --- |
| Body paragraphs, project descriptions, navigation, repository names, skills | `text-base` | 16px | 24px minimum; 26–28px for longer paragraphs |
| Introductory copy | `text-base` or `text-lg` | 16–18px | 26–28px depending on available width |
| Metadata, footer, language names, secondary links | `text-sm` | 14px | 20px; remain 14px on phones |
| Short uppercase eyebrows and status labels | `text-xs` | 12px | 16–20px; use sparingly and avoid sentences |
| Project and Instagram-card titles | `text-2xl` | 24px | 32px; wrap naturally |
| Main section headings | `text-4xl` | 36px | 40px; optional `text-5xl`/48px for spacious desktop sections |
| Sidebar headline | `text-4xl` to `text-5xl` | 36–48px | About 1.1–1.2 to preserve the soft serif's shape |

Do not scale the entire desktop page down on phones. Keep copy at the same readable size, reduce columns when titles and descriptions become cramped, and increase padding/gaps as needed. In particular, the existing mobile 7px metadata and 10px descriptions should become 14px and 16px respectively. The current 6px footer should become at least 12px, preferably 14px. Check narrow phones, desktop, 200% zoom, and user spacing overrides.

Add a short opening fade/translation for the sidebar and hero, a once-only staggered reveal as sections enter the viewport, and subtle hover/focus responses on interactive cards and links. Suggested reveal duration: 450–650ms; suggested hover duration: 180–250ms. These timings are aesthetic recommendations. Keep translation small (roughly 8–18px), avoid continuous floating and parallax, and animate opacity/transform. Content must remain visible if JavaScript or IntersectionObserver is unavailable. Reduced-motion mode should show everything immediately and disable translated reveals, card movement, and smooth scrolling. Keyboard focus should remain clearly visible.
