# AI Architecture And Data Handling

This page describes how Data Observability's AI capabilities are built, what data can reach an AI model, and where that data goes in each deployment model. The boundary described here is implemented in the product, not only asserted in policy.

## Architecture

Data Observability's assistive AI runs as discrete microservices, separate from the core monitoring engine. Agents reach platform state exclusively through defined tool services covering metrics, incidents, monitors, jobs, alerts, connections, projects, assets, users, and lineage. Each tool service is classified as read or write, and agents may reach only allow-listed tool services.

Authorization is enforced at the tool service against the requesting user. An agent sees only what the person asking is entitled to see. No tool service can act on a customer source system.

Assistive agents consume third-party foundation models through provider APIs. Data Observability does not build or host foundation models. The anomaly detection layer is separate, built on statistical models Data Observability develops, and involves no foundation model at all.

## The Prompt Data Boundary

Prompts sent to a model provider may contain three categories of data.

* Schema-level metadata, such as attribute names, types, nullability, key role flags, and glossary terms
* Operational metadata, such as asset ownership, incident assignment, and job and alert state
* Derived aggregates, such as record counts and computed metrics

Prompts must never contain customer record-level values, personal data, credentials, or secrets. This is enforced two ways. The tool service that returns raw values is removed from the agent allow-list by a dedicated data boundary control, and that control fails closed. If its state cannot be determined, the tool is not exposed.

The confidential data classifier follows the same rule. It sends column schema only and never sees values.

## Conversation History

Conversation history is held in process and capped. It is not written to a database. Context from earlier in a long session may age out, which is a documented knowledge limit, not a fault.

## Logging

Prompts and completions are written to the application log by default to support diagnosis. This is configurable per deployment. If your environment requires logging off, it is a configuration change. Request it through support.

## Where Prompts Go In Each Deployment

**Customer VPC.** Prompts go to your own model provider project, using the deployment's own endpoint and credentials, under your own IAM, network, encryption key, and data residency controls. Never to a Data Observability-hosted or shared endpoint. Prompt and completion logs remain inside your cloud account.

**SaaS.** Prompts go to the model provider endpoint configured for the environment.

## No Training On Your Data

No foundation model is trained, fine-tuned, or retrained on customer data. Detection-layer models train per attribute, at scan time, on your data alone, inside your deployment. They are never pooled or shared across tenants.

## Model Management

The model used is fixed per deployment in configuration and changed only through change control with review and approval. Every supported model is validated through an automated integration test suite before adoption, and the suite runs on every release. If a provider becomes unavailable, assistive features degrade and the core platform continues. The architecture supports more than one provider.
