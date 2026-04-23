import { describe, it, expect } from 'vitest';
import { pickSectionIndex } from '../scroll-observer';

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
