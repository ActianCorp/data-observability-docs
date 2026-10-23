# Common Security Questions

The questions security reviewers ask us most, answered directly. Each answer links to the page carrying the full detail. 

## Data

### Does Data Observability Store Our Data?

Data Observability stores only derived data. Aggregate metrics, schema and asset metadata, monitor and incident records, and encrypted connection credentials. Raw records are read during scans to compute results and are never retained. See [Data Handling](data-handling.md).

### Where Is Our Data Processed?

It depends on your deployment. In a VPC deployment, everything runs inside your cloud account. In SaaS, derived results are stored in Data Observability's infrastructure.

### What Happens To Our Data After A POC?

In evaluation environments, profiling runs on physically separated compute per customer, and customer data is purged once metrics are computed. See [Data Handling](data-handling.md).

### Is Our Data Shared With Third Parties?

Customer data reaches third parties through two paths only. The cloud provider services Data Observability runs on, and integrations you explicitly configure, such as Jira, Slack, or Teams. What moves is derived data and notifications, never raw table rows. See [Data Handling](data-handling.md).

### Is Data Encrypted?

Yes. TLS 1.2 or higher in transit, AES-256 at rest, with an additional AES-256-GCM layer on stored tokens and credentials. See [Platform Security](platform-security.md).

## AI

### Does Data Observability Send Our Data To An LLM?

Prompts may contain schema metadata, operational metadata, and derived aggregates. Never record-level values, personal data, credentials, or secrets. The boundary is enforced in the product and fails closed. See [AI Architecture and Data Handling](ai-security-and-governance/ai-architecture-and-data-handling.md).

### Is Any Model Trained On Our Data?

No. No foundation model is trained, fine-tuned, or retrained on customer data. Detection models train within your tenant and are never pooled across customers. See [AI Security and Governance](ai-security-and-governance/README.md).

### Can AI Modify Our Source Systems?

No. No Data Observability AI capability writes to, modifies, or deletes data in a customer source system, under any configuration. This is a policy prohibition and an architectural fact. See [AI Security and Governance](ai-security-and-governance/README.md).

### Can We Turn AI Off?

Yes, at three levels. Read-only mode disables all AI write operations for your deployment. Prompt and completion logging is configurable. Or decline AI features entirely and retain the full data quality function. See [AI Residual Risk and Customer Controls](ai-security-and-governance/ai-residual-risk-and-customer-controls.md).

### Does AI Act Without Human Approval?

Three capabilities apply output to Data Observability-side state without a per-action confirmation, and all three produce results that are visible, editable, and removable. Everything else is advisory. Data Observability's stated direction is to move assistant write operations to propose-and-confirm. See [Human Oversight and Knowledge Limits](ai-security-and-governance/human-oversight-and-knowledge-limits.md).

### Is Data Observability's AI Governed Under A Formal Policy?

Yes. Data Observability maintains an AI policy aligned to the NIST AI Risk Management Framework, with a capability inventory, oversight classifications, a risk register, and an annual review cycle. Its controls enter SOC 2 examination scope from the next annual cycle.

## Platform

### Is Data Observability SOC 2 Compliant?

Yes. Data Observability maintains SOC 2 compliance covering security, availability, confidentiality, and privacy criteria. The report is available under NDA. See [Platform Security](platform-security.md).

### Do You Support SSO And MFA?

Yes. SSO through your identity provider and multi-factor authentication, with role-based access within the platform. See [Authentication and Access Control](../getting-started/authentication-and-access-control/README.md).

### How Are Incidents Handled?

Under a formal incident response plan covering identification, escalation, containment, communication, recovery, and corrective action, tested at least annually. Customers are notified of critical changes through release notes and the change log. See [Platform Security](platform-security.md).

### Can Data Observability Run Entirely In Our Environment?

Yes. In a VPC deployment the platform runs inside your cloud account under your network, IAM, encryption key, and residency controls, and AI prompts go to your own model provider endpoint. See [Deployment Models](../deployment-models/overview.md).

## Documentation Requests

### Can We Get The SOC 2 Report Or The Full AI Policy?

Data Observability's SOC 2 report and complete AI policy, including the capability inventory, risk register, and governance procedures behind this documentation, are available to customers and prospects under NDA. 
