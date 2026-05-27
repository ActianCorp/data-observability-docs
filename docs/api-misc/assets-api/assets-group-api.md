# Assets Group API

This document outlines the API endpoints and structures for managing source groups within projects. Source groups allow you to organize multiple assets under a common configuration.

## Create a New Source Group

You can create a new source group using a `POST` request.

### Endpoint

`POST: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/projects/{projectId}/source_groups`

#### Request Body

The request body defines the properties of the new source group.

```json
{
  "name": "MyRedshiftTables",
  "description": "some test group",
  "type": "SNOWFLAKE",
  "connection_id": 1241,
  "assets": [
    {"name": "asset1", "table_or_file_name": "table1", "description": "desc1"}
  ],
  "payload": {
    "database": "SF_DB1",
    "schema": "test_schema1"
  },
  "options": {
    "only_light_scan": true
  }
}

```

**Fields:**

* `name` (string): A user-defined name for the source group.
* `description` (string, optional): A description for the source group.
* `type` (string): The type of the source group (e.g., `SNOWFLAKE`, `REDSHIFT`, `BIGQUERY`, `DELTALAKE`). This determines the structure of the `payload` field.
* `connection_id` (integer): The ID of the connection associated with this source group.
* `assets` (array of objects, optional): A list of assets to include in the group.
  * `name` (string): The name of the asset within the group.
  * `table_or_file_name` (string): The table or file name for the asset.
  * `description` (string, optional): A description for the individual asset.
* `payload` (object): The source group-specific configuration. The format of this object depends on the `type` of the source group. Refer to the "Source Group Payload Formats by Type" section below for examples.
* `options` (object, optional): Optional configuration settings for the source group.
  * `only_light_scan` (boolean, optional): Set to `true` for light scan only (supported for `SNOWFLAKE`, `DELTALAKE`, `BIGQUERY`).

#### Response

The response confirms the creation of the source group and provides IDs for the group and newly created assets.

```
{
  "group_id": 1871,
  "assets": [
    {"id": "2fqjyu1yjwfn0", "analyze_job_id": "a3e480838f57440d3a457cdf11aab45a8"}
  ]
}

```

**Fields:**

* `group_id` (integer): The unique identifier of the newly created source group.
* `assets` (array of objects): A list of objects for the assets created within this group.
  * `id` (string): The unique identifier of the asset.
  * `analyze_job_id` (string): The ID of the schema analysis job initiated for this asset.

## Edit Source Group

You can update an existing source group using a `PUT` request.

### Endpoint

`PUT: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/projects/{projectId}/source_groups/{sourceGroupId}`

#### Request Body

The request body defines the properties to update for the source group. All fields are optional, and only those provided will be updated.

```json
{
  "name": "MyUpdatedRedshiftTables",
  "description": "an updated test group",
  "type": "SNOWFLAKE",
  "connection_id": 1241,
  "assets_to_add": [
    {"name": "new_asset", "table_or_file_name": "new_table", "description": "new asset desc"}
  ],
  "assets_to_delete": ["2fqjyu1yjwfn0"],
  "payload": {
    "database": "SF_DB1_Updated",
    "schema": "test_schema1_Updated"
  },
  "options": {
    "only_light_scan": false
  }
}

```

**Fields:**

* `name` (string, optional): A new user-defined name for the source group.
* `description` (string, optional): A new description for the source group.
* `type` (string, optional): The new type of the source group. If changed, the `payload` structure must conform to the new type.
* `connection_id` (integer, optional): The ID of a different connection to associate with this source group.
* `assets_to_add` (array of objects, optional): A list of new assets to add to the group.
  * `name` (string): The name of the asset within the group.
  * `table_or_file_name` (string): The table or file name for the asset.
  * `description` (string, optional): A description for the individual asset.
* `assets_to_delete` (array of strings, optional): A list of asset IDs to remove from the group.
* `payload` (object, optional): New source group-specific configuration. The format of this object depends on the `type` of the source group.
* `options` (object, optional): New optional configuration settings for the source group.
  * `only_light_scan` (boolean, optional): Set to `true` for light scan only (supported for `SNOWFLAKE`, `DELTALAKE`, `BIGQUERY`).

#### Response

The response confirms the update of the source group and provides IDs for any newly added assets.

```json
{
  "assets": [
    {"id": "new_asset_id", "analyze_job_id": "new_analyze_job_id"}
  ]
}

```

**Fields:**

* `assets` (array of objects): A list of objects for assets that were newly added during this update.
  * `id` (string): The unique identifier of the new asset.
  * `analyze_job_id` (string): The ID of the schema analysis job initiated for this new asset.

## Move Groups to Another Project

You can move source groups between projects using a `POST` request.

### Endpoint

`POST: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/projects/{targetProjectId}/source_groups/move`

#### Request Body

The request body specifies the source project, the source groups to move, and an optional target connection.

```json
{
  "source_project_id": 0,
  "source_group_ids": [12, 11, 4125],
  "target_connection_id": 1241
}

```

**Fields:**

* `source_project_id` (integer): The ID of the project from which the source groups will be moved.
* `source_group_ids` (array of integers): A list of source group IDs to move.
* `target_connection_id` (integer, optional): The ID of a connection in the target project to associate with the moved source groups.

#### Response

The response confirms the successful movement of source groups.

```json
{
  "message": "Source groups moved successfully"
}

```

## List Source Groups

You can retrieve a list of source groups.

### Endpoints

* **Project-scoped:** `GET: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/projects/{projectId}/source_groups`
* **All:** `GET: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/source_groups`

#### Request

This API endpoint uses a `GET` method and does not require a request body.

#### Response

The response is an array of source group objects.

```json
[
  {
    "id": 141,
    "name": "MyRedshiftTables",
    "description": "some test group",
    "type": "SNOWFLAKE",
    "connection_id": 3111,
    "db_type": null,
    "project_id": 0,
    "scheduled_upload": "* * * * *"
  }
]

```

**Fields:**

* `id` (integer): The unique identifier of the source group.
* `name` (string): The name of the source group.
* `description` (string): The description of the source group.
* `type` (string): The type of the source group.
* `connection_id` (integer): The ID of the associated connection.
* `db_type` (string): The database type, derived from the group's connection.
* `project_id` (integer): The ID of the project the source group belongs to.
* `scheduled_upload` (string): The schedule for uploads (e.g., cron expression).

## Delete Source Group

You can delete an existing source group using a `DELETE` request.

### Endpoint

`DELETE: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/projects/{projectId}/source_groups/{sourceGroupId}`

#### Request

This API endpoint uses a `DELETE` method and does not require a request body.

#### Response

The response confirms the deletion of the source group.

```json
{
  "message": "Source group deleted successfully"
}

```

## List a Source Group's Assets

You can retrieve a list of asset names belonging to a specific source group.

### Endpoint

`POST: https://{actian_endpoint}/api/backend/v2/{tenant}/configuration/projects/{projectId}/source_groups/{sourceGroupId}/list`

#### Request

This API endpoint uses a `POST` method and does not require a request body.

#### Response

The response is an array of strings, where each string is the name of an asset within the source group.

```json
["asset_name_1", "asset_name_2", "..."]

```

## Source Group Payload Formats by Type

The `payload` structure for source groups varies depending on the group `type`.

*   **`SNOWFLAKE`, `REDSHIFT`:**

    ```json
    {
      "database": "SF_DB1",
      "schema": "test_schema1"
    }

    ```
*   **`BIGQUERY`:**

    ```json
    {
      "dataset": "BQ_DB1"
    }

    ```
*   **`DELTALAKE`:**

    ```json
    {
      "catalog": "test_catalog",
      "schema": "test_schema1"
    }

    ```
