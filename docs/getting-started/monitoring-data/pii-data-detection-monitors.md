# PII Data Detection Monitors

The Data Observability Platform's PII Data Detection feature enables identification of Personally Identifiable Information (PII) within monitored attributes. This functionality helps organizations proactively manage data privacy risks by detecting and alerting PII exposure, ensuring compliance, and enhancing data governance.

<figure><img src="../assets/monitors.png"></figure>

To enable PII data detections, in **Alerting Monitors** page:

1. Select the **PII Exposure Monitor**.
2. Enable the policy (disabled by default).
3. Optionally, limit the scope to specific attributes for focused detection.

[Learn more about Managing Monitors](monitors-management/)<br>

### What happens when PII data is detected

If Data Observability detected the presence of PII data, you will see created alerts and incidents similar to below image:

<figure><img src="../assets/image_116.png" alt=""><p>In the picture above it detected PII Exposure in attribute “comment 2“. By clicking on the attribute name it will navigate to Investigator page to inspect values which were detected as violations</p></figcaption></figure>

You can also learn more about what PII data the platform detects by navigating to the Investigator page.  The Values table will show you true and false values for detections as “Contains PII” or “Contains Phone”.

<figure><img src="../assets/image_117.png" alt=""><p>In the example above Contains PII field displays true for 2 of the values, which means it contains PII data. Same for other fields, representing other classes of PII Data, ex. Credit Card Number, Phone etc.</p></figcaption></figure>

## PII Data Validation Rules

Data Observability's rules engine supports custom validation and remediation of PII data violations. This includes actions like segregating PII-exposing records using [Data Binning](../remediation/data-binning.md).

To learn more about creating these rules, please visit our [Record Validation Rules ](user-defined-monitors/record-validation-rules/)documentation

## Related Documentation

* [User-defined Monitors](user-defined-monitors/)
* [Monitors Management](monitors-management/)
* [Incident Management](./)

