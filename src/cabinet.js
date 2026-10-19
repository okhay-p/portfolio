// Without JavaScript, niches link to a plain catalogue of placards below the cabinet.
// This turns the catalogue into a side panel and zooms the cabinet into the chosen niche.
export function initializeCabinet(root) {
  const scene = root.querySelector('[data-scene]');
  const shelves = root.querySelector('[data-shelves]');
  const niches = [...shelves.querySelectorAll('.niche')];
  const catalogue = root.querySelector('[data-catalogue]');
  const placards = [...catalogue.querySelectorAll('.placard')];
  const bubble = root.querySelector('[data-bubble]');
  const count = root.querySelector('[data-count]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 860px)');
  const greeting = bubble.textContent;
  let current = -1;
  let origin = null;

  catalogue.setAttribute('role', 'dialog');
  catalogue.setAttribute('aria-modal', 'true');
  catalogue.tabIndex = -1;

  let sayTimer;
  const say = text => {
    if (bubble.textContent === text) return;
    clearTimeout(sayTimer);
    bubble.classList.add('swap');
    sayTimer = setTimeout(() => { bubble.textContent = text; bubble.classList.remove('swap'); }, reducedMotion.matches ? 0 : 160);
  };

  // Scale the scene so the niche fills the space beside the placard. The scene's
  // transform origin is its top-left corner, measured before any zoom is applied.
  const frame = index => {
    if (narrow.matches) { scene.style.transform = ''; return; }
    const niche = niches[index];
    const cabinet = niche.offsetParent;
    const panel = catalogue.getBoundingClientRect().width;
    const width = innerWidth - panel;
    const x = cabinet.offsetLeft + niche.offsetLeft + niche.offsetWidth / 2;
    const y = cabinet.offsetTop + niche.offsetTop + niche.offsetHeight / 2;
    const scale = Math.min((width * 0.78) / niche.offsetWidth, (innerHeight * 0.72) / niche.offsetHeight);
    scene.style.transform = `translate(${width / 2 - origin.left - x * scale}px, ${innerHeight / 2 - origin.top - y * scale}px) scale(${scale})`;
  };

  const open = index => {
    if (current < 0) {
      const rect = scene.getBoundingClientRect();
      origin = { left: rect.left, top: rect.top };
    }
    current = index;
    niches.forEach((niche, i) => niche.classList.toggle('current', i === index));
    placards.forEach((placard, i) => placard.classList.toggle('current', i === index));
    catalogue.setAttribute('aria-labelledby', placards[index].querySelector('h3').id);
    count.textContent = `${placards[index].querySelector('.placard-number').textContent} / ${String(placards.length).padStart(2, '0')}`;
    say(niches[index].dataset.remark);
    document.documentElement.classList.add('cabinet-open');
    frame(index);
    history.replaceState(null, '', '#' + placards[index].id);
    catalogue.scrollTop = 0;
    catalogue.focus({ preventScroll: true });
  };

  const close = () => {
    if (current < 0) return;
    const niche = niches[current];
    current = -1;
    document.documentElement.classList.remove('cabinet-open');
    scene.style.transform = '';
    niches.forEach(n => n.classList.remove('current'));
    history.replaceState(null, '', location.pathname + location.search);
    niche.focus({ preventScroll: true });
  };

  const step = delta => open((current + delta + placards.length) % placards.length);

  niches.forEach((niche, index) => {
    niche.addEventListener('click', event => { event.preventDefault(); open(index); });
    niche.addEventListener('mouseenter', () => say(niche.dataset.remark));
    niche.addEventListener('focus', () => current < 0 && say(niche.dataset.remark));
  });
  shelves.addEventListener('mouseleave', () => current < 0 && say(greeting));
  root.querySelector('[data-dim]').addEventListener('click', close);
  catalogue.querySelector('[data-close]').addEventListener('click', close);
  catalogue.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => step(Number(button.dataset.step))));

  addEventListener('keydown', event => {
    if (current < 0) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowLeft') step(-1);
    else if (event.key === 'Tab') {
      // Keep focus inside the placard while it is open.
      const focusable = [...catalogue.querySelectorAll('button, .placard.current a')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === catalogue)) { last.focus(); event.preventDefault(); }
      else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
    }
  });

  addEventListener('resize', () => {
    if (current < 0) return;
    scene.style.transition = 'none';
    scene.style.transform = '';
    const rect = scene.getBoundingClientRect();
    origin = { left: rect.left, top: rect.top };
    frame(current);
    void scene.offsetWidth;
    scene.style.transition = '';
  });

  // Shared links such as /#exhibit-playkit open straight onto that placard.
  const linked = placards.findIndex(placard => '#' + placard.id === location.hash);
  if (linked >= 0) { scrollTo(0, 0); open(linked); }
}
