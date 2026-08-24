# Release Notes

## August 2026 Release

### Product Changes

**Major Changes**

* [Asset Manager](../../getting-started/connect-to-data/managing-assets.md) page is now enabled by default, and the legacy assets page has been disabled
* Simplified [Actian Data Observability MCP server](../../getting-started/integrations/mcp-server.md) deployment — an OAuth client secret is no longer required to connect a client such as Claude, and SSO is now supported

**General Improvements**

* General UI look and feel updates across the application, including logged-in user details now visible in the UI
* Metadata scan enabled by default for all SQL-type sources
* [Managed identity support for Azure SQL Server](../../getting-started/connect-to-data/data-connectors/sql-server-managed-identity.md) — authenticate with a Microsoft Entra managed identity instead of a stored password (Azure deployments only)

**Bug Fixes**

* General fixes and improvements

## July 2026 Release

### Product Changes

**Major Changes**

* [Monitor Recommendations](../../getting-started/monitoring-data/monitors-management/monitor-recommendations.md) — AI Agent-powered rule and metric suggestions for connected assets (requires the AI Agent to be installed)
* [Actian Data Intelligence catalog integration](../../integrations/catalog-integration/zeenea.md)
* [New assets page](../../getting-started/connect-to-data/managing-assets.md)

**General Improvements**

* Improved connections page, adding a test button for supported connections
* Metascan enabled by default for BigQuery assets
* Workload identity support for AWS
* Patch1: Support CDC for Iceberg REST
* Patch2: General performance improvement

**Bug Fixes**

* General fixes and improvements

**Deprecations**

* Group Source API has been deprecated. In the UI, users can no longer create groups of assets.

## May 2026 Release

### Product Changes

**Major Changes**

* [Hive Metastore connector](../../getting-started/connect-to-data/data-connectors/iceberg.md)
* [MySQL connector](../../getting-started/connect-to-data/data-connectors/mysql.md)
* [DQ score available in UI](../../getting-started/monitoring-data/data-quality-score.md)
* Metadata scans for Trino connector
* Support MSK as Kafka replacement in AWS

**General Improvements**

* Investigator is now disabled by default

**Bug Fixes**

* DQ report displaying #null
* Overview page was not displaying renamed monitor name

## April 2026 Release

### Product Changes

* [New API for setting spark params and node type](../../api-reference/spark-job-config-api.md)
* [Jira template UI](../../getting-started/integrations/jira-integration.md)
* [DQ Report Summary](../../getting-started/monitoring-data/dq-report-summary.md)
* [SQL Based Rules](../../getting-started/monitoring-data/user-defined-monitors/sql-based-rules.md)
* [Iceberg REST support](../../getting-started/connect-to-data/data-connectors/iceberg-rest.md)
* Deprecations:
  * Data append scans

## March 2026 Release

### Product Changes

* [Replay scan feature](../../getting-started/monitoring-data/user-defined-monitors/replay-scan.md)
* GCP: Support for impersonated service accounts at tenant level
* Deprecations:
  * Accuracy calculations

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

**API Deprecation**

Below APIs have been deprecated:

`/api/data/{tenant}/sources/{source}/batch_data`

`/api/data/v2/{tenant}/sources/{source}/batch_data`

`/api/data/{tenant}/batch_data`

`/api/data/v2/{tenant}/batch_data`

Please use [Trigger Data Scan API](../../api-reference/trigger-scan/README.md#trigger-data-scan) to trigger data scan.


## October 2025 Release


### Product Changes

* New feature: [Incident tracking](../../getting-started/monitoring-data/README.md)
* Updated [login flow](../../getting-started/authentication-and-access-control/README.md)
* Updates to [creating policies](../../getting-started/monitoring-data/monitors-management/configuring-notifications.md)
  * Auto ticket creation
  * User-defined `Impact` field
* Updated spark version
* Disabled swagger-ui
* Support tags for resources in Azure deployment

**Bug fixes:**

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

  * [Data Connectors](../../getting-started/connect-to-data/data-connectors/README.md)

Monitor and analyze data health across your data estate

  * [Profiling Data](../../getting-started/profiling-data/README.md)
  * [Data Health Metrics](../../getting-started/profiling-data/data-health-metrics.md)
  * [Data Health Overview Page](../../getting-started/profiling-data/data-health-overview-page.md)

Anomaly detection

  * [Data Diff](../../getting-started/profiling-data/data-diff.md)




