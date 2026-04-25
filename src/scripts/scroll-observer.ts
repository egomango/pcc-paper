export function pickSectionIndex(entries: IntersectionObserverEntry[]): number | null {
  let bestIndex: number | null = null;
  let bestRatio = 0;
  for (const e of entries) {
    const idxStr = (e.target as HTMLElement).dataset.sectionIndex;
    if (idxStr === undefined) continue;
    if (e.intersectionRatio > bestRatio) {
      bestRatio = e.intersectionRatio;
      bestIndex = Number(idxStr);
    }
  }
  return bestIndex;
}

export interface SectionRect {
  index: number;
  top: number;
}

export function pickActiveByTriggerLine(
  rects: SectionRect[],
  triggerY: number
): number | null {
  let active: number | null = null;
  let bestTop = -Infinity;
  for (const r of rects) {
    if (r.top <= triggerY && r.top > bestTop) {
      bestTop = r.top;
      active = r.index;
    }
  }
  if (active !== null) return active;
  let earliest: number | null = null;
  let earliestTop = Infinity;
  for (const r of rects) {
    if (r.top < earliestTop) {
      earliestTop = r.top;
      earliest = r.index;
    }
  }
  return earliest;
}

const TRIGGER_RATIO = 0.3;
const NEAR_BOTTOM_PX = 80;

export function observeSections(onChange: (index: number) => void): IntersectionObserver {
  let currentIndex = -1;
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('[data-section-index]')
  );

  const evaluate = (): void => {
    const triggerY = window.innerHeight * TRIGGER_RATIO;
    const rects: SectionRect[] = sections.map((el) => ({
      index: Number(el.dataset.sectionIndex),
      top: el.getBoundingClientRect().top,
    }));
    let next = pickActiveByTriggerLine(rects, triggerY);
    const docHeight = document.documentElement.scrollHeight;
    const scrollBottom = window.scrollY + window.innerHeight;
    if (docHeight - scrollBottom < NEAR_BOTTOM_PX && rects.length > 0) {
      next = rects.reduce((acc, r) => (r.index > acc ? r.index : acc), -1);
    }
    if (next !== null && next !== currentIndex) {
      currentIndex = next;
      onChange(next);
    }
  };

  const io = new IntersectionObserver(() => evaluate(), {
    threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
  });
  sections.forEach((el) => io.observe(el));

  window.addEventListener('scroll', evaluate, { passive: true });
  window.addEventListener('resize', evaluate);
  evaluate();

  return io;
}
