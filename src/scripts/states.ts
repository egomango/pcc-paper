export interface ColumnDef {
  key: string;
  label: string;
}

export interface RowDef {
  key: string;
  label: string;
}

export interface CellState {
  value: 'empty' | 'partial' | 'full';
  dimmed?: boolean;
  wavering?: boolean;
}

export interface MatrixState {
  id: number;
  sectionKey: string;
  rows: RowDef[];
  columns: ColumnDef[];
  cells: CellState[][];
  frameworkLabels?: string[];
  trajectory?: Array<{ row: number; col: number }>;
  caption?: string;
}

const baseRows: RowDef[] = [
  { key: 'stable', label: 'Stable internal workloads' },
  { key: 'batch', label: 'Scheduled batch work' },
  { key: 'spiky', label: 'Spiky / event-driven demand' },
  { key: 'geo', label: 'Geo-distributed access' },
  { key: 'elastic', label: 'Elastic analytical / ML' },
];

const extendedRows: RowDef[] = [
  ...baseRows,
  { key: 'realtime_ml', label: 'Real-time ML inference (D-shift)' },
  { key: 'edge_stream', label: 'Edge data streams (D-shift)' },
];

const baseColumns: ColumnDef[] = [
  { key: 'R_c_single', label: 'Single-site on-prem' },
  { key: 'R_c', label: 'Distributed on-prem' },
  { key: 'R_p', label: 'Public cloud' },
];

const columnsWithCorridor: ColumnDef[] = [
  { key: 'R_c', label: 'Distributed on-prem' },
  { key: 'transition', label: 'Transition' },
  { key: 'R_p', label: 'Public cloud' },
];

function emptyGrid(rows: number, cols: number): CellState[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: 'empty' as const }))
  );
}

function fillRc(cells: CellState[][], rcIndex: number): void {
  cells[0][rcIndex] = { value: 'full' };
  cells[1][rcIndex] = { value: 'full' };
  cells[2][rcIndex] = { value: 'partial' };
}

function fillRp(cells: CellState[][], rpIndex: number, upTo = 5): void {
  for (let i = 0; i < upTo; i++) cells[i][rpIndex] = { value: 'full' };
}

const s1: MatrixState = {
  id: 1,
  sectionKey: 'hero',
  rows: baseRows,
  columns: baseColumns,
  cells: emptyGrid(5, 3),
  caption: '',
};

const s2: MatrixState = {
  id: 2,
  sectionKey: 'frameworks',
  rows: baseRows,
  columns: baseColumns,
  cells: emptyGrid(5, 3),
  frameworkLabels: ['JTBD', 'Lean', 'RBV', 'Disruption'],
  caption: 'Four frameworks, none filling cells.',
};

const s3Cells = emptyGrid(5, 3);
fillRc(s3Cells, 1);
const s3: MatrixState = {
  id: 3,
  sectionKey: 'regulator',
  rows: baseRows,
  columns: baseColumns,
  cells: s3Cells,
  caption: 'V(R_c) = 2',
};

const s4Cells = emptyGrid(5, 3);
fillRc(s4Cells, 0);
s4Cells[0][0].dimmed = true;
s4Cells[1][0].dimmed = true;
s4Cells[2][0].dimmed = true;
for (let i = 0; i < 5; i++) s4Cells[i][1] = { value: 'empty', wavering: true };
fillRp(s4Cells, 2);
const s4: MatrixState = {
  id: 4,
  sectionKey: 'switching',
  rows: baseRows,
  columns: columnsWithCorridor,
  cells: s4Cells,
  caption: 'destruction  ←  exposure  →  V(R_p) = 5',
};

const s5Cells = emptyGrid(7, 3);
fillRc(s5Cells, 0);
fillRp(s5Cells, 2, 5);
s5Cells[5][2] = { value: 'full' };
s5Cells[6][2] = { value: 'full' };
const s5: MatrixState = {
  id: 5,
  sectionKey: 'windows',
  rows: extendedRows,
  columns: baseColumns,
  cells: s5Cells,
  caption: 'D-shift: two new rows; window = overlap',
};

const s6Cells = emptyGrid(7, 3);
fillRc(s6Cells, 0);
fillRp(s6Cells, 2, 7);
const s6: MatrixState = {
  id: 6,
  sectionKey: 'convergence',
  rows: extendedRows,
  columns: baseColumns,
  cells: s6Cells,
  trajectory: [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 4, col: 2 },
    { row: 2, col: 2 },
    { row: 3, col: 2 },
    { row: 5, col: 2 },
    { row: 6, col: 2 },
  ],
  caption: 'Model-based search: ordered trajectory.',
};

const s7: MatrixState = {
  id: 7,
  sectionKey: 'cta',
  rows: extendedRows,
  columns: baseColumns,
  cells: s6Cells,
  caption: "Coupled regulation under D'.",
};

export const STATES: MatrixState[] = [s1, s2, s3, s4, s5, s6, s7];
