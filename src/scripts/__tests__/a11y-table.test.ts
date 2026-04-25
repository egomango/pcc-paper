import { describe, it, expect, beforeEach } from 'vitest';
import { renderA11yTable } from '../a11y-table';
import { STATES } from '../states';

describe('renderA11yTable', () => {
  let table: HTMLTableElement;

  beforeEach(() => {
    table = document.createElement('table');
    document.body.appendChild(table);
  });

  it('renders one header row with disturbance column + regulator columns', () => {
    renderA11yTable(table, STATES[0]);
    const ths = table.querySelectorAll('thead th');
    expect(ths.length).toBe(1 + STATES[0].columns.length);
    expect(ths[0].textContent).toBe('Disturbance');
  });

  it('renders one row per state row, with row header', () => {
    renderA11yTable(table, STATES[2]);
    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(STATES[2].rows.length);
    const firstRowHeader = rows[0].querySelector('th');
    expect(firstRowHeader?.getAttribute('scope')).toBe('row');
  });

  it('writes cell value text (full / partial / empty)', () => {
    renderA11yTable(table, STATES[2]);
    const firstCellText = table.querySelector('tbody tr td')?.textContent;
    expect(firstCellText).toContain('full');
  });

  it('appends "(dimmed)" suffix for dimmed cells', () => {
    renderA11yTable(table, STATES[3]);
    const rowCells = table.querySelectorAll('tbody tr:first-child td');
    const first = rowCells[0].textContent ?? '';
    expect(first.includes('dimmed')).toBe(true);
  });
});
