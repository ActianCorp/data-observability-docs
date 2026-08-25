# Troubleshooting

This document outlines the steps an Admin User should follow to triage and resolve background issues. Currently this feature is only supported for Jira integration issues.

!!! note
    Only Admin users can access this feature.

## Health Check (UI Method)

A quick way to check the current status of the integrations.

1. Navigate to Data Observability UI with Admin user, and specify your tenant.
2. On the top right menu, click the warnings icon.
3. This will list any open issues if existing

## Deeper Diagnosis (API Method)

For issues that aren't immediately clear from the UI or for checking deeper job details, use the Data Observability API.

* Method: `GET`
* URL: `{config_endpoint}/{tenant}/errors`
* Authentication: Requires a valid Admin user token.

### Query Parameters

| **Parameter** | **Type** | **Description**                                                                            | **Required** | **Default** |
| ------------- | -------- | ------------------------------------------------------------------------------------------ | ------------ | ----------- |
| `limit`       | Integer  | Maximum number of error records to return. Used for pagination and managing response size. | False        | 100         |

***

### Response

* Status Code: `200 OK`
* Body: A JSON array of error objects, ordered by `timestamp` in descending order (most recent first).

**Response Body Schema**

The response is a list of objects, each representing a single background error event:

JSON

```json
[
  {
    "timestamp": "2025-10-28T14:01:00.000Z",
    "error_class": "INTEGRATION_JIRA", 
    "message": "Some error...",
    "exception_type": "RuntimeException",
    "stack_trace": "additional multiline info...."
  },
  // ... more error objects
]
```

**Field Definitions**

| Field        | Description                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `timestamp`      | The exact time the error occurred.                                                                                                       |
| `error_class`    | Categorization of the error source. Possible values: <br/>`INTEGRATION_JIRA` : Error related to ticket creation/updates. |
| `message`        | A concise, human-readable summary of the error.                                                                                          |
| `exception_type` | The underlying programmatic exception type.                                                                                              |
| `stack_trace`    | Detailed technical information, including the call sequence.                                                                             |

***

### Example Usage

This example retrieves the 5 most recent errors from the `prod_tenant`.

**Request**

HTTP

```
GET /my-actian-backend/prod_tenant/errors?limit=5
```

**Response (Abbreviated)**

JSON

```json
[
  {
    "timestamp": "2025-10-28T14:01:00.000Z",
    "error_class": "INTEGRATION_JIRA",
    "message": "Failed to create issue: Field 'priority' is required.",
    "exception_type": "JiraServiceException",
    "stack_trace": "..."
  }
]
```
