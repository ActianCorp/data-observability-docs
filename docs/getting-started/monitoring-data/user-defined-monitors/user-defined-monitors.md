# User-defined Monitors


User-defined monitors are policies that define the expected state or behavior of your data. When data deviates from these policies, alerts are automatically triggered to notify your team. Monitors help you proactively manage data quality by continuously evaluating metrics, rules, and custom queries against your data assets.

When creating a user-defined monitor, you must attach it to an asset, and define the following components:

* **Metric:** A quantifiable measure of data health (e.g., row count, null percentage, data freshness).
* **Threshold:** A predefined value or range that, when exceeded, triggers an alert. Thresholds can be:
    * **Automatic**: ML-based thresholds that analyze historical datapoints to determine dynamic boundaries
    * **Relative**: Percentage-based boundaries that calculate moving averages from historical data
    * **Absolute**: Constant, fixed boundaries
* **Notification endpoints:** Which endpoints to notify when the monitor is alerting (Optional)

## Monitor Types

Data Observability supports three primary monitor types, each designed for different data quality scenarios:

* [Built-in Metric](./#built-in-metric)
* [User-Defined Metric](./#user-defined-metric)
* [Record Validation Rule](./#record-validation-rule)

### Built-in Metric

Monitor [built-in metrics](built-in-metrics.md) managed by the Data Observability platform.

**Use cases:**

* Track predefined data quality metrics (row count, null percentage, data freshness, completeness, etc.)
* Monitor standard data health indicators across your datasets
* Leverage out-of-the-box metrics without custom configuration

**Example:**

* Monitor `record_count` to ensure tables are being populated
* Check `freshness` to detect data delays

## User-Defined Metric

Define and monitor custom metrics using [Metric Expressions ](user-defined-metrics.md#metric-expressions)or [push-down custom SQL](user-defined-metrics.md#raw-sql-queries).

**Use cases:**

* Create custom calculations and aggregations
* Monitor business-specific KPIs
* Define complex metric logic using SQL queries

**Example expression:**

```sql
SUM(salary)/COUNT(*)
```

**Example custom SQL:**

```sql
SELECT emp_salary, emp_Region FROM `employee_table` WHERE emp_Age > 60
```

## Record Validation Rule

Define record validation checks and monitor the number of records passing these checks.

**Use cases:**

* Validate individual records against business rules
* Ensure data integrity at the row level
* Check data completeness and correctness across records
* Monitor the percentage of valid records over time

**Example expression:**

```
validate part_date expect is_date
```

The monitor tracks the percentage of records that pass the validation rule, and alerts are triggered when this percentage falls outside acceptable thresholds.

Click [here](record-validation-rules.md) to learn more about using and creating Data Quality rules.

***

## Monitor Properties

Each monitor has the following properties:

| Property                    | Description                                                                                                                   | Required       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **Monitor Name**            | Must be unique per asset (e.g., "Freshness Monitor" on `sales_data` is different from "Freshness Monitor" on `customer_data`) | Yes            |
| **Monitor ID**              | System-generated unique identifier                                                                                            | Auto-generated |
| **Monitor Type**            | Built-in Metric, User-Defined Metric, or Record Validation Rule (cannot be changed after creation)                            | Yes            |
| **Description**             | Brief description for additional context                                                                                      | Optional       |
| **Monitor Tags**            | Tags for organizing and categorizing monitors                                                                                 | Optional       |
| **Impact**                  | Severity level of the monitor (Critical, High, Medium, Low)                                                                   | Optional       |
| **Data Quality Metric**     | For Built-in Metrics: the specific metric to monitor                                                                          | Conditional    |
| **Attributes**              | For metrics that support scope: specific attributes to monitor                                                                | Conditional    |
| **Threshold Configuration** | Automatic, Acceptable Drift %, or Acceptable Range                                                                            | Yes            |
| **Creator/Editor**          | User who created or last modified the monitor                                                                                 | Auto-tracked   |
| **Creation/Update Time**    | Timestamp of creation and last update                                                                                         | Auto-tracked   |
| **History**                 | Version history of monitor changes                                                                                            | Auto-tracked   |

**Note:** Monitor type can not be changed once set. To change the type, you must create a new monitor.


## Related Documentation

* [Built-in Metrics](built-in-metrics.md)
* [User-defined Metrics](user-defined-metrics.md)
* [Record Validation Rules](record-validation-rules.md)
* [Monitors Management](../monitors-management/monitors-management.md)
* [Incident Management](../monitoring-data.md)
