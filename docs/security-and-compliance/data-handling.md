# Data Handling

Actian Data Observability's data handling model rests on one distinction. The platform processes your data where it lives and stores only what it derives from it. Raw records are read to compute quality results and are never copied into long-term storage in Data Observability's infrastructure.

## What Data Observability Processes And What Data Observability Stores

| Category                  | Examples                                                                        | Stored by Data Observability                             |
| ------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Raw customer records      | Table rows, file contents, field values                                         | No. Read during scans to compute results, never retained |
| Derived quality results   | Aggregate metrics, profiling statistics, drift measurements, data quality scores | Yes                                                      |
| Schema and asset metadata | Attribute names, types, nullability, key flags, glossary terms, asset ownership | Yes                                                      |
| Operational records       | Monitors, alerts, incidents, job history, user actions                          | Yes                                                      |
| Connection credentials    | OAuth tokens, integration credentials                                           | Yes, encrypted with AES-256-GCM                          |

Everything Data Observability stores is derived or operational. None of it contains your record-level values.

## Where Your Data Is Processed

Where processing and storage happen depends on your deployment model.

**Customer VPC -** The entire platform, including scanning, derived data storage, and logs, runs inside your cloud account under your network, IAM, encryption key, and residency controls. Nothing leaves your environment.

**SaaS -** Scans read your data through the connection you configure, and derived results are stored in Data Observability's cloud infrastructure. In evaluation and POC environments, profiling runs on physically separated compute per customer, and customer data is purged once metrics are computed.

**Microsoft Fabric workload -** Data quality computations execute inside your Fabric engine through query push-down, and only derived data reaches Data Observability's infrastructure. 

## Third Parties

Customer data reaches third parties through exactly two paths. Cloud provider services that Data Observability's infrastructure runs on, and integrations you explicitly configure, such as Jira, Slack, Teams, email, or your own webhook. In both cases, what moves is derived data and notifications, never raw table rows.

AI model providers are a special case with their own strict boundary. Prompts carry schema metadata, operational metadata, and derived aggregates only, and never record-level values, personal data, or credentials. How that boundary is enforced is covered in [AI Architecture and Data Handling](ai-security-and-governance/ai-architecture-and-data-handling.md).

## Logs And Retention

Application logs support diagnosis and audit. Prompts and completions exchanged with AI model providers are written to the application log by default, and this is configurable per deployment. In a VPC deployment, all logs remain inside your cloud account.

Stored data and logs are retained under Data Observability's data management policy retention schedule.

In a [VPC deployment](../deployment-models/virtual-private-cloud-vpc-deployment.md), retention is documented by data category. See [Data Handling and Retention](../deployment-models/virtual-private-cloud-vpc-deployment.md#data-handling-and-retention).

## Your Controls

You decide what Data Observability can reach. Connections are scoped by the credentials you provide, and Actian recommends least-privilege, read-only access to source systems. You can configure prompt and completion logging, request read-only mode for AI write operations, or decline AI features entirely while retaining the full data quality function.

For data deletion requests or residency questions, contact your Customer Success Manager (CSM).
