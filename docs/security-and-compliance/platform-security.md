# Platform Security

Actian Data Observability's security model starts from a structural fact. The platform computes data quality where your data lives, and stores only derived results. That shrinks the attack surface before any control is applied. The controls below protect what remains.

## Secure Development

Every change to the platform moves through Data Observability's secure development lifecycle. Code is peer-reviewed before merge. Automated regression tests run in the CI/CD pipeline on every release, and a regression blocks the release. QA and user acceptance testing are completed and approved before production deployment. Source code and dependency scanning runs on a defined security review cycle.

Changes to production follow formal change management with documented review and approval. This applies uniformly, including to model configurations, prompts, and tool permissions in the AI layer. There is no fast lane.

## Encryption

All data in transit is protected with TLS 1.2 or higher, enforced at the platform perimeter and on outbound connections to external services. All data at rest is encrypted with AES-256. Stored tokens and integration credentials carry an additional layer of AES-256-GCM encryption.

## Identity And Access

Data Observability supports single sign-on through your identity provider and multi-factor authentication. Access within the platform is role based, so users see and act on only what their role permits. See [Authentication and Access Control](../getting-started/authentication-and-access-control/README.md) for configuration guides.

Internally, access to production systems is restricted, role based, and audited. Platform services, including AI services, authenticate with dedicated service accounts rather than shared credentials.

Programmatic access uses scoped API keys. See [API Keys](../api-reference/authentication-api/api-keys.md). Store API keys and connection credentials in an approved secret store, and grant users and service identities only the permissions they need.

## Architecture And Isolation

The platform is built as separate microservices. Assistive AI capabilities run as discrete services, isolated from the core monitoring engine. Core profiling, monitoring, rule execution, and alerting continue to operate if AI services are degraded, unavailable, or removed entirely. Public APIs, including the AI agent API, are rate limited.

Each customer's detection models train on that customer's data alone, inside that customer's deployment. Nothing is pooled across tenants.

## Network Access

Allow outbound access only where Data Observability requires it. In a Hybrid deployment, the agent connects outbound to the Data Observability control plane. See [Hybrid deployment](../deployment-models/hybrid-deployment.md) for the required routes and ports. If your network restricts access by source IP, use the [Actian Data Observability IP List](../api-reference/data-observe-ip-list.md).

## Monitoring And Incident Response

Production services are monitored through infrastructure monitoring, threshold alerting, and centralized log management. In a VPC deployment, your team monitors the environment and Data Observability documents what should be monitored.

Security and operational incidents are handled under a formal incident response plan covering identification, escalation, containment, communication, recovery, and corrective action. The plan is tested at least annually. Customers are notified of critical changes through release notes and the published change log.

## Compliance

Actian Data Observability maintains SOC 2 compliance and is continuously monitored against its security, availability, confidentiality, and privacy criteria. Data Observability's AI governance controls enter SOC 2 examination scope beginning with the next annual cycle.

## Deployment Models

Security boundaries differ by deployment. In SaaS, Data Observability operates the infrastructure. In a VPC deployment, the platform runs inside your cloud account under your network, IAM, encryption key, and residency controls. See [Deployment Models](../deployment-models/overview.md) for the architecture of each.

## Requesting Security Documentation

Actian Data Observability's SOC 2 report and complete AI policy, including the capability inventory, risk register, and governance procedures behind this documentation, are available to customers and prospects under NDA. Request them through your Customer Success Manager (CSM).
