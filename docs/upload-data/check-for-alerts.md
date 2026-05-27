Check for alerts
=================

APIs to check alert status of a given job

## Get alerts status for a specific Job Id

`GET` `https://data-observability.actian.com/api/backend/{tenant}/configuration/alerts?job_id={job_id}`

This endpoint gets you the status of the job from Upload data APIs

### Path Parameters

| Name     | Type   | Description                 |
| -------- | ------ | --------------------------- |
| job\_id* | string | Job Id from Upload data API |
| tenant*  | string | Name of Tenant              |

### Headers

| Name            | Type   | Description      |
| --------------- | ------ | ---------------- |
| Content-type*   | string | application/json |
| Authentication* | string | Bearer {token}   |

**200 An array of alerts**
```
[
    {
        "type": "<alert_type>",
        "source": "<source_id>",
        "description": { "<alert description>"
        },
        "job_id": "<job_id>",
        "create_time": "<upload time>,
        "save_time": "<save_time>",
        "is_notification_enabled": <trye/false>,
        "metric_time": "<metric_time>",
        "metric_value": <metric_value>,
        "policy_name": "<policy_name>",
        "priority": "<priority_level>",
        "source_name": "<source_name>",
        "source_type": "<source_type>"
    },
    {
        "type": "<alert_type>",
        "source": "<source_id>",
        "description": { "<alert description>"
        },
        "job_id": "<job_id>",
        "create_time": "<upload time>,
        "save_time": "<save_time>",
        "is_notification_enabled": <trye/false>,
        "metric_time": "<metric_time>",
        "metric_value": <metric_value>,
        "policy_name": "<policy_name>",
        "priority": "<priority_level>",
        "source_name": "<source_name>",
        "source_type": "<source_type>"
    }
]
```
