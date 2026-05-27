# Data Health Metrics


Actian Data Observability automatically calculates a comprehensive set of health metrics to monitor your data. These metrics include:

| **Column**           | **Description**      |
| -------------------- | -------------------- |
| _Total Record Count_ | The total size of the monitored table. This is only available when CDC is enabled (i.e., the “delta only” flag is on). If the flag is off or the monitored source is not an SQL database, this field will be set to N/A.  |
| _Record Count_       | Reflects the size of the delta when CDC is enabled; otherwise, it represents the size of the entire dataset. |
| _Completeness_       | Percentage of non-null/missing/placeholder values, tracked at both the data source and attribute levels:<br/>- Attribute level: Percentage of records where the attribute is not null, empty, or a placeholder (e.g., N/A)<br/>- Data Source level: Compounded average of attribute-level completeness within a data source |
| _Correctness_        | Correctness is tracked both at the data source and attribute levels. Correctness is calculated only for attributes where Expectations are set, otherwise, the default is 100%.<br/>- Attribute level: Percentage of records where the attribute meets all set expectations.<br/>- Source level: Compounded average of attribute-level correctness within a data source. |
| _Freshness_          | Freshness is tracked both at data source and record level.<br/>- Record level: Determined by setting an expectation on a timestamp attribute (e.g., “Record Update Date” should be no more than one month old). Configure this in the Advanced section of the Edit Connection menu.<br/>- Table level:Based on the time since the table was last updated. |
| _Uniqueness_         | Uniqueness of the records based on an ID attribute. The KPI measures the ratio of records with unique id versus the total number of records. For example, if out of 10 records, there are 2 records sharing the same value the uniqueness is 80%.An attribute can be marked as an ID attribute in the Advanced section of the Edit Connection menu. If ID attribute is not configured this KPI will be N/A |
| _Accuracy_           | The accuracy of the values is determined through analysis of historical data. It detects discrepancies when current values deviate from predictions.<br/><br/>For example, if the revenue for the company Acme Inc was slowly growing from $4M to $5M over the past year, but in today’s observation it’s 20M, then such a value is considered inaccurate. Accuracy is only calculated for attributes that have “Custom Metrics” Configured, otherwise, the default is 100%.<br/>- Attribute level: Ratio of dimensions with no drift detected to the total number of dimensions. If multiple custom metrics are defined, the minimum accuracy is used.<br/>- Data Source level: Compounded average of attribute-level accuracy within a data source. |

These metrics can be found in different places across the application, depending on the scope you’re looking at. In case lightweight scan is enabled, only a subset of these metrics are measured based on the source type.
