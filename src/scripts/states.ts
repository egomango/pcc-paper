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
  trajectory?: Array<{ row: number; col: number }>;
  title?: string;
  caption?: string;
  annotation?: string;
  dShiftAt?: number;
  hideMatrix?: boolean;
}

const RUNNING_EXAMPLE = 'Running example · Enterprise IT through the cloud transition';

const baseRows: RowDef[] = [
  { key: 'stable', label: 'Stable internal workloads' },
  { key: 'batch', label: 'Scheduled batch work' },
  { key: 'spiky', label: 'Spiky / event-driven demand' },
  { key: 'geo', label: 'Geo-distributed access' },
  { key: 'elastic', label: 'Elastic analytical / ML' },
];

const baseColumns: ColumnDef[] = [
  { key: 'R_c', label: 'Distributed on-prem' },
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
  hideMatrix: true,
  caption: 'Why PMF feels like luck',
  annotation:
    "Founders do everything right and still miss. Others do less and land. The folklore answer — right place, right time, read the tea leaves — gestures at the phenomenon without naming the mechanism.\n\n**Jobs-to-Be-Done** names the demand: customers hire products to make progress on jobs they care about. The complement is the customer-side mechanics — what dislodges the incumbent, and at what cost.\n\n**Lean Startup** gives the search method: build, measure, learn — a discipline for iterating when the answer isn't known. The complement is why the loop converges in some cases and not in others, which Claim 4 makes structural.\n\n**The resource-based view** explains durable advantage from the firm's side: which capabilities and assets are hard to imitate. RBV treats the customer as environment; PCC treats it as an agent with its own adaptive logic.\n\n**Christensen's disruption** gives the temporal shape: cheaper, simpler entrants displacing overshooting incumbents. PCC adds the single-customer mechanics — why a price-performance argument that wins on paper often stalls in the room.\n\nPCC sits in the cybernetic-management tradition — Ashby's regulator, Beer's Viable System Model — applied to the inter-party regulatory equilibrium two viable parties have to reach for adoption.",
};

const incumbentOnlyColumns: ColumnDef[] = [
  { key: 'R_c', label: 'Distributed on-prem' },
];
const s2Cells = emptyGrid(5, 1);
fillRc(s2Cells, 0);
const s2: MatrixState = {
  id: 2,
  sectionKey: 'regulator',
  rows: baseRows,
  columns: incumbentOnlyColumns,
  cells: s2Cells,
  title: RUNNING_EXAMPLE,
  caption:
    "The customer's incumbent regulator: on-prem infrastructure. It handles stable workloads and scheduled batch work — those rows show full coverage. It's strained on spiky demand — half-filled. Geo-distributed access and elastic analytics aren't yet pressing on the business — empty.",
  annotation:
    "The bottom two rows aren't yet weighing on the business — geo-distributed access and elastic analytics exist as possibilities but no one is hiring them. The paper's claim is that these latent rows are where the window will eventually open. The example matrix is a snapshot of the regulator before that shift.",
};

const s3Cells = emptyGrid(5, 2);
fillRc(s3Cells, 0);
s3Cells[0][0].dimmed = true;
s3Cells[1][0].dimmed = true;
s3Cells[2][0].dimmed = true;
s3Cells[0][1] = { value: 'partial' };
s3Cells[1][1] = { value: 'partial' };
s3Cells[2][1] = { value: 'partial' };
const s3: MatrixState = {
  id: 3,
  sectionKey: 'switching',
  rows: baseRows,
  columns: baseColumns,
  cells: s3Cells,
  title: RUNNING_EXAMPLE,
  caption:
    "Mid-transition. On-prem is dimmed because it's being dismantled — that's destruction cost. Public cloud is half-filled because it isn't yet at full ramp. The gap between them is the exposure window: time when neither regulator is fully covering what the business depends on.",
  annotation:
    "Practices that look like buyer psychology — onboarding, parallel-run, staged rollout, SLA caps, \"no one ever got fired for buying IBM\" — are structural responses to this picture. Onboarding shortens the exposure window. Parallel-run keeps the old regulator running so essential things stay covered. SLAs put a price on the exposure. None of it is irrational caution.",
};

const s4Cells = emptyGrid(5, 2);
fillRc(s4Cells, 0);
fillRp(s4Cells, 1, 5);
const s4: MatrixState = {
  id: 4,
  sectionKey: 'windows',
  rows: baseRows,
  columns: baseColumns,
  cells: s4Cells,
  dShiftAt: 3,
  title: RUNNING_EXAMPLE,
  caption:
    "The landscape shifted: spiky demand, geo-distributed access, and elastic analytics became the rows that now matter most to the business. Public cloud covers all five rows; on-prem still doesn't reach the bottom two. The window is open exactly where the incumbent's coverage runs out.",
  annotation:
    "Public cloud didn't win by beating on-prem on stable workloads — it won by covering the rows the shift made load-bearing. The on-prem column still has those top rows; what changed is which rows the business now depends on. Where the incumbent's coverage runs out is exactly where the new entrant has structural room.",
};

const s5Cells = emptyGrid(5, 2);
fillRc(s5Cells, 0);
fillRp(s5Cells, 1, 5);
const s5: MatrixState = {
  id: 5,
  sectionKey: 'convergence',
  rows: baseRows,
  columns: baseColumns,
  cells: s5Cells,
  trajectory: [
    { row: 2, col: 1 },
    { row: 3, col: 1 },
    { row: 4, col: 1 },
    { row: 1, col: 1 },
    { row: 0, col: 1 },
  ],
  title: RUNNING_EXAMPLE,
  caption:
    "The numbers show migration order: spiky workloads first, then geo-distributed access, then elastic analytics — the rows the incumbent already struggled on. Stable workloads and batch came last because they were on-prem's stronghold. Each numbered step was a hypothesis the team tested before the next.",
  annotation:
    "Successful cloud migrations ran this loop with discipline: each workload chosen for what the team would learn from it, each rollout sized to a survivable exposure budget. Lift-and-shift skipped the loop entirely, moved every workload in inventory order, paid full destruction cost, and never closed the rows the shift had actually opened.",
};

const s6: MatrixState = {
  id: 6,
  sectionKey: 'cta',
  rows: baseRows,
  columns: baseColumns,
  cells: s5Cells,
  hideMatrix: true,
  caption: 'Designing with PCC. Three places where the framework changes practice.',
  annotation:
    "**Product is composite.** The customer couples with the artifact plus the vendor apparatus around it — sales, onboarding, SLA, parallel-run infrastructure. Where exposure dominates, the apparatus is the product, not overhead.\n\n**Pricing absorbs switching cost.** Destruction and exposure scale on different things and want different contractual responses — free trials, parallel-run contracts, \"pay on cutover,\" success fees. Pricing is structural, not commercial intuition.\n\n**Organisation mirrors the coupling.** The team is itself a regulator. Hiring sales before customer success when exposure dominates ships windows nobody's responsible for closing. Map-maintenance, pilot ownership, and exposure budgeting belong on the org chart from day one.",
};

export const STATES: MatrixState[] = [s1, s2, s3, s4, s5, s6];
