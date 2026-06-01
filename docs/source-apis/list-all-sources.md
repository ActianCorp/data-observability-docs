Source APIs
===========

APIs to manage a Actian Data Observability source.

Tenant Id can be retrieved from the UI as listed [here](../api-misc/api-reference/tenant-configuration.md#get-tenants).

## Create a source

`POST` `https://data-observability.actian.com/api/backend/{tenant}/configuration/sources`

Create a new source in the tenant

### Path Parameters

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| tenant* | string | Tenant Id   |

### Query Parameters

| Name        | Type   | Description           |
| ----------- | ------ | --------------------- |
| name*       | string | Name of source        |
| description | string | Description of source |

### Headers

| Name   | Type   | Description  |
| ------ | ------ | ------------ |
| Content-type  | string | application/json  |
| Authentication* | string | Bearer \<access\_token>. Access token retrieved from Authentication API |

**200 Returns a json representation of the Source Object**
```
{
    id = 'id',
    name = 'name',
    description = 'description',
    attributes = [],
    "last_upload_job_id": null
}
```

## List all sources for this tenant

`GET` `https://data-observability.actian.com/api/backend/{tenant}/configuration/source`

Api to list all sources in a tenant

### Path Parameters

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| tenant* | string | Tenant Id   |

### Headers

| Name  | Type   | Description  |
| ------ | ------ | ----------- |
| Content-type | string | application/json |
| Authentication* | string | Bearer \<access\_token>. Access token is retrieved from Authentication API |

**200 A list of source objects**
```
[
    {
        id = 'id',
        name = 'name',
        description = 'description',
        attributes = [
            {
                "id": "<id>",
                "name": "<name>",
                "monitored": <true/false>,
                "status": "<status>",
                "model_last_updated": "<date>"
            },
            {
                "id": "<id>",
                "name": "<name>",
                "monitored": <true/false>,
                "status": "<status>",
                "model_last_updated": "<date>"
            }
        ],
        "last_upload_job_id": "<job-id>",
        "scheduled_upload": <scheduled_upload>
    }
]
```

## Update a source

`PUT` `https://data-observability.actian.com/api/backend/{tenant}/configuration/sources`

Create a new source in the tenant

### Path Parameters

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| tenant* | string | Tenant Id   |

### Query Parameters

| Name     | Type   | Description     |
| -------- | ------ | --------------- |
| name* | string |  Name of source    |
| description  | string | Description of source |

### Headers

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| Content-type | string | application/json   |
| Authentication* | string | Bearer \<access\_token>. Access token retrieved from Authentication API |

**200 Returns a json representation of the Source Object**
```
{
    id = 'id',
    name = 'name',
    description = 'description',
    attributes = [],
    "last_upload_job_id": null
}
```

## Get details of a specific source

`GET` `https://data-observability.actian.com/api/backend/{tenant}/configuration/sources/<source-id>`

### Path Parameters

| Name    | Type   | Description     |
| ------- | ------ | --------------- |
| source-id* | string | Id of source to be retrieved.  |
| tenant*    | string | Tenant id                      |

### Headers

| Name    | Type   | Description   |
| ------- | ------ | ------------- |
| Content-type  | string | application/json  |
| Authorization* | string | Bearer \<access\_token from Authentication API> |

**200 Source details**
```
{
    "id": "<source-id>",
    "name": "<source-name>",
    "description": "<source-description>",
    "attributes": [],
    "last_upload_job_id": null,
    "scheduled_upload": null
}
```

## Delete Source

`DELETE` `https://data-observability.actian.com/api/backend/{tenant}/configuration/sources/<source-id>`

Delete a specific source

### Path Parameters

| Name     | Type   | Description    |
| -------- | ------ | -------------- |
| source-id* | string | Id of source to be deleted. This can be retrieved by looking up a source by name |
| tenant*    | string | Name of tenant                                                                   |

### Headers

| Name       | Type   | Description  |
| --------- | ------ | ------------- |
| Content-type  | string | application/json  |
| Authorization* | string | Bearer \<access\_token from Authentication API> |

**200 Source deleted successfully**
```
{
    "message": "Source was deleted successfully"
}
```

