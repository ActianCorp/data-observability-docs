# Out-of-the-Box Monitors

Out-of-the-box monitors are automatically enabled when you connect a data source to Data Observability. These monitors provide immediate visibility into your data quality by tracking essential metrics across your tables and datasets. No additional setup is required. Data Observability begins collecting and analyzing these metrics as soon as your asset is connected.

## How Out-of-the-Box Monitors Work

1. **Automatic Availability**: All prebuilt monitors are available immediately upon asset connection
2. **Baseline Learning**: Data Observability establishes normal patterns in your data over initial monitoring cycles
3. **Drift Detection**: Monitors continuously compare current metrics against learned baselines
4. **Alert Generation**: When drifts or anomalies exceed configured thresholds, alerts are triggered
5. **Continuous Adaptation**: Baselines adapt over time to account for legitimate data evolution

## Available Out-of-the-Box Monitors

### **Record Count Drifts**

Detects unexpected changes in the number of records scanned during monitoring cycles. This monitor identifies unusual spikes or drops in data volume.

**Use Case**: Monitor data volume trends and catch pipeline issues, data loss, or unexpected duplicate records.

### **Record Count Correlation Drifts**

Tracks relationships between record counts across related tables or datasets. Alerts when correlations between volumes deviate from expected patterns. This monitor requires assets lineage to be defined in Data Observability first.

**Use Case**: Detect cascading pipeline failures or referential integrity issues affecting multiple related tables.

### **Freshness Drifts**

Tracks changes in data freshness patterns by monitoring the time elapsed since the last table update. Alerts trigger when data becomes stale or update frequencies deviate from predicted patterns.

**Use Case**: Detect when upstream data pipelines experience delays, ensuring your data remains current for analytics and reporting.

### **Completeness Drifts**

Detects unexpected changes in the percentage of complete (non-null, non-empty) values across your data attributes. This monitor alerts you when data completeness patterns deviate from established baselines.

**Use Case**: Identify when upstream data sources begin sending incomplete records, ensuring data reliability for downstream consumers.

### **DQ Rules Violation**

Monitors compliance with defined data quality rules and business logic. This monitor tracks when records fail to meet validation requirements and correctness standards.

**Use Case**: Ensure data accuracy by detecting violations of business rules, data formats, and expected value ranges.

### **Record ID Uniqueness Drifts**

Monitors changes in the uniqueness of configured ID attributes. Detects when duplicate identifiers appear or uniqueness percentages drift from baseline patterns.

**Use Case**: Catch duplicate primary keys that could cause issues in downstream systems or violate database constraints.

### **Uniqueness Drifts**

Tracks changes in the percentage of unique values within specific attributes at the column level.

**Use Case**: Monitor attributes that should contain unique values (such as email addresses, account numbers, or transaction IDs) to detect data quality degradation.

### **Uniqueness Correlation Drifts**

Monitors relationships between uniqueness metrics across different attributes or tables, detecting when correlations deviate from normal patterns. This monitor requires assets lineage to be defined in Data Observability first.

**Use Case**: Identify systemic data quality issues affecting multiple related attributes simultaneously

### **Schema Drifts**

Detects changes to table schemas including added columns or removed columns.

**Use Case**: Track schema evolution and catch breaking changes that could impact downstream applications or analytics queries.

### **Data Drifts**

Monitors overall statistical distributions of data values, detecting when data patterns shift from established baselines.

**Use Case**: Identify fundamental changes in data characteristics that may indicate upstream process changes or data quality issues.

### **Numeric Value Drift**

Tracks changes in numeric value distributions, including mean, median, standard deviation, and other statistical properties.

**Use Case**: Detect anomalies in numeric attributes like revenue figures, quantities, or performance metrics.

### **Top Values Drifts**

Monitors changes in the most frequently occurring values within attributes, detecting shifts in categorical data distributions.

**Use Case**: Identify when dominant categories change unexpectedly, such as sudden shifts in product types, user segments, or geographic distributions.

### **Value Distribution Drifts**

Tracks comprehensive changes in value distributions across all data types, including frequency patterns and outlier detection.

**Use Case**: Monitor complex distribution shifts that might not be captured by simple statistical measures.

### **Data Difference**

Compares data between two sources or time periods to detect discrepancies and changes. Compared-to table must be defined first to see alerts on this table.

**Use Case**: Validate data migrations, compare production vs. staging environments, or track changes between data refreshes.

### **PII Exposure**

Detects potential exposure of Personally Identifiable Information (PII) in datasets where sensitive data should be masked or encrypted.

**Use Case**: Ensure compliance with privacy regulations by monitoring for unexpected PII in non-production environments or public-facing datasets.

### **Data Process Failure**

This monitor is created to group Data Observability-job failures to alert you when Data Observability processes are unable to scan the data.

## Related Documentation

* [User-defined Monitors](user-defined-monitors.md)
* [Monitors Management](monitors-management.md)
* [Incident Management](monitoring-data.md)

