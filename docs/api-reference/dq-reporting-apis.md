DQ Reporting APIs
=================

### Configuration API

This section details the API endpoint used to configure and enable the Centralized DQ Monitor Scan Reporting feature. This configuration dictates where the reports are written.

#### Configuration Endpoint (PUT)

Use the following `PUT` endpoint to enable the reporting feature and specify the external destination table location.

| **Method** | **Endpoint**                                                       | **Description**                                      |
| ---------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| `PUT`      | `https://{config_endpoint}/{tenant_id}/configuration/dq_reporting` | Updates the DQ reporting configuration for a tenant. |
| `GET`      | `https://{config_endpoint}/{tenant_id}/configuration/dq_reporting` | Get the DQ reporting configuration                   |
| `DELETE`   | `https://{config_endpoint}/{tenant_id}/configuration/dq_reporting` | Removes configuration from tenant                    |

**Request Body**

The request body specifies the connection and path for the external destination table.

JSON

```
{
    "enabled": true,
    "path": "path/to/output",
    "connection_id": 60529
}
```

| **Field**       | **Type**  | **Description**                                                                                                                       | **Notes**                                                                                                                             |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | `Boolean` | Set to `true` to activate the centralized reporting feature.                                                                          | If `false`, no reports will be generated.                                                                                             |
| `path`          | `String`  | <p>The relative path within the storage bucket/container where the report data will be written.<br>The path MUST exist in storage</p> | Example: `"dq_test"` will result in reports being written to `s3a://<bucket>/dq_test` or `gs://<bucket>/dq_test`.                     |
| `connection_id` | `Integer` | The ID of the globally configured storage connection to use as the destination.                                                       | This must be a Global Connection configured for cloud storage (Azure Storage, GCS, or S3). Azure Storage is a critical testing focus. |

**Prerequisites**

* The specified `connection_id` must point to an existing Azure Storage, GCS, or S3 connection configured within the system.
* The system must have write permissions to the specified storage location (`connection_id` + `path`).

***
