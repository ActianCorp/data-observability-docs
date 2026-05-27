# Metrics Exclusions

The Metric Point Exclusion feature allows users to remove specific data points from analysis while maintaining historical visibility and keeping monitors active. This is particularly useful when a single scan produces anomalous results that should not influence future predictions or trigger alerts.

## Common Use Case

Consider a scenario where you're monitoring multiple metrics (record count, freshness, completeness). During a specific scan, the freshness metric reports an incorrect value due to a temporary system issue, but all other metrics are normal. Rather than disabling the entire freshness monitor, you can exclude just that single metric point from future analysis.

## Key Capabilities

### What Happens When You Exclude a Metric Point

* **Alert Status**: The associated alert/metric-point from the scan is marked as "excluded"
* **Incident Display**: The metric-point shows as disabled in the corresponding incident
* **Historical Data**: All historical data remains intact and viewable for audit purposes
* **Monitor Status**: The underlying monitor continues to run normally
* **Other Alerts**: Alerts from the same scan for different metrics remain active
* **Future Analysis**: The excluded point is removed from future predictions and threshold calculations
* **Visibility**: Excluded metrics are clearly marked and can be reviewed at any time

### What Happens When You Re-include a Metric Point

* **Alert Reactivation**: The associated alert is marked as "active" again
* **Future Analysis**: The re-included metric-point is used in subsequent scan analysis

## Limitations

### Supported Monitors

The exclusion feature works with all monitor types with exception to (Schema drifts, Top value alerts, and Distribution alerts).

### Other Limitations

1. **Alert Requirement**: Currently, you can only exclude a metric point if an alert has been generated for it. Future versions will allow exclusion from plotted metrics without alerts
2. **Segment Support**: This feature is not available for Segments.&#x20;

## Usage

To exclude a metric point,&#x20;

1. Navigate to **Trends Page**
2. Select your target asset
3. Select the associated monitor and and alert
4. Click the checkmark to exclude the metric. You will be prompted to confirm exclusion. Only supported metrics will allow you to exclude the metric

<figure><img src="../assets/metric_exclude.png" alt=""></figure>
