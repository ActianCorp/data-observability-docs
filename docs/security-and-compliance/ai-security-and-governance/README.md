# AI Security And Governance

Actian Data Observability is a data quality platform first and an AI-assisted product second. The metrics, profiling results, monitor evaluations, incidents, and quality scores you rely on are computed deterministically by the profiling and monitoring engine, validated through automated testing, and reproducible. AI is confined to explanation, recommendation, classification, and configuration assistance on top of those results. This page and its children describe how those capabilities are governed, what data reaches AI models, and the limits Data Observability commits to.

Every AI capability operates under Data Observability's AI policy, which is aligned to the NIST AI Risk Management Framework and built on one principle. No AI capability may take an action Data Observability cannot explain, review, or reverse.

## Where Deterministic Results End And AI Begins

If a result can be computed, Data Observability computes it. Model-generated output never becomes the authoritative source of a metric or quality result. When you ask what your null rate is, the answer comes from the engine. When you ask why it spiked, an AI agent proposes a hypothesis and shows its reasoning, and you verify it against the deterministic metrics.

This boundary is architectural, not editorial. AI capabilities run as discrete microservices, separate from the core monitoring engine. If they are degraded, unavailable, disabled, or removed, profiling, monitoring, rule execution, and alerting continue unaffected. You can decline AI features entirely and retain the full data quality function.

## How AI Output Behaves

Every AI capability is classified by how its output takes effect, and that classification determines the controls around it.

**Advisory.** The output is a recommendation or explanation. Nothing changes unless you act on it. Reasoning and identified risks are returned with the output.

**Applied and reviewable.** The output takes effect on Data Observability-side configuration without a per-action confirmation, and remains visible, editable, and removable. Data Observability's stated direction is to move these to a propose-and-confirm step before application.

**Deterministic detection.** Statistical models, not generative AI, score anomalies and raise alerts. Thresholds are explicit and score distributions are surfaced so you can judge each signal.

No classification permits writing to, modifying, or deleting data in your source systems. That is prohibited at every level.

## Data Observability's AI Capabilities

| Capability                       | What it does                                                          | How it behaves          |
| -------------------------------- | --------------------------------------------------------------------- | ----------------------- |
| Assistant navigation             | Routes your question to the right specialist agent                    | Advisory                |
| Documentation answers            | Answers product questions from the documentation corpus               | Advisory                |
| Lineage explanation              | Explains relationships between assets                                 | Advisory                |
| Root cause analysis              | Proposes the likely cause of an incident, with reasoning              | Advisory                |
| Monitoring Q&A                   | Answers questions on monitors, jobs, alerts, and platform state       | Advisory                |
| Metric analysis                  | Analyzes trends across your metrics and profiling results             | Advisory                |
| Configuration assistance         | Explains and assists with platform configuration                      | Advisory                |
| Rule recommendations             | Recommends data quality rules, with reasoning and identified risks    | Advisory                |
| Dataset recommendations          | Surfaces datasets that warrant attention, with reasoning              | Advisory                |
| Monitor management               | Creates and updates monitors through the assistant                    | Applied and reviewable  |
| Confidential data classification | Assigns sensitivity tiers to columns from schema alone, on a schedule | Applied and reviewable  |
| Anomaly detection                | Detects outliers and drift, generates alerts and incidents            | Deterministic detection |

Two details worth knowing about this table. The confidential data classifier reads column schema only and never sees values, and its tier drives prioritization within Data Observability, not access control or masking. Anomaly detection models train per attribute on your data alone, inside your deployment, and are never pooled across customers.

## Hard Limits

Four things are true of every capability above, in every deployment model. No AI writes to your source systems. No record-level value or personal data enters a prompt. No foundation model is trained on your data. The core platform runs with AI off. The full statement of guarantees, residual risks, and your controls is in [AI Residual Risk and Customer Controls](ai-residual-risk-and-customer-controls.md).

## In This Section

[AI Architecture and Data Handling](ai-architecture-and-data-handling.md) covers what enters a prompt, what never does, where prompts go in each deployment model, and how logging works.

[Human Oversight and Knowledge Limits](human-oversight-and-knowledge-limits.md) covers what the AI can and cannot know, and what to check before acting on each kind of output.

[AI Residual Risk and Customer Controls](ai-residual-risk-and-customer-controls.md) states plainly what Data Observability guarantees, what risks remain, and the controls you hold.
