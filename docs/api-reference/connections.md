Connection API
===============

This document outlines the API endpoints and structures for creating new connections, which can be either project-scoped or global-scoped.

## Create Connection

You can create a new connection using a `POST` request.

### Endpoints

* **Project-scoped:** `POST: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/connections`
* **Global-scoped:** `POST: https://{actian_endpoint}/api/backend/{tenant}/configuration/connections`

### Request Body

The request body defines the properties of the new connection.

```json
{
  "name": "MyRedshift",
  "type": "REDSHIFT",
  "credential": {
    "type": "SIMPLE",
    "payload": {
      "username": "test",
      "password": "test"
    }
  },
  "payload": {
    "endpoint_prefix": "tlm-redshift02"
  }
}

```

**Fields:**

* `name` (string): A user-defined name for the connection.
* `type` (string): The type of the connection (e.g., `REDSHIFT`, `GCS`, `AZURE`, `BIGQUERY`, `DELTALAKE`, `GENERIC_JDBC`, `HIVE_ICEBERG`, `SNOWFLAKE`). This determines the structure of the `payload` field.
* `credential` (object): Contains the authentication details for the connection.
  * `type` (string): The type of credential (e.g., `SIMPLE`, `GCP`, `AWS`, `TOKEN`, `AZURE_SAS`, `GENERIC_MAP`).
  * `payload` (object): The specific credential details, which vary based on the `credential.type`. Refer to the [**Credentials**](connections.md#credentials) documentation for detailed `payload` formats.
* `payload` (object): The connection-specific configuration. The format of this object depends on the `type` of the connection. Refer to the "[API Payload Formats by Type](connections.md#payload)" table for examples.

### Response

The response confirms the creation of the connection and provides its details, including a unique `id`.

```json
{
  "id": 3111,
  "project_id": 0,
  "name": "MyRedshift",
  "scope": "PROJECT",     // Can be "GLOBAL" for global-scoped connections
  "created_by": "john_doe@telm.ai",
  "created_at": "2025-05-23T11:03:01.000Z", // ISO format in UTC
  "type": "REDSHIFT",
  "payload": {
    "endpoint_prefix": "tlm-redshift02"
  },
  "db_type": "HANA101"
}

```

**Fields:**

* `id` (integer): The unique identifier of the newly created connection.
* `project_id` (integer): The ID of the project if it's a project-scoped connection; otherwise, it might be `0` or null for global-scoped.
* `name` (string): The name of the connection.
* `scope` (string): Indicates whether the connection is `PROJECT`-scoped or `GLOBAL`-scoped.
* `created_by` (string): The email of the user who created the connection.
* `created_at` (string): The timestamp when the connection was created in ISO format (UTC).
* `type` (string): The type of the connection.
* `payload` (object): The connection-specific configuration as provided in the request.
* `db_type` (string): The database type, derived from the connection.

#### Correspondence between Connection and Credential Types

The `credential.type` you provide in the request body should correspond to the `type` of the connection you are creating:

* `GCS` -> `GCP`
* `S3` -> `AWS`
* `BIGQUERY` -> `GCP`
* `AZURE` -> `AZURE_SAS`
* `SNOWFLAKE` -> `SIMPLE`
* `DELTALAKE` -> `TOKEN`
* `REDSHIFT` -> `SIMPLE`
* `GENERIC_JDBC` -> `GENERIC_MAP`
* `HIVE_ICEBERG` -> depends on `location_type` within its `payload` (e.g., `GCP`, `AWS`, `AZURE_SAS`).

### Payload

Payload object describes the connection detail and is dependent on connection type

| Type           | Credential Type | Payload Format                                                                                                                                                       |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REDSHIFT`     | `SIMPLE`         | `{"endpoint_prefix": "tlm-redshift02"}`                                                                                                                               |
| `GCS`          | `GCP`            | `{"bucket": "<bucket_name>"}`                                                                                                                                          |
| `S3`           | `AWS`            | `{"bucket": "<bucket_name>"}`                                                                                                                                          |
| `AZURE`        | `AZURE_SAS`      | `{"storage_account": "test_acc", "bucket": "<bucket_name>"}`                                                                                                          |
| `BIGQUERY`     | `GCP`            | `{"project": "test_project"}`                                                                                                                                          |
| `DELTALAKE`    | `TOKEN`          | `{"host": "test.db23.databricks.com", "port": "443", "httppath": "some/path"}`                                                                                        |
| `GENERIC_JDBC` | `GENERIC_MAP`    | `{"db_type": "HANA10", "db_or_schema": "test_db", "connection_properties": {"prop1": "value1", "prop2": "value2"}}` `connection_properties` can contain additional custom parameters. |
| `HIVE_ICEBERG` | `<location_dependent>` | `{"thrift_uri": "thrift://<url>:<port|9083>", "location_type": "GCS", "region": "us-east-1", "bucket": "<bucket_name>"}`                                           |
| `SNOWFLAKE`    | `SIMPLE`         | `{"account": "test_acc", "warehouse": "<warehouse_name>", "role": "WH_ADMIN"}`                                                                                        |


### Credentials

| Credential Type | Payload Example | Details |
|-----------------|-----------------|---------|
| `SIMPLE` | `{"username": "your_username", "password": "your_password"}` | Basic username and password authentication. |
| `AWS` | `{"access_key": "your_access_key_id", "secret_key": "your_secret_access_key"}` | AWS credentials. |
| `TOKEN` | `{"token": "your_api_token"}` | API token for authentication. |
| `AZURE_SAS` | `{"sas_key": "your_azure_sas_key"}` | Azure Shared Access Signature key. |
| `GENERIC_MAP` | `{"custom_param1": "value1", "custom_param2": "value2"}` | A generic map for custom key-value pair credentials. |
| `GCP` | `{"project_id": "actian-dev", "private_key_id": "your-private-key-id", "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n", "client_email": "your-service-account-email@your-project.iam.gserviceaccount.com", "client_id": "your-client-id"}` | GCP service account key details. |


## Update Connection

You can update an existing connection using a `PUT` request.

#### Endpoints

* **Project-scoped:** `PUT: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/connections/{connectionId}`
* **Connection by Id:** `PUT: https://{actian_endpoint}/api/backend/{tenant}/configuration/connections/{connectionId}`

### Request Body

The request body defines the properties to update for the connection. All fields are optional, and only those provided will be updated. This request body uses the same parameters defined in create request

## List Connections

You can retrieve the list of connections using a `GET` request.

#### Endpoints

* **Project-scoped:** `GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/connections`
* **All Connections:** `GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/connections`&#x20;

**Response**

The response is an array of connection objects, each containing detailed information about a connection.

```json
[
  {
    "id": 3111,
    "project_id": 0,
    "name": "MyRedshiftConnection",
    "scope": "GLOBAL",
    "created_by": "john_doe@telm.ai",
    "created_at": "2025-05-23T11:03:01.000Z",
    "type": "REDSHIFT",
    "payload": {
      "endpoint_prefix": "tlm-redshift02",
      "database": "production_db",
      "port": 5439
    },
    "db_type": "HANA101"
  },
  {
    "id": 3112,
    "project_id": 123,
    "name": "MyProjectGCSConnection",
    "scope": "PROJECT",
    "created_by": "john.doe@telm.ai",
    "created_at": "2025-05-24T10:00:00.000Z",
    "type": "GCS",
    "payload": {
      "bucket": "actian_project_storage"
    },
    "db_type": null
  }
]

```

**Fields for Each Connection Object:**

* `id` (integer): The unique identifier of the connection.
* `project_id` (integer): The ID of the project the connection belongs to. For global connections, this will typically be `0`.
* `name` (string): The user-defined name of the connection.
* `scope` (string): Indicates whether the connection is `PROJECT`-scoped or `GLOBAL`-scoped.
* `created_by` (string): The email of the user who created the connection.
* `created_at` (string): The timestamp when the connection was created, in ISO 8601 format (UTC).
* `type` (string): The type of the connection (e.g., `REDSHIFT`, `GCS`, `AZURE`, `BIGQUERY`, `DELTALAKE`, `GENERIC_JDBC`, `HIVE_ICEBERG`, `SNOWFLAKE`).
* `payload` (object): The connection-specific configuration. The structure of this object varies based on the `type` of the connection. Refer to the "Connection Payload Formats by Type" section in the main Connection API documentation for detailed examples.
* `db_type` (string, optional): The specific database type associated with the connection, if applicable (e.g., "HANA101" for a `GENERIC_JDBC` connection or derived from other types). Can be `null` if not relevant.

## Get Connection Details

You can retrieve the details of an existing connection using a `GET` request.

#### Endpoints

* **Project-scoped:** `GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/projects/{projectId}/connections/{connectionId}`
* **General reference:** `GET: https://{actian_endpoint}/api/backend/{tenant}/configuration/connections/{connectionId}`

#### Request

This API endpoint uses a `GET` method and does not require a request body.

#### Response

The response provides the full details of the requested connection.

```json
{
  "id": 3111,
  "project_id": 0,
  "name": "MyRedshift",
  "scope": "PROJECT",     // Can be "GLOBAL" in case of tenant-level endpoint
  "created_by": "john_doe@telm.ai",
  "created_at": "2025-05-23T11:03:01.000Z", // ISO format in UTC
  "type": "REDSHIFT",
  "payload": {
    "endpoint_prefix": "tlm-redshift02"
  },
  "db_type": "HANA101"
}

```

**Fields:**

* `id` (integer): The unique identifier of the connection.
* `project_id` (integer): The ID of the project if it's a project-scoped connection; otherwise, it might be `0` or null for global-scoped.
* `name` (string): The name of the connection.
* `scope` (string): Indicates whether the connection is `PROJECT`-scoped or `GLOBAL`-scoped.
* `created_by` (string): The email of the user who created the connection.
* `created_at` (string): The timestamp when the connection was created in ISO format (UTC).
* `type` (string): The type of the connection.
* `payload` (object): The connection-specific configuration. The format of this object depends on the `type` of the connection. Refer to the "API Payload Formats by Type" table for examples.
* `db_type` (string): The database type, derived from the connection.
