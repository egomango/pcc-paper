import type { MatrixState } from './states';

const NS = 'http://www.w3.org/2000/svg';
const CELL_W = 130;
const CELL_H = 44;
const ROW_LABEL_W = 180;
const COL_LABEL_H = 72;
const PAD = 16;
const META_LABEL_Y = PAD + 14;

export interface RenderOptions {
  animate?: boolean;
}

function ensureGroup(svg: SVGSVGElement, attr: string): SVGGElement {
  let g = svg.querySelector<SVGGElement>(`[${attr}]`);
  if (!g) {
    g = document.createElementNS(NS, 'g');
    g.setAttribute(attr, '');
    svg.appendChild(g);
  }
  return g;
}

export function createMatrix(svg: SVGSVGElement, initial: MatrixState): void {
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Coverage matrix');

  ensureGroup(svg, 'data-rows');
  ensureGroup(svg, 'data-cols');
  ensureGroup(svg, 'data-cells');
  ensureGroup(svg, 'data-extras');

  applyState(svg, initial, { animate: false });
}

export function applyState(svg: SVGSVGElement, state: MatrixState, opts: RenderOptions = {}): void {
  const animate = opts.animate ?? true;
  const rowsG = ensureGroup(svg, 'data-rows');
  const colsG = ensureGroup(svg, 'data-cols');
  const cellsG = ensureGroup(svg, 'data-cells');
  const extrasG = ensureGroup(svg, 'data-extras');

  const nRows = state.rows.length;
  const nCols = state.columns.length;
  const w = ROW_LABEL_W + nCols * CELL_W + PAD * 2;
  const h = COL_LABEL_H + nRows * CELL_H + PAD * 2;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  rowsG.replaceChildren();
  state.rows.forEach((r, i) => {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('data-row-label', r.key);
    t.setAttribute('x', String(PAD + ROW_LABEL_W - 8));
    t.setAttribute('y', String(PAD + COL_LABEL_H + i * CELL_H + CELL_H / 2 + 4));
    t.setAttribute('text-anchor', 'end');
    t.setAttribute('font-size', '12');
    t.setAttribute('fill', 'var(--mid)');
    t.textContent = r.label;
    rowsG.appendChild(t);
  });

  colsG.replaceChildren();

  const disturbMeta = document.createElementNS(NS, 'text');
  disturbMeta.setAttribute('data-axis-meta', 'rows');
  disturbMeta.setAttribute('x', String(PAD + ROW_LABEL_W - 8));
  disturbMeta.setAttribute('y', String(META_LABEL_Y));
  disturbMeta.setAttribute('text-anchor', 'end');
  disturbMeta.setAttribute('font-size', '10');
  disturbMeta.setAttribute('font-weight', '600');
  disturbMeta.setAttribute('letter-spacing', '0.08em');
  disturbMeta.setAttribute('fill', 'var(--subtle)');
  disturbMeta.textContent = 'DISTURBANCES ↓';
  colsG.appendChild(disturbMeta);

  const regulatorMeta = document.createElementNS(NS, 'text');
  regulatorMeta.setAttribute('data-axis-meta', 'cols');
  regulatorMeta.setAttribute('x', String(PAD + ROW_LABEL_W + 8));
  regulatorMeta.setAttribute('y', String(META_LABEL_Y));
  regulatorMeta.setAttribute('text-anchor', 'start');
  regulatorMeta.setAttribute('font-size', '10');
  regulatorMeta.setAttribute('font-weight', '600');
  regulatorMeta.setAttribute('letter-spacing', '0.08em');
  regulatorMeta.setAttribute('fill', 'var(--subtle)');
  regulatorMeta.textContent = 'REGULATORS →';
  colsG.appendChild(regulatorMeta);

  state.columns.forEach((c, j) => {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('data-col-label', c.key);
    t.setAttribute('x', String(PAD + ROW_LABEL_W + j * CELL_W + CELL_W / 2));
    t.setAttribute('y', String(PAD + COL_LABEL_H - 12));
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-size', '11');
    t.setAttribute('font-weight', '600');
    t.setAttribute('fill', 'var(--text)');
    t.textContent = c.label;
    colsG.appendChild(t);
  });

  cellsG.replaceChildren();
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nCols; j++) {
      const cell = state.cells[i][j];
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('data-cell', `${i}-${j}`);
      g.setAttribute('data-value', cell.value);
      if (cell.dimmed) g.classList.add('dimmed');
      if (cell.wavering) g.classList.add('wavering');

      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', String(PAD + ROW_LABEL_W + j * CELL_W + 4));
      rect.setAttribute('y', String(PAD + COL_LABEL_H + i * CELL_H + 4));
      rect.setAttribute('width', String(CELL_W - 8));
      rect.setAttribute('height', String(CELL_H - 8));
      rect.setAttribute(
        'fill',
        cell.value === 'full'
          ? 'var(--cover)'
          : cell.value === 'partial'
            ? 'var(--subtle)'
            : 'var(--surface)'
      );
      rect.setAttribute('stroke', 'var(--border)');
      rect.setAttribute('stroke-width', '1');
      if (animate) rect.style.transition = 'fill 400ms ease, opacity 400ms ease';
      g.appendChild(rect);

      if (cell.value === 'partial') {
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('x', String(PAD + ROW_LABEL_W + j * CELL_W + CELL_W / 2));
        t.setAttribute('y', String(PAD + COL_LABEL_H + i * CELL_H + CELL_H / 2 + 5));
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('fill', 'white');
        t.setAttribute('font-size', '14');
        t.textContent = '◐';
        g.appendChild(t);
      }

      cellsG.appendChild(g);
    }
  }

  extrasG.replaceChildren();

  if (state.frameworkLabels) {
    state.frameworkLabels.forEach((label, i) => {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('data-framework-label', label);
      t.setAttribute('x', String(PAD + ROW_LABEL_W + nCols * CELL_W + 16));
      t.setAttribute('y', String(PAD + COL_LABEL_H + i * 22 + 14));
      t.setAttribute('font-size', '12');
      t.setAttribute('fill', 'var(--subtle)');
      t.textContent = label;
      extrasG.appendChild(t);
    });
  }

  if (state.trajectory) {
    const poly = document.createElementNS(NS, 'polyline');
    poly.setAttribute('data-trajectory', '');
    const points = state.trajectory
      .map(({ row, col }) => {
        const cx = PAD + ROW_LABEL_W + col * CELL_W + CELL_W / 2;
        const cy = PAD + COL_LABEL_H + row * CELL_H + CELL_H / 2;
        return `${cx},${cy}`;
      })
      .join(' ');
    poly.setAttribute('points', points);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'var(--accent)');
    poly.setAttribute('stroke-width', '2');
    poly.setAttribute('stroke-dasharray', '4 4');
    poly.setAttribute('opacity', '0.7');
    extrasG.appendChild(poly);
  }

}
