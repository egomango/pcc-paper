---
order: 4
title: "Switching cost = destruction + exposure"
words_target: 400
---

## Switching cost = destruction + exposure

Adoption literature treats switching cost as a single number — "lock-in", "risk aversion", "inertia". The conflation makes resistance look arbitrary: two apparently similar customers display very different resistance and nobody can say why.

It's not arbitrary. Switching cost has two components, and they scale on different things.

:::decomposition
switching cost  =  destruction cost  +  exposure cost
:::

**Destruction cost** is the variety lost when your product displaces parts of the customer's incumbent toolkit. Staff retrain or leave. Workflows get rewritten. Decade-accumulated configuration is dismantled. It scales with how much of the incumbent you displace.

**Exposure cost** is the harm incurred while essential variables sit transiently unregulated during the transition — old tools half gone, your product not fully ramped. It scales with the stakes of what's exposed and how long the window stays open.

AWS is the cleanest worked example. Through the 1990s and early 2000s, enterprise IT's incumbent regulator was the on-premises datacentre. It covered stable internal workloads and scheduled batch work. Then the landscape drifted: spiky event-driven demand, geo-distributed access, and elastic analytical workloads became load-bearing. The incumbent couldn't cover the new rows at viable cost.

AWS didn't win by beating on-prem at what on-prem already did well. It won by closing the new rows. Destruction cost on stable workloads was gradual — deferred to hardware refresh cycles. Exposure cost was concentrated per workload, and it was hedged by migration order: dev/test first (low stakes, bounded exposure), then customer-facing web tiers, then data and analytics, systems of record often last. "Cloud-first, not cloud-only" was parallel-run by architecture. "Lift-and-shift" migrations that moved stable workloads into the cloud without capturing the elastic cells paid destruction cost and got nothing in return.

Founders consistently price destruction — feature parity, data migration, integration work. They consistently under-price exposure. Enterprise pilots rarely die on feature gaps. They die when exposure compounds past customer tolerance before the product ramps. The paper's phrase for this failure mode is *death by pilot*: the venture runs out of cash while the customer is still deciding.

The formal apparatus — the variety argument, the transition-window accounting, the stakes-per-unit-time structure — is in §II.4 of the paper.
