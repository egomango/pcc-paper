import { describe, it, expect } from 'vitest';
import { pickSectionIndex, pickActiveByTriggerLine } from '../scroll-observer';

describe('pickSectionIndex', () => {
  it('returns index of most-visible section', () => {
    const entries = [
      { target: { dataset: { sectionIndex: '0' } }, intersectionRatio: 0.2 },
      { target: { dataset: { sectionIndex: '1' } }, intersectionRatio: 0.9 },
      { target: { dataset: { sectionIndex: '2' } }, intersectionRatio: 0.1 },
    ] as unknown as IntersectionObserverEntry[];
    expect(pickSectionIndex(entries)).toBe(1);
  });

  it('returns null on all-zero', () => {
    const entries = [
      { target: { dataset: { sectionIndex: '0' } }, intersectionRatio: 0 },
      { target: { dataset: { sectionIndex: '1' } }, intersectionRatio: 0 },
    ] as unknown as IntersectionObserverEntry[];
    expect(pickSectionIndex(entries)).toBeNull();
  });

  it('ignores entries without sectionIndex dataset', () => {
    const entries = [
      { target: { dataset: {} }, intersectionRatio: 0.9 },
      { target: { dataset: { sectionIndex: '2' } }, intersectionRatio: 0.4 },
    ] as unknown as IntersectionObserverEntry[];
    expect(pickSectionIndex(entries)).toBe(2);
  });
});

describe('pickActiveByTriggerLine', () => {
  it('picks the latest section whose top has crossed the trigger line', () => {
    const rects = [
      { index: 0, top: -800 },
      { index: 1, top: -200 },
      { index: 2, top: 100 },
      { index: 3, top: 600 },
    ];
    expect(pickActiveByTriggerLine(rects, 240)).toBe(2);
  });

  it('falls back to the earliest section when none have crossed yet', () => {
    const rects = [
      { index: 0, top: 500 },
      { index: 1, top: 1200 },
    ];
    expect(pickActiveByTriggerLine(rects, 240)).toBe(0);
  });

  it('returns null on empty input', () => {
    expect(pickActiveByTriggerLine([], 240)).toBeNull();
  });
});
