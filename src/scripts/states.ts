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
  annotation?: string;
  dShiftAt?: number;
  hideMatrix?: boolean;
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
  { key: 'realtime_ml', label: 'Real-time ML inference' },
  { key: 'edge_stream', label: 'Edge data streams' },
];

const baseColumns: ColumnDef[] = [
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
  cells: emptyGrid(5, 2),
  caption:
    "Coverage matrix. Rows are disturbances the customer faces. Columns are regulators absorbing them — software, workflows, staff, heuristics, in Ashby's sense, not the FDA's.\n\nSolid cell = covered. Half cell = strained. Empty cell = an opening.\n\nThe grid runs one example throughout: enterprise IT through the cloud transition. As spiky demand and geo-distribution joined the disturbance landscape, on-prem couldn't cover the new rows at viable cost. AWS won by closing them.",
};

const s2: MatrixState = {
  id: 2,
  sectionKey: 'frameworks',
  rows: baseRows,
  columns: baseColumns,
  cells: emptyGrid(5, 2),
  frameworkLabels: ['JTBD', 'Lean', 'RBV', 'Disruption'],
  caption:
    'Each framework names a real piece. None operates at the cell level — disturbance × regulator — where coupling actually happens.',
};

const s3Cells = emptyGrid(5, 2);
fillRc(s3Cells, 0);
const s3: MatrixState = {
  id: 3,
  sectionKey: 'regulator',
  rows: baseRows,
  columns: baseColumns,
  cells: s3Cells,
  caption:
    'Incumbent regulator: 2 rows covered, 1 strained, 2 uncovered. The system works for what it was built for.',
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
  caption:
    'Distributed on-prem (incumbent): being dismantled — destruction in progress. Transition column: exposure window — old tools half gone, new ones not yet ramped. Public cloud (new regulator): five rows covered.',
  annotation:
    "AWS is the cleanest worked example. Through the 1990s and early 2000s, enterprise IT's incumbent was the on-premises datacentre — covering stable internal workloads and scheduled batch. Then the landscape drifted: spiky event-driven demand, geo-distributed access, and elastic analytical workloads became load-bearing. The incumbent couldn't cover the new rows at viable cost.\n\nAWS didn't win by beating on-prem at what on-prem already did well. It won by closing the new rows. Destruction was gradual — deferred to hardware refresh cycles. Exposure was concentrated per workload, hedged by migration order: dev/test first, then customer-facing web tiers, then data and analytics, systems of record often last. “Cloud-first, not cloud-only” was parallel-run by architecture. “Lift-and-shift” migrations that moved stable workloads into the cloud without capturing the elastic cells paid destruction cost and got nothing in return.",
};

const s5Cells = emptyGrid(7, 2);
fillRc(s5Cells, 0);
fillRp(s5Cells, 1, 5);
s5Cells[5][1] = { value: 'full' };
s5Cells[6][1] = { value: 'full' };
const s5: MatrixState = {
  id: 5,
  sectionKey: 'windows',
  rows: extendedRows,
  columns: baseColumns,
  cells: s5Cells,
  dShiftAt: 5,
  caption:
    "Landscape drift: real-time ML inference and edge data streams entered as load-bearing rows. The incumbent doesn't cover them. The window opens in that gap.",
};

const s6Cells = emptyGrid(7, 2);
fillRc(s6Cells, 0);
fillRp(s6Cells, 1, 7);
const s6: MatrixState = {
  id: 6,
  sectionKey: 'convergence',
  rows: extendedRows,
  columns: baseColumns,
  cells: s6Cells,
  trajectory: [
    { row: 1, col: 1 },
    { row: 2, col: 1 },
    { row: 3, col: 1 },
    { row: 4, col: 1 },
    { row: 0, col: 1 },
    { row: 5, col: 1 },
    { row: 6, col: 1 },
  ],
  caption:
    "Numbered probes show the AWS migration order: low-stakes workloads first, the incumbent's stronghold (stable internal workloads) last. Each probe tested a hypothesis; the map updated; the next tightened. Convergent teams iterate this way; map-less teams random-walk.",
};

const s7: MatrixState = {
  id: 7,
  sectionKey: 'cta',
  rows: extendedRows,
  columns: baseColumns,
  cells: s6Cells,
  hideMatrix: true,
  caption: 'Designing with PCC. Three places where the framework changes practice.',
  annotation:
    "Product is composite. The customer couples with the artifact plus the vendor apparatus around it — sales, onboarding, SLA, parallel-run infrastructure. Where exposure dominates, the apparatus is the product, not overhead.\n\nPricing absorbs switching cost. Destruction and exposure scale on different things and want different contractual responses — free trials, parallel-run contracts, “pay on cutover,” success fees. Pricing is structural, not commercial intuition.\n\nOrganisation mirrors the coupling. The team is itself a regulator. Hiring sales before customer success when exposure dominates ships windows nobody's responsible for closing. Map-maintenance, pilot ownership, and exposure budgeting belong on the org chart from day one.",
};

export const STATES: MatrixState[] = [s1, s2, s3, s4, s5, s6, s7];
