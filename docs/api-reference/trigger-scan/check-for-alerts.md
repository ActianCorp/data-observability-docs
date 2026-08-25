# Check for alerts

APIs to check alert status of a given job.

## Get Alerts for a Specific Job

`POST` `https://{actian_endpoint}/api/backend/{tenant}/configuration/sources/{sourceID}/alerts?job_id={job_id}`

Returns the alerts generated for the specified scan job. Use the `job_id` returned by the [Trigger Scan](./README.md) endpoint.

#### Path Parameters

| Name                                          | Type   | Description       |
| --------------------------------------------- | ------ | ----------------- |
| `tenant`*    | string | Tenant identifier |
| `sourceID`*  | string | Source (asset) ID |

#### Query Parameters

| Name                                         | Type   | Description                      |
| -------------------------------------------- | ------ | -------------------------------- |
| `job_id`*  | string | Job ID returned by Trigger Scan  |

**200**

```json
[
    {
        "type": "<alert_type>",
        "source": "<source_id>",
        "description": "<alert_description>",
        "job_id": "<job_id>",
        "create_time": "<upload_time>",
        "save_time": "<save_time>",
        "is_notification_enabled": true,
        "metric_time": "<metric_time>",
        "metric_value": "<metric_value>",
        "policy_name": "<policy_name>",
        "priority": "<priority_level>",
        "source_name": "<source_name>",
        "source_type": "<source_type>"
    }
]
```