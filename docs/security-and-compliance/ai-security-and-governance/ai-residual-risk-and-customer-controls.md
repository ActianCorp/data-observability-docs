# AI Residual Risk And Customer Controls

Data Observability states its assurance gaps rather than implying coverage it does not have. This page is the plain statement of what Data Observability guarantees, what risks remain after those guarantees, and the controls you hold. It is a technical disclosure and does not vary the terms of your commercial agreement.

## What Data Observability Guarantees

No Data Observability AI capability writes to, modifies, or deletes data in a customer source system. AI output is read-only with respect to your data.

No customer record-level value or personal data is included in a prompt sent to a model provider.

No foundation model is trained, fine-tuned, or retrained on customer data. Detection models train within your tenant and are never pooled across customers.

The core data quality function operates with all AI disabled. Profiling, drift and metadata monitoring, rule-based checks, alerting, and incident workflows do not depend on any AI capability.

## Residual Risks To Be Aware Of

**Generative output can be confidently wrong.** Recommendations and explanations are advisory. Review them against the deterministic metrics, which are the authoritative result.

**Three paths apply AI output without a per-action confirmation.** Monitor creation and update through the assistant, scheduled confidential data tiering, and alert and incident generation from the detection layer. All three produce results that are visible, editable, and removable. Data Observability's stated direction is to move assistant write operations to a propose-and-confirm step.

**A provider-side model change can take effect without a Data Observability release.** Deployments currently reference a named model family rather than a dated snapshot. Data Observability's integration test suite runs on every release and would surface a behavioral regression at that point. Moving to dated snapshot references is a tracked improvement.

**Prompts and completions are logged by default.** This supports diagnosis and is configurable. In a VPC deployment these logs remain in your cloud account. Note that schema metadata can itself carry incidental information, for example a column named after a person. Environments with highly sensitive schemas should consider logging configuration and read-only mode.

**Quantitative accuracy rates are not published for generative output.** Data Observability measures release readiness through an assertion-based integration test suite and does not publish figures it does not measure. Defining quantitative criteria, starting with the detection layer, is a tracked improvement.

**Confidential data classification is a prioritization signal.** It is not an access control, masking, or regulatory classification mechanism and must not be relied on as one.

## Your Controls

**Read-only mode.** A server-side setting disables all write operations exposed to the AI layer for your deployment. Request it through support.

**Logging configuration.** Prompt and completion logging can be turned off per deployment.

**Decline AI entirely.** You retain the full data quality function with every AI capability disabled.

**Report concerns.** Incorrect, unexpected, or concerning AI behavior reported through support is triaged under Data Observability's incident response plan, and the disposition is communicated back to you.

## What Data Observability Asks Of You

Review AI output before acting on it, using the reasoning, score, and detected elements returned with it. Review applied results, meaning assistant-created monitors, classification tiers, and generated alerts, as part of normal operation. Decide whether read-only mode, logging configuration, or declining AI features fits the sensitivity of your environment, and tell Data Observability to apply it. In a VPC deployment, operate the monitoring, retention, and model provider controls on your side.

***

Data Observability's complete AI policy, including the capability inventory, risk register, and governance procedures behind this documentation, is available to customers and prospects under NDA.
