# DQ Reporting APIs

This section details the API endpoints used to configure and enable the Centralized DQ Monitor Scan Reporting feature. This configuration dictates where the reports are written.

## Update Configuration

Use the `PUT` endpoint to enable the reporting feature and specify the external destination table location.

`PUT` `https://{config_endpoint}/{tenant_id}/configuration/dq_reporting`

**Request Body**

The request body specifies the connection and path for the external destination table.

```json
{
    "enabled": true,
    "path": "path/to/output",
    "connection_id": 60529
}
```

| **Field**       | **Type**  | **Description**     | **Notes**                 |
| --------------- | --------- | ------------------------------- | ------------- |
| `enabled`       | `Boolean` | Set to `true` to activate the centralized reporting feature.     | If `false`, no reports will be generated.   |
| `path`          | `String`  | The relative path within the storage bucket/container where the report data will be written.<br>The path MUST exist in storage | Example: `"dq_test"` will result in reports being written to `s3a://<bucket>/dq_test` or `gs://<bucket>/dq_test`.              |
| `connection_id` | `Integer` | The ID of the globally configured storage connection to use as the destination.      | This must be a Global Connection configured for cloud storage (Azure Storage, GCS, or S3). Azure Storage is a critical testing focus. |

**Prerequisites**

* The specified `connection_id` must point to an existing Azure Storage, GCS, or S3 connection configured within the system.
* The system must have write permissions to the specified storage location (`connection_id` + `path`).

## Get Configuration

`GET` `https://{config_endpoint}/{tenant_id}/configuration/dq_reporting`

Returns the current DQ reporting configuration for a tenant.

## Delete Configuration

`DELETE` `https://{config_endpoint}/{tenant_id}/configuration/dq_reporting`

Removes the DQ reporting configuration from the tenant.