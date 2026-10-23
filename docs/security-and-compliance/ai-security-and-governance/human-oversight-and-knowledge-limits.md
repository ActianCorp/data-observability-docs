# Human Oversight And Knowledge Limits

Actian Data Observability documents what its AI capabilities cannot know with the same care as what they can do. This page tells you where the limits are and what to check before acting on each kind of output. Read it as the operating manual for trusting the assistant correctly.

## What The AI Can And Cannot Know

Agents operate only over Data Observability platform state reached through defined tool services. They know nothing outside that scope. They cannot see your source systems directly, the wider internet, or anything beyond the platform.

Agents do not read customer record-level values. Their reasoning about data content rests on schema metadata, derived metrics, and aggregates. When an agent describes your data, it is describing the shape and statistics of your data, not its contents.

An agent sees only what you see. Authorization is enforced per requesting user, so the assistant cannot become a way around access controls.

Documentation answers come from a corpus refreshed on a fixed schedule. They may lag the latest documentation change by up to one refresh interval.

Conversation history is capped. In a long session, context from early in the conversation may no longer be available.

The agents are built for the data observability domain and Data Observability platform state. They are not valid outside it, and output quality degrades as a question moves away from that scope.

## Generative Output Can Be Fluent And Wrong

This is the single most important limit. A model can produce a confident, well-written, plausible answer that is incorrect. Read generative output as a well-informed suggestion, not a verified result. The deterministic metrics remain the authoritative answer, and every recommendation returns its reasoning so you can check the suggestion against them.

## A Note On Anomaly Detection

Detection models train on the scanned population of each attribute, within your deployment. A model trained over an unrepresentative period inherits that unrepresentativeness. If a source was anomalous during training, the model may treat the anomaly as normal. This is why the scoring threshold is explicit and the score distribution is surfaced, so you can judge whether a signal is well supported. Rule-based checks run independently of the detection models and are unaffected by this limit.

## What To Check Before Acting

| Output                                                  | What to check before acting                                                                                                                                       |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recommendation, such as rules, datasets, or remediation | Read the reasoning and identified risks returned with it. Confirm it matches the asset and the business context you know.                                         |
| Explanation, such as root cause or lineage              | Treat it as a hypothesis. Verify it against the underlying metrics and lineage, which are deterministic.                                                          |
| Monitor created or updated by the assistant             | Open the monitor. Confirm its scope, thresholds, and schedule before relying on it. It can be edited or removed.                                                  |
| Confidential data tier                                  | Review the score, assigned tier, and detected columns. Correct the tier where the classifier lacked evidence. The tier drives prioritization, not access control. |
| Alert or incident from anomaly detection                | Assess the score against the surfaced distribution and threshold before treating the signal as actionable.                                                        |

Acceptance or rejection of AI output is logged, so your review decisions are auditable.
