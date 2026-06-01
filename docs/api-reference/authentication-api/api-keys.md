API Keys
========

An alternate way to access Actian Data Observability APIs using API Key.

All Actian Data Observability APIs can be executed either with OAuth access token or API keys. Use APIs listed below to create a key. Use this key in the header of the Actian Data Observability APIs instead of the Authorization bearer token like this:

```
X-TLM-Key:{API Key}
```

Execute Authenticate API to retrieve access token for Authorization header used below

Tenant Id can be retrieved from the UI as listed [here](../../api-misc/api-reference/tenant-configuration.md#get-tenants).

## Retrieve all API Keys for specific tenant

Retrieves the list of API Keys for the given tenant.

`GET` `/auth/{tenant}/apiKeys`

### Query Parameters

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| tenant* | string | Unique Tenant identifier |

```
curl -X 'GET' \
    '/auth/<tenant>/apiKeys'
    -H 'accept: */*'
```

### Responses

**200**
```
{
  "keys": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

**401**
```
Unauthorized
```

**403**
```
Forbidden
```

**404**
```
Not Found
```

## Create an API Key

Creates a new API key associated with the specified tenant.

`POST` `/auth/{tenant}/apiKeys`

### Path Parameters

| Name    | Type   | Description                   |
| ------- | ------ | ----------------------------- |
| tenant* | string | Unique identifier for the tenant. |

### Request Body

| Name    | Type   | Description         |
| ------- | ------ | ------------------- |
| name*   | String | Name of the API Key |

```
curl -X 'POST' \
    '/auth/<tenant>/apiKeys' \
    -H 'accept: */*' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "<name>"
}'
```

### Responses

**200**

```
{
   "id": "string",
   "name": "string",
   "key": "string"
}
```

**401**
```
Unauthorized
```

**403**
```
Forbiddden
```

**404**
```
Not Found
```

## Get details of specific API Key

Fetches the API key information using a unique key ID for a specific tenant.

`GET` `/auth/{tenant}/apiKeys/{keyId}`

### Path Parameters

| Name   | Type   | Required | Description       |
| ------ | ------ | -------- | ----------------- |
| tenant | string | Yes      | Tenant identifier |
| keyId  | string | Yes      | Unique API Key ID |

```
curl -X 'GET'
    '/auth/<tenant>/apiKeys/<keyId>'
    -H 'accept: */*'
```

### Responses

**200**
```
{
   "id": "string",
   "name": "string",
}
```

**401**
```
Unauthorized
```

**403**
```
Forbiddden
```

**404**
```
Not Found
```

## Delete an API Key

Removes the API Key with the specified `keyId` for the given `tenant`.

### Parameters:

| Name    | Type     | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| tenant* | `string` | The identifier of the tenant.                   |
| keyId*  | `string` | The unique identifier of the API Key to delete. |

```
curl -X 'DELETE'
    '/auth/<tenant>/apiKeys/<keyId>'
    -H 'accept: */*'
```

### Responses

**200**
```
{
   "message": "string"
}
```

**401**
```
Unauthorized
```

**403**
```
Forbiddden
```

**404**
```
Not Found
```

