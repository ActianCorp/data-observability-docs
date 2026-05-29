Incidents API
==============

This documentation describes the API endpoints for retrieving and managing incident data.

## List Incidents

This endpoint retrieves a list of incidents, which are aggregations of multiple alerts related to an asset.

| Method | Path                                                       |
| ------ | ---------------------------------------------------------- |
| `GET`  | `https://{actian_endpoint}/api/backend/{tenant}/incidents` |

**Query Parameters (Filters)**

The request supports the following query parameters for filtering the incident list:

| Parameter          | Type                               | Description                                                              | Example                    |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------------ | -------------------------- |
| `project_ids`      | List of Integers (comma-separated) | Filters by a list of Project IDs.                                        | `0,24`                     |
| `connection_types` | List of Strings (comma-separated)  | Filters by asset connection types (e.g., GCS, BIGQUERY).                 | `GCS,BIGQUERY`             |
| `alert_policy_ids` | List of Strings (comma-separated)  | Filters by Alert Policy IDs. (IDs can be strings for prebuilt policies). | `4,5`                      |
| `severities`       | List of Strings (comma-separated)  | Filters by severity (LOW, MEDIUM, HIGH).                                 | `HIGH,MEDIUM`              |
| `impacts`          | List of Strings (comma-separated)  | Filters by impact (LOW, MEDIUM, HIGH).                                   | `HIGH`                     |
| `connection_ids`   | List of Strings (comma-separated)  | Filters by Connection IDs.                                               | `conn-123,conn-456`        |
| `from_time`        | String (ISO 8601 Timestamp)        | Range start timestamp for filtering.                                     | `2025-07-15T12:14:54.123Z` |
| `to_time`          | String (ISO 8601 Timestamp)        | Range end timestamp for filtering.                                       | `2025-07-15T12:14:54.123Z` |
| `text_to_search`   | String                             | A search string applied to policy names and source names.                | `test_policy`              |

Example Request:

```bash
GET: https://{host:port}/api/backend/{tenant}/incidents?project_ids=0,24
```

**Response Body (JSON Array)**

Returns an array of incident objects.

```json
[
  {
    "id": 1311,
    "project_id": 0,
    "asset_id": "5x0e34yk1re4",
    "last_upload_timestamp": "2025-06-30T14:12:51.871Z",
    "created_time": "2025-06-30T14:12:51.871Z",
    "severity": "HIGH",
    "impact": "HIGH",
    "status": "OPEN",           // Can be one of OPEN / CLOSED
    "ticket_id": 2411,
    "alert_policy_id": "4",
    "alert_policy_name": "test_policy",
    "description": "...",
    "tags": ["T1", "PROD"]
  },
  ...
]
```

***

### Get Incident Details

Retrieves the detailed information for a specific incident.

| Method | Path                                                                    |
| ------ | ----------------------------------------------------------------------- |
| `GET`  | `https://{actian_endpoint}/api/backend/{tenant}/incidents/{incidentId}` |

**Path Parameter**

| Parameter    | Type    | Description                    |
| ------------ | ------- | ------------------------------ |
| `incidentId` | Integer | The unique ID of the incident. |

Example Request:

```bash
GET: https://{actian_endpoint}/api/backend/{tenant}/incidents/1311
```

**Response Body (JSON Object)**

In addition to the fields in the list response, this endpoint returns detailed metrics and a history of state changes.

```json
{
  "id": 1311,
  "project_id": 0,
  "asset_id": "5x0e34yk1re4",
  "last_upload_timestamp": "2025-06-30T14:12:51.871Z",
  "severity": "HIGH",
  "impact": "HIGH",
  "status": "OPEN",           // Can be one of OPEN / CLOSED
  "ticket_id": 2411,
  "alert_policy_id": "4",
  "alert_policy_name": "test_policy",
  "description": "...",
  "metrics": [
    {
      "metric_name": "contains_pii",
      "metric_aggregation": "ratio",
      "display_metric_name": "PII %",
      "segment": null,
      "rule": null, // If populated, it indicates a virtual attribute for a correctness policy
      "attribute": null
    },
    ...
  ],
  "tags": ["T1", "PROD"],
  "history": [
    {
      "timestamp": "2025-06-30T14:12:51.871Z",
      "state": "NEW",         // Can be one of NEW / ONGOING / RESOLVED / REOPENED
      "alert_refs": [
        {"metric_time":"2025-06-30T14:12:51.871Z", "violation_name":"FEATURE.s132j7ja1"},
        ...
      ]
    }
  ]
}
```

***

### Incidents Distribution

This endpoint retrieves a day-by-day distribution of incident counts, categorized by severity and impact.

| Method | Path                                                                    |
| ------ | ----------------------------------------------------------------------- |
| `GET`  | `https://{actian_endpoint}/api/backend/{tenant}/incidents/distribution` |

Filters: This endpoint supports the same filter set as the Incidents List endpoint.

**Response Body (JSON Object)**

```json
{
  "incidents": [
    {
      "date": "2025-07-22",
      "counts": {
        "LOW": 1,
        "MEDIUM": 4,
        "HIGH": 6,
        "": 8 // Incidents without a specified severity/impact
      },
      "counts_by_impact": {
        "LOW": 1,
        "MEDIUM": 4,
        "HIGH": 6
      }
    },
    ...
  ]
}
```

***

### Incidents Summary

Retrieves overall summary statistics for incidents.

| Method | Path                                                         |
| ------ | ------------------------------------------------------------ |
| `GET`  | `https://{host:port}/api/backend/{tenant}/incidents/summary` |

**Response Body (JSON Object)**

| Field                           | Type    | Description                                           |
| ------------------------------- | ------- | ----------------------------------------------------- |
| `total`                         | Integer | Total number of incidents.                            |
| `open`                          | Integer | Total number of OPEN incidents.                       |
| `closed`                        | Integer | Total number of CLOSED incidents.                     |
| `mean_time_to_resolve`          | Integer | Average time to resolve incidents (in hours).         |
| `previous_mean_time_to_resolve` | Integer | Previous period's average time to resolve (in hours). |
| `open_by_tag`                   | Object  | Count of OPEN incidents grouped by tag.               |
| `closed_by_tag`                 | Object  | Count of CLOSED incidents grouped by tag.             |


```json
{
  "total": 25,
  "open": 6,
  "closed": 19,
  "mean_time_to_resolve": 122,
  "previous_mean_time_to_resolve": 117,
  "open_by_tag": {
    "T1": 3,
    "prod": 12
  },
  "closed_by_tag": {
    "T1": 12,
    "prod": 67
  }
}
```

***

### Retrieving Alerts for an Incident

An Incident is an aggregation over time and refers to multiple uploads and alert objects, whereas an Alert refers to a specific upload and violation. To retrieve the individual alerts that compose an incident, you must use the `alert_refs` from the incident's history.

#### POST Retrieve Alerts by Filters

| Method | Path                                                                       |
| ------ | -------------------------------------------------------------------------- |
| `POST` | `https://{host:port}/api/backend/{tenant}/configuration/alerts/by_filters` |

**Request Body (JSON Object)**

The request body is constructed using data extracted from the incident's `asset_id` and the `alert_refs` array (found within the `history` of the detailed incident response).

Example:

If an incident has an `asset_id` of `"5x0e34yk1re4"` and the following `alert_refs`:

```json
"alert_refs": [
  {"metric_time":"2025-06-30T14:12:51.871Z", "violation_name":"FEATURE.s132j7ja1"},
  {"metric_time":"2025-06-30T14:13:55.325Z", "violation_name":"DATA.a531"}
]
```

The request body should be:

```json
{
  "sources": ["5x0e34yk1re4"], // The asset_id from the incident
  "upload_dates": ["2025-06-30T14:12:51.871Z", "2025-06-30T14:13:55.325Z"], // metric_time from alert_refs
  "violation_names": ["FEATURE.s132j7ja1", "DATA.a531"] // violation_name from alert_refs
}
```

**Alert Object Structure**

The endpoint returns an array of detailed Alert objects.

```json
{
  "type": "SCHEMA_CHANGE",
  "source": "SNOWFLAKE.SALES_DB.PUBLIC.CUSTOMER_ORDERS",
  "attribute": "SHIPPING_ADDRESS",
  "job_id": "job-f8e2-4a1b-9c3d-5e6f7a8b9c0d",
  "create_time": "2023-10-27T10:30:00.123Z",
  "save_time": "2023-10-27T10:30:05.456Z",
  "violation_data": {},
  "violation_name": "Customer Orders Schema Drift",
  "notification_channels": ["critical-alerts-slack", "data-team-email"],
  "is_notification_enabled": true,
  "metric_time": "2023-10-27T10:25:00.000Z",
  "is_notified": false,
  "metric_value": 1.0,
  "policy_name": "Monitor Production Schemas",
  "segment": "USA",
  "priority": "HIGH",
  "description": {
    "HIGH": [
      "The data type for column 'SHIPPING_ADDRESS' was changed from VARCHAR(255) to VARCHAR(512)."
    ]
  },
  "source_name": "CUSTOMER_ORDERS",
  "source_type": "SNOWFLAKE",
  "project_name": "E-commerce Analytics",
  "tags": ["production", "schema", "customer-data"]
}
```
