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

export function observeSections(onChange: (index: number) => void): IntersectionObserver {
  let currentIndex = -1;
  const io = new IntersectionObserver(
    (entries) => {
      const next = pickSectionIndex(entries);
      if (next !== null && next !== currentIndex) {
        currentIndex = next;
        onChange(next);
      }
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-20% 0px -20% 0px' }
  );

  document.querySelectorAll<HTMLElement>('[data-section-index]').forEach((el) => io.observe(el));
  return io;
}
