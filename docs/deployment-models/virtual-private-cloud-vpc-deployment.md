# Virtual Private Cloud (VPC) deployment

The Actian Data Observability Platform’s Virtual Private Cloud (VPC) deployment ensures that all services are hosted securely within your own cloud environment. The architecture integrates seamlessly with your existing infrastructure, enabling data-in-place monitoring while maintaining compliance with your organization’s security, governance, and privacy policies.

!!! note
    To initiate a VPC deployment, contact your Data Observability account manager. They will provide the Helm and Terraform scripts, container registry access, and guide you through the deployment process.

!!! note
    If your requirement is to keep data processing in your environment rather than to host Data Observability's application tier, consider a [Hybrid deployment](hybrid-deployment.md) instead. It runs a single agent against your own Spark engine, with no Data Observability service tier, database, message broker, or search cluster to operate. See [Deployment Models](README.md) for a comparison.

## Deployment Workflow

Actian provides **Helm** and **Terraform** scripts to automate the whole deployment lifecycle.

1. **Infrastructure Setup:** Provision cloud resources (K8s cluster, databases, vaults, etc.) within your VPC.
2. **Setup Validation:** Validate connectivity, component availability, and Kubernetes configuration.
3. **Data Observability Platform Installation:** Deploy Docker images, configure services, and initialize the application.

You can deploy the Data Observability Platform from the Actian registry or from a customer-controlled container repository, depending on your organization’s security policy.

!!! note
    **Connecting BigQuery with your own service account.** On GCP deployments, a connection can authenticate either with the tenant service account or with one you provide. If you provide your own for a BigQuery connection, it needs write access to the Data Observability tenant GCS bucket and permission to run BigQuery jobs, on top of read access to your data — see [Google BigQuery](../getting-started/connect-to-data/data-connectors/google-bigquery.md#additional-permissions-for-gcp-vpc-deployments).

## Data Handling and Retention

Actian handles several categories of data, each subject to specific definitions and guaranteed retention policies. **Actian guarantees safe and complete deletion of data after the required retention period.**

### Data Categories

| Data Type               | Description                                                                                                                                         | Sensitivity                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Customer Data           | Data (sensitive and non-sensitive) that Actian monitors. This may be the original records or data decomposed into individual values for monitoring. | Varies (Sensitive or Non-sensitive)  |
| Derived Data            | Results (numbers) from statistical calculations performed on Customer Data.                                                                         | Non-sensitive                        |
| Data Metrics            | Derivatives used for analyzing trends in data. Examples include percentage of complete records or number of records.                                | Non-sensitive                        |
| Metadata                | Meta information about data, such as data source names, attribute names, and create/update dates.                                                   | Non-sensitive                        |
| Sensitive User Data     | Personally Identifiable Information (PII), such as usernames and passwords.                                                                         | Sensitive                            |
| Non-Sensitive User Data | User identification and roles .                                                                                                                     | Non-sensitive                        |

### Retention Policies

Actian maintains strict, defined periods for the retention of data based on its classification:

| Data Type                                          | Retention Policy                                                                     | Notes                                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Customer Data                                      | Can be configured to be purged as soon as metrics are calculated (typically 1 hour). | If no explicit retention policy is set by the customer, this data is stored for up to 30 days and then permanently deleted .            |
| Derived Data                                       | Stored for up to 30 days.                                                            | <p><br/>If no explicit retention policy is set by the customer, this data is stored for up to 30 days and then permanently deleted .</p> |
| Data Metrics                                       | Stored for up to 360 days.                                                           | Used for long-term trend analysis.                                                                                                      |
| Metadata and User Data (Sensitive & Non-Sensitive) | Stored indefinitely.                                                                 | This data is retained until explicitly requested for deletion.                                                                          |