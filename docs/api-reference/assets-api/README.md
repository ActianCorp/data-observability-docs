Assets API
============

This document outlines the API endpoints and structures for managing assets within projects.

## Create a New Asset

You can create a new asset using a `POST` request.

### Endpoint

`POST: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/assets`

#### Request Body

The request body defines the properties of the new asset, using `DELTALAKE` (Databricks) as an example.

```json
{
  "name": "MyDeltaLakeAsset",
  "description": "a test asset for Delta Lake",
  "type": "DELTALAKE",
  "options": {
    "id_attributes": ["order_id", "item_id"],
    "separator": ",",
    "sample_fraction": 10,
    "skip_investigator": "false",
    "delta_only": "false",
    "timestamp_attribute": "event_timestamp",
    "limit": 500,
    "filter": {"region":["NA","EU"]},
    "segments": {"category":["electronics","clothing"]},
    "only_light_scan": "true",
    "resolve_wildcards_to_folders": "true"
  },
  "payload": {
    "catalog": "main_catalog",
    "schema": "sales_data",
    "table": "orders"
  },
  "connection_id": 4567
}

```

**Fields:**

* `name` (string): A user-defined name for the asset.
* `description` (string, optional): A description for the asset.
* `type` (string): The type of the asset (same as connection types, e.g., `DELTALAKE`, `REDSHIFT`, `GCP`, `BIGQUERY`, `SNOWFLAKE`, etc.). This determines the structure of the `payload` field.
* `options` (object, optional): A set of optional configuration settings for the asset.
  * `id_attributes` (array of strings, optional): Attributes to be used as identifiers.
  * `separator` (string, optional): Separator character for delimited files.
  * `sample_fraction` (integer, optional): Fraction of data to sample (e.g., 25 for 25%).
  * `skip_investigator` (string, optional): "true" to skip investigator, "false" otherwise.
  * `delta_only` (string, optional): "true" to process only delta changes, "false" otherwise.
  * `timestamp_attribute` (string, optional): The attribute to use for timestamp.
  * `limit` (integer, optional): Maximum number of records to process.
  * `filter` (object, optional): A map for filtering data, where keys are attributes and values are arrays of allowed values.
  * `segments` (object, optional): A map for defining data segments, where keys are attributes and values are arrays of segment values.
  * `only_light_scan` (string, optional): "true" for light scan only (supported for `SNOWFLAKE`, `DELTALAKE`, `BIGQUERY`).
  * `resolve_wildcards_to_folders` (string, optional): "true" to resolve wildcards to folders.
* `payload` (object): The asset-specific configuration. The format of this object depends on the `type` of the asset. Refer to the "Asset Payload Formats by Type" section below for examples.
* `connection_id` (integer): The ID of the connection associated with this asset.

#### Response

The response confirms the creation of the asset and provides its details, including a unique `id`.

```json
{
  "id": 1872,
  "project_id": 0,
  "name": "MyDeltaLakeAsset",
  "description": "a test asset for Delta Lake",
  "type": "DELTALAKE",
  "options": {
    "id_attributes": ["order_id", "item_id"],
    "separator": ",",
    "sample_fraction": 10,
    "skip_investigator": "false",
    "delta_only": "false",
    "timestamp_attribute": "event_timestamp",
    "limit": 500,
    "filter": {"region":["NA","EU"]},
    "segments": {"category":["electronics","clothing"]},
    "only_light_scan": "true",
    "resolve_wildcards_to_folders": "true"
  },
  "payload": {
    "catalog": "main_catalog",
    "schema": "sales_data",
    "table": "orders"
  },
  "created_by": "john_doe@telm.ai",
  "created_at": "2025-06-26T14:30:00.000Z",
  "connection_id": 4567,
  "db_type": null
}

```

**Fields:**

* `id` (integer): The unique identifier of the newly created asset.
* `project_id` (integer): The ID of the project the asset belongs to.
* `name` (string): The name of the asset.
* `description` (string): The description of the asset.
* `type` (string): The type of the asset.
* `options` (object): The configuration options for the asset.
* `payload` (object): The asset-specific configuration.
* `created_by` (string): The email of the user who created the asset.
* `created_at` (string): The timestamp when the asset was created in ISO format (UTC).
* `connection_id` (integer): The ID of the associated connection.
* `db_type` (string): The database type, derived from the asset's connection.

## Update Asset

You can update an existing asset using a `PUT` request.

### Endpoint

`PUT: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/assets/{assetId}`

#### Request Body

The request body defines the properties to update for the asset, using `DELTALAKE` (Databricks) as an example. All fields are optional, and only those provided will be updated.

```json
{
  "name": "MyUpdatedDeltaLakeAsset",
  "description": "an updated test asset for Delta Lake",
  "type": "DELTALAKE",
  "options": {
    "sample_fraction": 20,
    "delta_only": "true"
  },
  "payload": {
    "catalog": "analytics_catalog",
    "schema": "marketing_data",
    "table": "campaigns"
  },
  "connection_id": 4568
}

```

**Fields:**

* `name` (string, optional): A new user-defined name for the asset.
* `description` (string, optional): A new description for the asset.
* `type` (string, optional): The new type of the asset. If changed, the `payload` structure must conform to the new type.
* `options` (object, optional): New configuration settings for the asset.
* `payload` (object, optional): New asset-specific configuration. The format of this object depends on the `type` of the asset.
* `connection_id` (integer, optional): The ID of a different connection to associate with this asset.

#### Response

The response confirms the update of the asset and provides its latest details.

```json
{
  "id": 1872,
  "project_id": 0,
  "name": "MyUpdatedDeltaLakeAsset",
  "description": "an updated test asset for Delta Lake",
  "type": "DELTALAKE",
  "options": {
    "id_attributes": ["order_id", "item_id"],
    "separator": ",",
    "sample_fraction": 20,
    "skip_investigator": "false",
    "delta_only": "true",
    "timestamp_attribute": "event_timestamp",
    "limit": 500,
    "filter": {"region":["NA","EU"]},
    "segments": {"category":["electronics","clothing"]},
    "only_light_scan": "true",
    "resolve_wildcards_to_folders": "true"
  },
  "payload": {
    "catalog": "analytics_catalog",
    "schema": "marketing_data",
    "table": "campaigns"
  },
  "created_by": "john_doe@telm.ai",
  "created_at": "2025-06-26T14:30:00.000Z",
  "connection_id": 4568,
  "db_type": null
}

```

**Fields:** (Same as Create Asset response, reflecting updated values)

## List Assets

You can retrieve a list of assets.

### Endpoints

* **Retrieve All:**\
  Please use this endpoint to retrieve all assets you have access to\
  &#x20;`GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/assets?with_attributes=true&with_schedules=true&with_lineage=true`
* **Project-scoped:**\
  Please use this endpoint to retrieve all assets you have access to in a given project\
  &#x20;`GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/assets?with_attributes=true&with_schedules=true&with_lineage=true`

#### Query Parameters

* `with_attributes` (boolean, optional): If `true`, includes a list of attributes for each asset.
* `with_schedules` (boolean, optional): If `true`, includes scheduled upload information for each asset.
* `with_lineage` (boolean, optional): If `true`, includes parent and child asset IDs for lineage tracking.

#### Request

This API endpoint uses a `GET` method and does not require a request body.

#### Response

The response is an array of asset objects.

```json
[
  {
    "id": 1872,
    "project_id": 0,
    "name": "MyDeltaLakeAsset",
    "description": "a test asset for Delta Lake",
    "type": "DELTALAKE",
    "options": {
      "id_attributes": ["order_id", "item_id"],
      "separator": ",",
      "sample_fraction": 10,
      "skip_investigator": "false",
      "delta_only": "false",
      "timestamp_attribute": "event_timestamp",
      "limit": 500,
      "filter": {"region":["NA","EU"]},
      "segments": {"category":["electronics","clothing"]},
      "only_light_scan": "true",
      "resolve_wildcards_to_folders": "true"
    },
    "payload": {
      "catalog": "main_catalog",
      "schema": "sales_data",
      "table": "orders"
    },
    "created_by": "alexander.chelyadin@telm.ai",
    "created_at": "2025-06-26T14:30:00.000Z",
    "connection_id": 4567,
    "db_type": null,
    "attributes": [ /* ... list of attributes ... */ ],
    "scheduled_upload": { /* ... scheduled upload object ... */ },
    "parents": ["T9sACQAATBg"],
    "children": ["cycdCAAAUjw"]
  }
]

```

**Fields:**

* All fields from the `Create Asset` response.
* `attributes` (array, optional): A list of attributes associated with the asset. Included if `with_attributes=true`.
* `scheduled_upload` (object, optional): Details about any scheduled uploads for the asset. Included if `with_schedules=true`.
* `parents` (array of strings, optional): List of IDs of parent assets for lineage. Included if `with_lineage=true`.
* `children` (array of strings, optional): List of IDs of child assets for lineage. Included if `with_lineage=true`.

## Get Asset

You can retrieve the details of a specific asset using a `GET` request.

### Endpoint

`GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/assets/{assetId}`

#### Request

This API endpoint uses a `GET` method and does not require a request body.

#### Response

The response provides the full details of the requested asset.

```json
{
  "id": 1872,
  "project_id": 0,
  "name": "MyDeltaLakeAsset",
  "description": "a test asset for Delta Lake",
  "type": "DELTALAKE",
  "options": {
    "id_attributes": ["order_id", "item_id"],
    "separator": ",",
    "sample_fraction": 10,
    "skip_investigator": "false",
    "delta_only": "false",
    "timestamp_attribute": "event_timestamp",
    "limit": 500,
    "filter": {"region":["NA","EU"]},
    "segments": {"category":["electronics","clothing"]},
    "only_light_scan": "true",
    "resolve_wildcards_to_folders": "true"
  },
  "payload": {
    "catalog": "main_catalog",
    "schema": "sales_data",
    "table": "orders"
  },
  "created_by": "john_doe@telm.ai",
  "created_at": "2025-06-26T14:30:00.000Z",
  "connection_id": 4567,
  "db_type": null,
  "attributes": [ /* ... list of attributes ... */ ],
  "scheduled_upload": { /* ... scheduled upload object ... */ },
  "parents": ["T9sACQAATBg"],
  "children": ["cycdCAAAUjw"]
}

```

**Fields:** (Same as List Assets response for a single asset)

## Delete Asset

You can delete an existing asset using a `DELETE` request.

### Endpoint

`DELETE: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/assets/{assetId}`

#### Request

This API endpoint uses a `DELETE` method and does not require a request body.

#### Response

The response confirms the deletion of the asset.

```json
{
  "message": "Asset deleted successfully"
}

```

## Move Assets from Project to Project

You can move assets between projects using a `POST` request.

### Endpoint

`POST: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{targetProjectId}/assets/move`

#### Request Body

The request body specifies the source project, the assets to move, and an optional target connection.

```json
{
  "source_project_id": 0,
  "source_asset_ids": ["T9sACQAATBg", "cycdCAAAUjw"],
  "target_connection_id": 4567
}

```

**Fields:**

* `source_project_id` (integer): The ID of the project from which the assets will be moved.
* `source_asset_ids` (array of strings): A list of asset IDs to move.
* `target_connection_id` (integer, optional): The ID of a connection in the target project to associate with the moved assets. If connections used by sources are `GLOBAL`, this may not be defined, and existing global connections will be preserved.\
  **Note:** Only connection of the same type can be used

#### Response

The response confirms the successful movement of assets.

```json
{
  "message": "Assets moved successfully"
}

```

>**Note:** The user should be a `PROJECT_EDITOR` in both the source and destination projects to perform this operation.

## Asset Payload Formats by Type

The `payload` structure for assets varies depending on the asset `type`.

*   `GCP`, `S3`, `AZURE`:

    ```json
    {
      "path": "folder1/data.parquet",
      "file_type": "CSV"
    }

    ```
*   **`BIGQUERY`:**

    ```json
    {
      "dataset": "test_dataset",
      "result_dataset": "test_dataset", // optional
      "table": "table1",
      "result_table": "out_table", // optional
      "query": "select * from table1" // optional
    }

    ```
*   **`SNOWFLAKE`, `REDSHIFT`:**

    ```json
    {
      "database": "db1",
      "schema": "test_schema",
      "table": "table1",
      "query": "select * from table1" // optional
    }

    ```
*   **`DELTALAKE`:**

    ```json
    {
      "catalog": "cat1",
      "schema": "test_schema",
      "table": "table1",
      "query": "select * from table1" // optional
    }

    ```
*   **`GENERIC_JDBC`:**

    ```json
    {
      "table": "table1",
      "query": "select * from table1" // optional
    }

    ```
*   **`HIVE_ICEBERG`:**

    ```json
    {
      "database": "db1",
      "table": "table1"
    }

    ```
