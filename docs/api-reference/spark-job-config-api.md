# Spark Job Config API

The Spark Job Config API allows you to programmatically manage compute cluster configuration for Data Observability's Spark-based data quality jobs. Supports Dataproc (GCP), EMR (AWS), and Databricks configurations.

## Get Spark Job Config

`GET` `/configuration/tenants/{tenant}/spark-job-config`

Returns the current Spark job configuration for the specified tenant. Returns an empty object `{}` if no configuration has been saved yet.

## Save or Update Spark Job Config

`PUT` `/configuration/tenants/{tenant}/spark-job-config`

Creates or updates the Spark job configuration for a tenant. Each top-level block (`spark_properties`, `dataproc_config`, `emr_config`, `databricks_config`) is stored and replaced independently.

!!! note
    **Partial Updates** Only the blocks you include in the request body are updated. Omitting a block leaves its existing values unchanged. To explicitly clear a block, send it as `null` (e.g., `"dataproc_config": null`)
!!!

**Request Body Schema**

| Field               | Type   | Required | Description                                                                       |
| ------------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| `spark_properties`  | Object | No       | Key-value pairs of Spark configuration properties (e.g., executor memory, cores). |
| `dataproc_config`   | Object | No       | GCP Dataproc cluster configuration. See schema below.                             |
| `emr_config`        | Object | No       | AWS EMR cluster configuration. See schema below.                                  |
| `databricks_config` | Object | No       | Databricks cluster configuration. See schema below.                               |

**`dataproc_config` Schema**

| Field                          | Type    | Required | Description                                                        |
| ------------------------------ | ------- | -------- | ------------------------------------------------------------------ |
| `master_node_type`             | String  | No       | Machine type for the Dataproc master node (e.g., `n1-standard-4`). |
| `worker_node_type`             | String  | No       | Machine type for Dataproc worker nodes (e.g., `n1-standard-8`).    |
| `spark_master_disk_size_in_gb` | Integer | No       | Boot disk size in GB for the master node.                          |
| `spark_worker_disk_size_in_gb` | Integer | No       | Boot disk size in GB for worker nodes.                             |
| `autoscale_policy`             | String  | No       | Full resource path to a GCP autoscaling policy.                    |

**`emr_config` Schema**

| Field                    | Type    | Required | Description                                                           |
| ------------------------ | ------- | -------- | --------------------------------------------------------------------- |
| `master_instance_type`   | String  | No       | EC2 instance type for the EMR master node (e.g., `m5.xlarge`).        |
| `worker_instance_type`   | String  | No       | EC2 instance type for EMR worker nodes (e.g., `m5.2xlarge`).          |
| `worker_instance_option` | String  | No       | Purchasing option for worker instances. Options: `ON_DEMAND`, `SPOT`. |
| `min_instance_count`     | Integer | No       | Minimum number of worker instances for autoscaling.                   |
| `max_instance_count`     | Integer | No       | Maximum number of worker instances for autoscaling.                   |

**`databricks_config` Schema**

| Field                     | Type    | Required | Description                                             |
| ------------------------- | ------- | -------- | ------------------------------------------------------- |
| `spark_version`           | String  | No       | Databricks Runtime version (e.g., `13.3.x-scala2.12`).  |
| `node_type`               | String  | No       | VM type for worker nodes (e.g., `Standard_DS3_v2`).     |
| `instance_pool_id`        | String  | No       | ID of the Databricks instance pool for worker nodes.    |
| `driver_instance_pool_id` | String  | No       | ID of the Databricks instance pool for the driver node. |
| `policy_id`               | String  | No       | ID of the Databricks cluster policy to apply.           |
| `min_instance_count`      | Integer | No       | Minimum number of worker nodes for autoscaling.         |
| `max_instance_count`      | Integer | No       | Maximum number of worker nodes for autoscaling.         |

!!! warning "Important"
    The spark properties specified should be supported by the configured `node_type`. Example: you can't have 10G driver memory for a 6GB node type.


#### Example: Save Dataproc Config

```json
{
  "spark_properties": {
    "spark.executor.memory": "4g",
    "spark.executor.cores": "2"
  },
  "dataproc_config": {
    "master_node_type": "n1-standard-4",
    "worker_node_type": "n1-standard-8",
    "spark_master_disk_size_in_gb": 100,
    "spark_worker_disk_size_in_gb": 500,
    "autoscale_policy": "projects/my-project/regions/us-central1/autoscalingPolicies/my-policy"
  }
}
```

#### Example: Save EMR Config

```json
{
  "spark_properties": {
    "spark.executor.memory": "8g"
  },
  "emr_config": {
    "master_instance_type": "m5.xlarge",
    "worker_instance_type": "m5.2xlarge",
    "worker_instance_option": "SPOT",
    "min_instance_count": 2,
    "max_instance_count": 10
  }
}
```

#### Example: Save Databricks Config

```json
{
  "databricks_config": {
    "spark_version": "13.3.x-scala2.12",
    "node_type": "Standard_DS3_v2",
    "instance_pool_id": "0123-456789-pool-abc",
    "driver_instance_pool_id": "0123-456789-pool-def",
    "policy_id": "ABCD1234",
    "min_instance_count": 1,
    "max_instance_count": 5
  }
}
```

#### Example: Partial Update

Update only a single field without affecting other config values:

```json
{
  "dataproc_config": {
    "worker_node_type": "n1-highmem-8"
  }
}
```

## Delete Spark Job Config

`DELETE` `/configuration/tenants/{tenant}/spark-job-config`

Permanently removes the Spark job configuration for the specified tenant.

!!! warning "Important"
    This action deletes the entire configuration for the tenant. Subsequent GET requests will return `{}` until a new configuration is saved.

### Error Codes

| Status Code        | Description                                  | Possible Causes                                                            |
| ------------------ | -------------------------------------------- | -------------------------------------------------------------------------- |
| `400 Bad Request`  | The request was invalid or cannot be served. | Malformed JSON body or invalid field values (e.g., non-integer disk size). |
| `401 Unauthorized` | Authentication failed.                       | Invalid or expired API token.                                              |
| `403 Forbidden`    | Permissions error.                           | The caller does not have admin access to the specified tenant.             |
| `404 Not Found`    | Resource not found.                          | The specified `tenant` or `tenantId` does not exist.                       |
