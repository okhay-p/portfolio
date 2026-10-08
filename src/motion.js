// Content stays visible without JavaScript or when reduced motion is preferred.
export function initializeMotion(root) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const animations = new Set();
  const reveal = (element, delay = 0) => {
    const animation = element.animate(
      [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 650, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
    );
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
  };

  root.querySelectorAll('.c-sidebar > *, .c-heading, .card-large').forEach((element, index) => {
    reveal(element, index * 60);
  });

  const observer = new IntersectionObserver(entries => {
    let stagger = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal(entry.target, stagger++ * 70);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  root.querySelectorAll('.collection-card:not(.card-large), .skills-section, .repository-section, .c-about, footer').forEach(element => observer.observe(element));

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
  });
}
