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

const s2Cells = emptyGrid(5, 2);
fillRc(s2Cells, 0);
const s2: MatrixState = {
  id: 2,
  sectionKey: 'regulator',
  rows: baseRows,
  columns: baseColumns,
  cells: s2Cells,
  caption:
    "Coverage matrix. Rows are disturbances the customer faces. Columns are regulators absorbing them — software, workflows, staff, heuristics.\n\nSolid cell = covered. Half cell = strained. Empty cell = an opening.\n\nIncumbent regulator: 2 rows covered, 1 strained, 2 latent. The system works for what it was built for.",
  annotation:
    "The grid runs one example throughout: enterprise IT before the cloud transition. The bottom two rows — geo-distributed access, elastic analytics — exist in the partition but aren't yet load-bearing. They become the rows that open the window.",
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
  caption:
    "Mid-transition snapshot. Incumbent dimmed: dismantling in progress — destruction cost. New regulator at partial: not yet at full ramp. The exposure window is the *time* during which essential variables sit outside tolerance, not a third regulator.",
  annotation:
    "Exposure-management practice — onboarding, parallel-run, staged rollout, SLA caps, \"no one ever got fired for buying IBM\" — is rational response to this window. Onboarding compresses exposure *width*; parallel-run bounds exposure *depth*; SLA tiers convert open-ended exposure into a priced option. These aren't vendor tactics or buyer psychology — they're structural responses to the two-component decomposition.",
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
  caption:
    "Landscape drift activates the bottom rows: spiky/geo/elastic become load-bearing. The partition is the same; the weight on it shifted. The window opens where the incumbent's coverage runs out.",
  annotation:
    "Public cloud didn't win by replacing on-premises on the stable-workload axis. It won by closing the variety deficit on elasticity, geo-distribution, and elastic analytics — the rows the shift made load-bearing. Destruction was gradual, deferred to hardware refresh cycles. Exposure was hedged workload-by-workload: dev/test first, then customer-facing web tiers, then data and analytics, with systems of record often last.",
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
  caption:
    "Numbered probes show migration order: low-stakes, low-destruction rows first; the incumbent's stronghold last. Each probe tested a hypothesis; the map updated; the next tightened. Convergent teams iterate this way.",
  annotation:
    "Slack is the model-preservation pivot. Tiny Speck built real-time messaging to coordinate Glitch — a multiplayer game that failed. Artifact and segment both changed at the pivot; what survived was the team's map of one narrow disturbance landscape — the cost of threading shared work through email — which generalised cleanly to engineering teams and then wider knowledge work. The coverage-structure map carries across, not the artifact.",
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
