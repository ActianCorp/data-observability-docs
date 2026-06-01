# Data Quality External Reporting

This page explains the Centralized DQ Monitor Scan Reporting feature, which generates a comprehensive, standardized report for every Data Quality (DQ) Monitor scan and appends the results to a designated external table. This mechanism centralizes DQ metrics from various sources and monitors, providing a unified, historical view of data quality performance.

***

## Report Structure (External Destination Table Schema)

The external table is the central repository for all DQ scan results. It provides a standardized format that allows users to query and analyze DQ performance across all projects, data assets, and monitors.

| **Column Name**             | **Data Type**      | **Description**                                                                                                      |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| project\_id                 | `Long`             | Identifier for the project where the data asset resides.                                                             |
| data\_asset\_id             | `String`           | Identifier for the specific data asset (e.g., table/stream) being monitored.                                         |
| monitor\_Id                 | Long               | Unique identifier for the Monitor that performed the check. This is the primary key for tracking the rule execution. |
| scan\_timestamp             | `Timestamp`        | The exact time the DQ job completed execution.                                                                       |
| total\_records\_failed      | `Integer`          | Count of records that failed the specific Monitor's check.                                                           |
| total\_records\_scanned     | `Integer`          | Total count of records processed by the job for this check.                                                          |
| record\_id\_attribute\_name | `String`           | The name of the primary key/ID attribute used to uniquely identify records in the data asset.                        |
| record\_id\_sample          | `Array of Strings` | A sample of up to 100 failed record IDs. This sample aids in immediate investigation and debugging.                  |

***

### **User Actionability**

* To check DQ status: Users should query the External Destination Table, filtering by `data_asset_id` and `scan_timestamp`.
* To debug failures: Users can use the `record_id_sample` along with the `record_id_attribute_name` to look up the failing records directly in the source data asset for diagnosis.

***

## Configuring Reporting

Reporting can only be configured via APIs. Please refer to [DQ Reporting APIs.](../../api-reference/dq-reporting-apis.md)

