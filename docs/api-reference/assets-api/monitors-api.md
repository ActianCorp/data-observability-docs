# Monitors API

The Monitors API allows you to programmatically manage data quality monitors for specific assets. You can create, update, list, and delete monitors to track metrics, predefined data quality indicators, or custom business rules.

***

## Create a New Monitor

<mark style="color:green;">`POST`</mark> `{config_endpoint}/{tenant}/configuration/assets/{assetId}/monitors`

Use this endpoint to create a new monitor. The structure of the `monitor` object changes based on the `type` selected.

#### Request Body Schema

The request body is a JSON object containing the high-level configuration for the monitor.

| `type`         | String  | Yes | The category of monitor. Options: `PREDEFINED_METRIC`, `METRIC`, or `RULE`. |
| -------------- | ------- | --- | --------------------------------------------------------------------------- |
| `name`         | String  | Yes | A unique, descriptive name for the monitor.                                 |
| `enabled`      | Boolean | Yes | Whether the monitor is active and running.                                  |
| `description`  | String  | No  | Additional context about the monitor's purpose.                             |
| `impact`       | String  | No  | Severity level of an incident. Options: `LOW`, `MEDIUM`, `HIGH`.            |
| `monitor`      | Object  | Yes | The specific logic/expression (schema varies by type). See below.           |
| `threshold`    | Object  | Yes | Defines when an alert is triggered (ML or Static).                          |
| `ticketing`    | Object  | No  | Integration settings for external tools like JIRA.                          |
| `notification` | Object  | No  | Settings for alert delivery (e.g., email, Slack).                           |

#### The "monitor" Object Detail

The internal structure of the `monitor` field depends on the `type` defined in the root of the request:

**Type: PREDEFINED\_METRIC**

Used for out-of-the-box metrics.

```json
"monitor": {
    "predefined_metric": "COMPLETENESS",
    "attributes": ["ACCOUNT_ID"]
}
```

**Type: METRIC**

Used for custom SQL-based calculations across an asset.

```json
"monitor": {
    "expression": "avg(`LATEST_YEAR_ANNUAL_RETURN`) group by `COMPANY_CATEGORY`",
    "options": { "ignore_nulls": true },
    "raw_sql": false
}
```

**Type: RULE**

Used for row-level validations. Can be defined via a custom DSL expression or a Template ID.

```json
// Example using DSL Expression
"monitor": {
    "expression": "validate a1 expect is_date_time",
    "options": { "ignore_nulls": false, "empty_values": [] },
    "variables": [{ "name": "a1", "type": "REFERENCE", "value": ["DUE_DATE"] }]
}

// Example using Template
"monitor": {
    "template_id": 46,
    "variables": [{ "name": "a1", "type": "REFERENCE", "value": ["DUE_DATE"] }]
}
```

### Threshold Object

The `threshold` object determines the logic used to trigger an incident. Data Observability supports both Machine Learning (ML) based anomaly detection, relative and static thresholding.

| `threshold_type`         | String  | <p>The threshold type. Options: </p><ul><li><code>ML</code>  (anomaly detection), </li><li><code>STATIC</code> (specific bounds)</li><li><code>RELATIVE</code> (relative change by %)</li></ul><p><a href="../monitoring-data/user-defined-monitors/">Learn more about thresholds.</a></p> |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `threshold1`             | Number  | The lower bound for static or relative thresholds                                                                                                                                                                                                                                          |
| `threshold2`             | Number  | The upper bound for static or relative thresholds                                                                                                                                                                                                                                          |
| `extrapolation_strategy` | String  | How to handle missing data points. Options: `IGNORE`, `ZERO`, `AVERAGE`.                                                                                                                                                                                                                   |
| `history_limit`          | Integer | The number of historical data points the ML model or relative should consider (20 for default).                                                                                                                                                                                            |

### Notification Object

The `notification` object defines whether alerts should be pushed to external communication channels.

| `send_notifications`         | Boolean | If `true`, notifications will be triggered when an incident is created.                    |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `notification_channel_names` | Array   | List of pre-configured channel names (e.g., `["Slack-Data-Engineering", "Email-Alerts"]`). |

### Ticketing Object

The `ticketing` object manages the automatic creation of tasks in external project management tools like JIRA.

| `type`               | String  | The ticketing system type. Currently supports `JIRA` only               |
| -------------------- | ------- | ----------------------------------------------------------------------- |
| `create_ticket`      | Boolean | If `true`, a ticket is automatically generated upon incident detection. |
| `ticket_template_id` | Integer | The ID of the specific  template to use for the ticket structure.       |

### Example Request Body

```json
{
    "type": "METRIC", // Options: PREDEFINED_METRIC, METRIC, RULE
    "enabled": true,
    "name": "metricPol2",
    "description": "Monitor description here",
    "impact": "LOW",
    "tags": null,
    "monitor": {
        "expression": "avg(`LATEST_YEAR_ANNUAL_RETURN`) group by `COMPANY_CATEGORY`",
        "options": {
           "ignore_nulls": true
         },
        "raw_sql": false
    },
    "threshold": {
      "threshold_type": "ML",
      "threshold1": null,
      "threshold2": null,
      "extrapolation_strategy": "IGNORE",
      "history_limit": 0
    },
    "ticketing": {
      "type": "JIRA",
      "ticket_template_id": null,
      "create_ticket": null
    },
    "notification": {
      "send_notifications": false,
      "notification_channel_names": null
    }
}
```

!!! warning
    **IMPORTANT**

    Immutable Field: The monitor type cannot be changed after creation. The request body for an update is identical to the creation body but must omit the type field.the creation body but must omit the type field.

***

## Update Monitor

<mark style="color:green;">`PUT`</mark> `{config_endpoint}/{tenant}/configuration/assets/{assetId}/monitors/{monitorId}`

Updates an existing monitor's configuration. Payload will be same as the [Create New Monitor payload](monitors-api.md#create-a-new-monitor) with exception to `type` as it's immutable.

***

## List Monitors

<mark style="color:green;">`GET`</mark> `{config_endpoint}/{tenant}/configuration/assets/{assetId}/monitors`

Returns an array of all monitors associated with the specified asset.

#### Response Object Definition

Each item in the returned array is a Monitor Object containing:

* **Identification**: `id` (unique integer), `name`, and `description`.
* **Configuration**: The full `monitor` logic, `type` (METRIC, RULE, etc.), and `enabled` status.
* **Incident Management:** `threshold`, `ticketing`, and `notification` settings.
* **Audit Metadata:** `created_by` (email) and `created_at` (ISO timestamp).

**Response Example:**

```json
[
  {
    "id": 3419,
    "type": "RULE",
    "enabled": true,
    "name": "corrPol2",
    "monitor": { ... },
    "created_by": "user@actian.ai",
    "created_at": "2025-11-07T07:27:05.730Z"
  }
]
```

***

## Get Monitor Details

<mark style="color:green;">`GET`</mark> `{config_endpoint}/{tenant}/configuration/assets/{assetId}/monitors/{monitorId}`

Retrieves the full configuration, metadata, and audit trail (created/modified) for a specific monitor.

### Response Object Definition

This returns a comprehensive Monitor Object which includes all fields found in the "List" response, plus additional audit fields:

* `modified_by`: The email of the last user to update the monitor.
* `modified_at`: The ISO timestamp of the last modification.
* `impact`: The severity level assigned to the monitor (e.g., LOW, MEDIUM, HIGH).
* `tags`: Any user-defined metadata tags associated with the monitor.

***

## Delete Monitor

<mark style="color:red;">`DELETE`</mark> `{config_endpoint}/{tenant}/configuration/assets/{assetId}/monitors/{monitorId}`

Permanently removes a monitor from the asset configuration.

**Response:**

```json
{
    "message": "Monitor successfully deleted"
}
```

***

## Error Codes

The API uses standard HTTP status codes to indicate the success or failure of requests.

| **Status Code**    | **Description**                              | **Possible Causes**                                                                                       |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `400 Bad Request`  | The request was invalid or cannot be served. | Missing required fields, invalid SQL/DSL expression, or attempting to change the `type` in a PUT request. |
| `401 Unauthorized` | Authentication failed.                       | Invalid or expired API token.                                                                             |
| `403 Forbidden`    | Permissions error.                           | The user does not have access to the specified tenant or asset.                                           |
| `404 Not Found`    | Resource not found.                          | The `assetId` or `monitorId` does not exist.                                                              |
