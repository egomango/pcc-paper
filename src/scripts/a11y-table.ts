import type { MatrixState, CellState } from './states';

function cellText(c: CellState): string {
  let v = c.value;
  if (c.dimmed) v += ' (dimmed)';
  if (c.wavering) v += ' (wavering)';
  return v;
}

export function renderA11yTable(table: HTMLTableElement, state: MatrixState): void {
  table.replaceChildren();

  const caption = document.createElement('caption');
  caption.textContent = state.caption || 'Coverage matrix';
  table.appendChild(caption);

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const disturbHeader = document.createElement('th');
  disturbHeader.setAttribute('scope', 'col');
  disturbHeader.textContent = 'Disturbance';
  headRow.appendChild(disturbHeader);
  for (const col of state.columns) {
    const th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.textContent = col.label;
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  state.rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.textContent = row.label;
    tr.appendChild(th);
    for (const cell of state.cells[i]) {
      const td = document.createElement('td');
      td.textContent = cellText(cell);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}
