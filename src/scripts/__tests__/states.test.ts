import { describe, it, expect } from 'vitest';
import { STATES } from '../states';
import type { CellState } from '../states';

describe('STATES', () => {
  it('has exactly 6 states', () => {
    expect(STATES).toHaveLength(6);
  });

  it('each state has id matching section order', () => {
    STATES.forEach((s, i) => expect(s.id).toBe(i + 1));
  });

  it('hero state has empty cells and labelled axes', () => {
    const hero = STATES[0];
    expect(hero.rows).toHaveLength(5);
    expect(hero.columns).toHaveLength(2);
    expect(hero.cells.every((row) => row.every((c: CellState) => c.value === 'empty'))).toBe(true);
  });

  it('regulator state fills R_c cells 1-2 full, cell 3 partial, 4-5 empty', () => {
    const reg = STATES[1];
    const rc = reg.columns.findIndex((c) => c.key === 'R_c');
    expect(reg.cells[0][rc].value).toBe('full');
    expect(reg.cells[1][rc].value).toBe('full');
    expect(reg.cells[2][rc].value).toBe('partial');
    expect(reg.cells[3][rc].value).toBe('empty');
    expect(reg.cells[4][rc].value).toBe('empty');
  });

  it('switching state has R_c dimmed, R_p full on all 5', () => {
    const sw = STATES[2];
    const rc = sw.columns.findIndex((c) => c.key === 'R_c');
    const rp = sw.columns.findIndex((c) => c.key === 'R_p');
    expect(sw.cells[0][rc].dimmed).toBe(true);
    for (let i = 0; i < 5; i++) expect(sw.cells[i][rp].value).toBe('full');
  });

  it('windows state has >5 rows — D-shift extends disturbance landscape', () => {
    const win = STATES[3];
    expect(win.rows.length).toBeGreaterThan(5);
  });

  it('convergence state has a trajectory through R_p cells', () => {
    const conv = STATES[4];
    expect(conv.trajectory).toBeDefined();
    expect(conv.trajectory!.length).toBeGreaterThan(0);
  });
});
