Alation Integration APIs
=========================

To integrate Alation with Data Observability, you'll use a set of REST API endpoints to manage the connection, automatically or manually create data mappings, and perform other configuration tasks. These API calls enable Data Observability to interact with your Alation data catalog for seamless data governance.

## Setup

These endpoints allow you to configure, retrieve, and remove the core Alation integration with Data Observability. All requests require your `backend_service_host` and `tenant` identifier.

### Add or Update Integration

Use this endpoint to establish the connection between Data Observability and Alation or to update an existing one. You'll need your Alation URL, a user ID, and a refresh API token.

* `PUT` `{backend_service_host}/{tenant}/configuration/integrations/alation`
*   Request Body:

     ```json
     {
      "url": "https://dq-partner.mtse.alationcloud.com/",
      "user_id": 81,
      "refresh_api_token": "xxxxxx..."
    }
    ```
*   Response:

    ```json
    {
      "url": "https://dq-partner.mtse.alationcloud.com/",
      "user_id": 81
    }
    ```

***

### Get Integration Properties

Retrieve the current configuration details for your Alation integration. This call doesn't require a request body.

* `GET` `{backend_service_host}/{tenant}/configuration/integrations/alation`
* Response:

  ```json
    {
      "url": "https://dq-partner.mtse.alationcloud.com/",
      "user_id": 81
    }
  ```

***

### Remove Integration

Permanently delete the Alation integration from your Data Observability environment.

* `DELETE` `{backend_service_host}/{tenant}/configuration/integrations/alation`
*  Response:

   ```json
    {
      "message": "Alation integration configuration deleted successfully"
    }
   ```

***

## Mappings

These endpoints handle the creation and management of mappings, which link Data Observability data assets to specific tables in your Alation data catalog.

### Start Automatic Mappings

This endpoint initiates a background job to automatically create mappings for your assets. You can optionally choose to overwrite existing mappings.

* `POST` `{backend_service_host}/{tenant}/configuration/mappings/alation/auto`
* Request Parameters:
  * `should_overwrite`: `true` or `false` (default is `false`).
*  Response:

    ```json
    {
      "message": "Creating Alation mappings started",
      "job_id": "f583cea0-640d-4c50-9153-e187f92a982e"
    }
    ```

    The response provides a `job_id` that you can use to track the status of the mapping job.

***

### Get Mapping Job Result

Check the status and results of an ongoing or completed automatic mapping job using its `job_id`.

* `GET` `{backend_service_host}/{tenant}/configuration/mappings/alation/auto`
* Request Parameters:
  * `job_id`: The `job_id` from the automatic mapping request.
*  Response:

    ```json
    {
      "status": "COMPLETED", // Can also be IN_PROGRESS or FAILED
      "error_message": null,
      "result": [
        {
          "asset_id": "35xftecujtsjd",
          "data_source_id": 251,
          "data_source_name": "actian_datasource",
          "schema_id": 46,
          "schema_name": "adventureworks.SalesLT",
          "table_id": 6121,
          "table_name": "CustomerAddress"
        },
        ...
      ]
    }
    ```

***

### List All Mappings

Retrieve a list of all existing Alation mappings configured in Data Observability.

* `GET` `{backend_service_host}/{tenant}/configuration/mappings/alation`
*  Response:

    ```json
    [
      {
        "asset_id": "35xftecujtsjd",
        "data_source_id": 251,
        "data_source_name": "actian_datasource",
        "schema_id": 46,
        "schema_name": "adventureworks.SalesLT",
        "table_id": 6121,
        "table_name": "CustomerAddress"
      },
      ...
    ]
    ```

***

### Delete a Mapping

Remove a specific mapping by providing its Data Observability asset ID.

* `DELETE` `{backend_service_host}/{tenant}/configuration/mappings/alation`
* Request Parameters:
  * `asset_id`: The ID of the Data Observability asset to unmap.
*  Response:

    ```json
    {
      "message": "Alation mapping deleted successfully"
    }
    ```

***

### Create a New Mapping Manually

Manually create a new mapping between a Data Observability asset and an Alation table. You must provide the Data Observability asset ID and the Alation table ID.

* `POST` `{backend_service_host}/{tenant}/configuration/mappings/alation`
*  Request Body:

    ```json
    {
      "asset_id": "35xftecujtsjd",
      "alation_table_id": 6121
    }
    ```
*  Response

    ```json
    {
      "asset_id": "35xftecujtsjd",
      "data_source_id": 251,
      "data_source_name": "actian_datasource",
      "schema_id": 46,
      "schema_name": "adventureworks.SalesLT",
      "table_id": 6121,
      "table_name": "CustomerAddress"
    }
    ```
