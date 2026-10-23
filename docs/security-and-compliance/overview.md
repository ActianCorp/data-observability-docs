# Overview

Actian Data Observability is built for teams whose data cannot leave their control. Data quality computations run where your data lives, and Data Observability never copies raw records into its infrastructure. Data Observability stores only derived results such as aggregate metrics, schema metadata, and monitor and incident records. A deterministic engine powers detection, and every AI capability operates under a governed policy that keeps humans in control. This section explains how the platform is secured, what data Data Observability handles, and how our AI works, in enough detail to support a security review.

## Our Security Posture

Actian maintains SOC 2 compliance and is continuously monitored against its security, availability, confidentiality, and privacy criteria.

All data is encrypted in transit using TLS 1.2 or higher and at rest using AES-256. Access to production systems is restricted, role-based, and audited.

Data Observability's AI capabilities are governed under a formal policy aligned to the NIST AI Risk Management Framework. The policy is built on one principle. No AI capability may take an action Actian cannot explain, review, or reverse. The platform's full data quality function runs with AI disabled.

## Shared Responsibility

How responsibility divides depends on your deployment model.

| Responsibility                                   | SaaS   | VPC                                     |
| ------------------------------------------------ | ------ | --------------------------------------- |
| Application security, patching, and monitoring   | Actian | Actian (software) and you (environment) |
| Infrastructure and network controls              | Actian | You                                     |
| Data source credentials and scoping              | You    | You                                     |
| User access, roles, and SSO configuration        | You    | You                                     |
| AI feature configuration and review of AI output | You    | You                                     |

See [Deployment Models](../deployment-models/overview.md) for the full architecture of each option.

## What This Section Covers

[Platform Security](platform-security.md) describes how the application and infrastructure are secured.

[Data Handling](data-handling.md) describes what Data Observability processes, what it stores, and for how long.

[AI Security and Governance](ai-security-and-governance/README.md) describes our AI capabilities, the human oversight model, how AI handles your data, and the residual risks we ask you to understand.

[Common Security Questions](common-security-questions.md) answers the questions we see most often in security reviews.

