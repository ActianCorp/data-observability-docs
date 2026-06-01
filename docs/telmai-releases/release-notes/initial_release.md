Actian Data Observability
======

# Release Notes

## February 2026 Release

### Product Changes

* [MCP server availability in VPC deployment](../../getting-started/integrations/mcp-server.md)
* [Exclude single metric from learning](../../getting-started/monitoring-data/metrics-exclusions.md)
* [Data quality score - API only](../../getting-started/monitoring-data/data-quality-score.md)
* AI Agent now supports VPC deployments
* AI Agent now supports Anthropic
* [Support reading PDF files from storage (GCP Only)](../../getting-started/connect-to-data/supported-file-types.md)
* [Data Quality reporting to external storage](../../getting-started/integrations/data-quality-external-reporting.md)
* [Tracking warnings through UI and API](../../admin-apis/troubleshooting.md)
* General UX improvements
* Support reading from Hive metastore
* AI agent improvements

#### API Deprecation

Below APIs have been deprecated:

`/api/data/{tenant}/sources/{source}/batch_data`

`/api/data/v2/{tenant}/sources/{source}/batch_data`

`/api/data/{tenant}/batch_data`

`/api/data/v2/{tenant}/batch_data`

Please use [Trigger Data Scan API](../../api-reference/upload-data-api.md) to trigger data scan.


## October 2025 Release


### Product Changes

* New feature: [Incident tracking](../../getting-started/monitoring-data/monitoring-data.md)
* Updated [login flow](../../getting-started/authentication-and-access-control/auth-access-control.md)
* Updates to [creating policies](../../getting-started/monitoring-data/monitors-management/configuring-notifications.md)
  * Auto ticket creation
  * User-defined `Impact` field
* Updated spark version
* Disabled swagger-ui
* Support tags for resources in Azure deployment
* **Bug fixes:**
  * Group sources: Failing for 25+ group size
  * Unable to access admin page on empty tenants
  * Unable to create connections in `Default` project

### Backfilling Incidents Table via API

For users on versions older than the October 2025 realease, you can backfill the Incidents Table with data from the last 30 days using a new API endpoint. To use this feature, make a POST request to the following endpoint:

`POST https://{actian_domain}/api/backend/{tenant}/incidents/historical`

This request will initiate the backfill process for the corresponding tenant.


## Initial Release (June 2025)

Actian Data Observability enables you to build reliable AI-ready data products, and have extensive visibility into your data.

You can scan every record across your pipeline to gain a holistic understanding of data health—no missed anomalies, no reconciliation gaps.

Actain Data Observability featues:

Connect to any data lake or lakehouse with 250+ connectors
  * [Data Connectors](../../getting-started/connect-to-data/data-connectors/data-connectors.md)

Monitor and analyze data health across your data estate.
  * [Profiling Data](../../getting-started/profiling-data/profiling-data.md)
  * [Data Health Metrics](../../getting-started/profiling-data/data-health-metrics.md)
  * [Data Health Overview Page](../../getting-started/profiling-data/data-health-overview-page.md)

Anomaly detection
  * [Data Diff](../../getting-started/profiling-data/data-diff.md)




