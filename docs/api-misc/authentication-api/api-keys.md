# API Keys

An alternate way to access Actian Data Observability APIs using API Key.

All Actian Data Observability APIs can be executed either with OAuth access token or API keys. Use APIs listed below to create a key. Use this key in the header of the Actian Data Observability APIs instead of the Authorization bearer token like this:

```bash
X-TLM-Key:{API Key}
```

Execute Authenticate API to retrieve access token for Authorization header used below

Tenant Id can be retrieved from the UI as listed [here](../api-reference/tenant-configuration.md).

## Retrieve all API Keys for specific tenant

Retrieves the list of API Keys for the given tenant.

`GET` `{auth_endpoint}/auth/{tenant}/apiKeys`

### Query Parameters

| Name     | Type   | Description              |
| -------- | ------ | ------------------------ |
| tenant* | string | Unique Tenant identifier |

```bash
curl -X 'GET' \
    '{auth_endpoint}/auth/<tenant>/apiKeys'
    -H 'accept: */*'
```

### Responses

**200**
```json
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
```bash
Unauthorized
```

**403**
```bash
Forbidden
```

**404**
```bash
Not Found
```

## Create an API Key

Creates a new API key associated with the specified tenant.

`POST` `{auth_endpoint}/auth/{tenant}/apiKeys`

### Path Parameters

| Name    | Type   | Description                   |
| ------- | ------ | ----------------------------- |
| tenant* | string | Unique identifier for the tenant. |

### Request Body

| Name    | Type   | Description         |
| ------- | ------ | ------------------- |
| name*   | String | Name of the API Key |

```bash
curl -X 'POST' \
    '{auth_endpoint}/auth/<tenant>/apiKeys' \
    -H 'accept: */*' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "<name>"
}'
```

### Responses

**200**

```json
{
   "id": "string",
   "name": "string",
   "key": "string"
}
```

**401**
```bash
Unauthorized
```

**403**
```bash
Forbiddden
```

**404**
```bash
Not Found
```

## Get details of specific API Key

Fetches the API key information using a unique key ID for a specific tenant.

`GET` `{auth_endpoint}/auth/{tenant}/apiKeys/{keyId}`

### Path Parameters

| Name   | Type   | Required | Description       |
| ------ | ------ | -------- | ----------------- |
| tenant | string | Yes      | Tenant identifier |
| keyId  | string | Yes      | Unique API Key ID |

```bash
curl -X 'GET'
    '/auth/<tenant>/apiKeys/<keyId>'
    -H 'accept: */*'
```

### Responses

**200**
```json
{
   "id": "string",
   "name": "string",
}
```

**401**
```bash
Unauthorized
```

**403**
```bash
Forbiddden
```

**404**
```bash
Not Found
```

## Delete an API Key

Removes the API Key with the specified `keyId` for the given `tenant`.

### Parameters:

| Name    | Type     | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| tenant* | `string` | The identifier of the tenant.                   |
| keyId*  | `string` | The unique identifier of the API Key to delete. |

```bash
curl -X 'DELETE'
    '{auth_endpoint}/auth/<tenant>/apiKeys/<keyId>'
    -H 'accept: */*'
```

### Responses

**200**
```json
{
   "message": "string"
}
```

**401**
```bash
Unauthorized
```

**403**
```bash
Forbiddden
```

**404**
```bash
Not Found
```

