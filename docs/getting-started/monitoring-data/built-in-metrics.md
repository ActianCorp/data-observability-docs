##### Built-in Metrics

These metrics are calculated in Data Observability out-of-box.

|Metric|Description|
|----------|----------|
|Total Record Count|The total size of the monitored table. This is only available when CDC is enabled (i.e., the “delta only” flag is on). If the flag is off or the monitored source is not an SQL database, this field will be set to N/A.|
|Record Count|If CDC is enabled it reflects the size of the delta, otherwise, it's the size of the entire set of data.|
|Completeness|<p>Percentage of not null/missing/placeholder values. Completeness is tracked both at the data source level as well as the attribute level:</p><ul><li>Attribute level: percent of records where the attribute value is not null, not empty, or not one of the user-defined placeholders like N/A.</li><li>Data Source level: the compounded average of all attribute level completeness within a data source.</li></ul>|
|Freshness|<p>Freshness is tracked both at data source and record level.</p><ul><li>Record level freshness is defined by setting an expectation on a timestamp attribute within the data source (e.g.,. “Record Update Date” attribute to be no more than 1 month from now). To mark an attribute as a timestamp use the Advanced section of the Edit Connection menu. If the timestamp attribute is not configured this KPI will be N/A.</li><li>Table level freshness is based on the time since the table was last updated</li></ul>|
|Uniqueness|<p>Uniqueness of the records based on an ID attribute. The KPI measures the ratio of records with unique id versus the total number of records. For example, if out of 10 records, there are 2 records sharing the same value the uniqueness is 80%.</p><p>An attribute can be marked as an ID attribute in the Advanced section of the Edit Connection menu. If ID attribute is not configured this KPI will be N/A</p>|
|Contains PII|<p>Value contains PII pattern for either of:</p><ul><li>Credit cards</li><li>IP Addresses</li><li>Social security numbers</li><li>Phone numbers</li><li>Zip codes</li><li>Email</li><li>Credit card</li></ul>|
|Length|String length|

