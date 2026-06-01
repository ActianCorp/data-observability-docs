# Monitoring Data

Monitors are policies that define the expected state or behaviour of your data. When data deviates from these policies, alerts are automatically triggered to notify your team. Monitors help you proactively manage data quality by continuously evaluating metrics, rules, and custom queries against your data assets.

## Key Concepts

* A **Monitor** is a policy that defines the expected state or behaviour of your data. It continuously evaluates metrics, rules, or custom queries against your data assets. When data deviates from the defined policy (violates a threshold), the monitor generates an **alert.**
* An **Alert** is the initial notification that a system's metric has violated a predefined threshold. It's an automatic signal that something is amiss, such as a spike in CPU usage or a high number of transaction failures.
* An **Incident** is a broader event that is triggered by one or more alerts. It represents an ongoing issue that requires investigation and resolution. A single incident may contain multiple, related alerts that help tell the story of the problem.

Think of it this way: a single data point violating a threshold generates an Alert. When multiple alerts occur that are related to the same problem, they can be grouped into a single Incident to provide a consolidated view of the issue.

Once an asset is connected to Telmai, Telmai will start monitoring the asset's health with the [out-of-box monitors](../../getting-started/monitoring-data/out-of-box-monitors.md). At any time, users can build and [customize their own monitors](../../getting-started/monitoring-data/user-defined-monitors/user-defined-monitors.md).

If alerts and incidents are generated, user can navigate to the [Incident Portal ](../../getting-started/monitoring-data/incident-portal.md)to learn more about the underlying issues.

## Related Documentation

* [Out-of-box Monitors](../../getting-started/monitoring-data/out-of-box-monitors.md)
* [User-defined Monitors](../../getting-started/monitoring-data/user-defined-monitors/user-defined-monitors.md)
* [Monitors Management](../../getting-started/monitoring-data/monitors-management/monitors-management.md)
* [Incident Portal](../../getting-started/monitoring-data/incident-portal.md)
* [Data Trends and Alerts](../../getting-started/monitoring-data/data-trends-and-alerts.md)
