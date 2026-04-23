import { describe, it, expect, beforeEach } from 'vitest';
import { createMatrix, applyState } from '../matrix';
import { STATES } from '../states';

describe('matrix renderer', () => {
  let container: SVGSVGElement;

  beforeEach(() => {
    container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(container);
    createMatrix(container, STATES[0]);
  });

  it('renders a cell for each row×col', () => {
    const cells = container.querySelectorAll('[data-cell]');
    expect(cells.length).toBe(5 * 3);
  });

  it('renders axis labels for rows and columns', () => {
    const rowLabels = container.querySelectorAll('[data-row-label]');
    const colLabels = container.querySelectorAll('[data-col-label]');
    expect(rowLabels.length).toBe(5);
    expect(colLabels.length).toBe(3);
  });

  it('applyState updates cell visual for full coverage', () => {
    applyState(container, STATES[2], { animate: false });
    const rcCell = container.querySelector('[data-cell="0-1"]');
    expect(rcCell?.getAttribute('data-value')).toBe('full');
  });

  it('applyState extends rows for windows state', () => {
    applyState(container, STATES[4], { animate: false });
    const rowLabels = container.querySelectorAll('[data-row-label]');
    expect(rowLabels.length).toBe(7);
  });

  it('dimmed cells get dimmed class', () => {
    applyState(container, STATES[3], { animate: false });
    const rc0 = container.querySelector('[data-cell="0-0"]');
    expect(rc0?.classList.contains('dimmed')).toBe(true);
  });

  it('wavering cells get wavering class', () => {
    applyState(container, STATES[3], { animate: false });
    const trans0 = container.querySelector('[data-cell="0-1"]');
    expect(trans0?.classList.contains('wavering')).toBe(true);
  });

  it('framework labels appear only when state specifies them', () => {
    applyState(container, STATES[1], { animate: false });
    expect(container.querySelectorAll('[data-framework-label]').length).toBe(4);
    applyState(container, STATES[2], { animate: false });
    expect(container.querySelectorAll('[data-framework-label]').length).toBe(0);
  });

  it('trajectory rendered in convergence state', () => {
    applyState(container, STATES[5], { animate: false });
    const traj = container.querySelector('[data-trajectory]');
    expect(traj).not.toBeNull();
  });
});
