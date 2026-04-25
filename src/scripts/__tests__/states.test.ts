import { describe, it, expect } from 'vitest';
import { STATES } from '../states';
import type { CellState } from '../states';

describe('STATES', () => {
  it('has exactly 7 states', () => {
    expect(STATES).toHaveLength(7);
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

  it('regulator state (3) fills R_c cells 1-2 full, cell 3 partial, 4-5 empty', () => {
    const s3 = STATES[2];
    const rc = s3.columns.findIndex((c) => c.key === 'R_c');
    expect(s3.cells[0][rc].value).toBe('full');
    expect(s3.cells[1][rc].value).toBe('full');
    expect(s3.cells[2][rc].value).toBe('partial');
    expect(s3.cells[3][rc].value).toBe('empty');
    expect(s3.cells[4][rc].value).toBe('empty');
  });

  it('switching state (4) has R_c dimmed, R_p full on all 5', () => {
    const s4 = STATES[3];
    const rc = s4.columns.findIndex((c) => c.key === 'R_c');
    const rp = s4.columns.findIndex((c) => c.key === 'R_p');
    expect(s4.cells[0][rc].dimmed).toBe(true);
    for (let i = 0; i < 5; i++) expect(s4.cells[i][rp].value).toBe('full');
  });

  it('windows state (5) has >5 rows — D-shift extends disturbance landscape', () => {
    const s5 = STATES[4];
    expect(s5.rows.length).toBeGreaterThan(5);
  });

  it('convergence state (6) has a trajectory through R_p cells', () => {
    const s6 = STATES[5];
    expect(s6.trajectory).toBeDefined();
    expect(s6.trajectory!.length).toBeGreaterThan(0);
  });
});
