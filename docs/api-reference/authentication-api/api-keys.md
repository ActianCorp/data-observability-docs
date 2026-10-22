# API Keys

An alternate way to access Actian Data Observability APIs using API Key.

All Actian Data Observability APIs can be executed either with an OAuth access token or an API key. Use the APIs below to create a key, then send it in the header of any Actian Data Observability API instead of the `Authorization` bearer token:

```http
X-TLM-Key:{API Key}
```

Execute the Authenticate API to retrieve the access token used in the `Authorization` header for the calls below.

## Key Scope

API keys are **user-scoped**: a key belongs to the user who created it, and it carries that user's access. Any user can create a key for themselves — this is no longer restricted to tenant administrators.

The endpoints below take no tenant path parameter. The key's owner and tenant are resolved from the credentials used to call them.

!!! note
    Keys issued before the September 2026 release continue to work unchanged.

!!! warning
    When a user is deactivated, any API key belonging to that user is disabled.

API keys are managed through the API only — there is no UI for creating or revoking them.

## Create an API Key

Creates an API key for the current user. The key value is returned **only** in this response — store it securely, as it cannot be retrieved again.

`POST` `{auth_endpoint}/auth/api_keys`

### Request Body

| Name    | Type   | Description         |
| ------- | ------ | ------------------- |
| `name`* | string | Name of the API Key |

```bash
curl -X 'POST' \
  '{auth_endpoint}/auth/api_keys' \
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

## Retrieve All API Keys

Returns the API keys belonging to the current user. Key values are not included.

`GET` `{auth_endpoint}/auth/api_keys`

```bash
curl -X 'GET' \
  '{auth_endpoint}/auth/api_keys' \
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

## Get Details of a Specific API Key

Fetches one of the current user's API keys by its unique key ID.

`GET` `{auth_endpoint}/auth/api_keys/{keyId}`

### Path Parameters

| Name     | Type   | Description       |
| -------- | ------ | ----------------- |
| `keyId`* | string | Unique API Key ID |

```bash
curl -X 'GET' \
  '{auth_endpoint}/auth/api_keys/<keyId>' \
  -H 'accept: */*'
```

### Responses

**200**

```json
{
  "id": "string",
  "name": "string"
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

## Delete an API Key

Removes one of the current user's API keys.

`DELETE` `{auth_endpoint}/auth/api_keys/{keyId}`

### Path Parameters

| Name     | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| `keyId`* | string | The unique identifier of the API Key to delete. |

```bash
curl -X 'DELETE' \
  '{auth_endpoint}/auth/api_keys/<keyId>' \
  -H 'accept: */*'
```

### Responses

**200**

```json
{
  "message": "API key was deleted successfully"
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

## Tenant-Scoped Endpoints (Deprecated)

!!! warning
    The tenant-scoped endpoints below are **deprecated and scheduled for removal**. Use the user-scoped endpoints above instead.

These endpoints remain available to tenant administrators, and are how an administrator lists or revokes keys across an entire tenant rather than only their own.

| Operation            | Endpoint                                                 |
| -------------------- | -------------------------------------------------------- |
| Create a key         | `POST` `{auth_endpoint}/auth/{tenant}/apiKeys`           |
| List all tenant keys | `GET` `{auth_endpoint}/auth/{tenant}/apiKeys`            |
| Get one key          | `GET` `{auth_endpoint}/auth/{tenant}/apiKeys/{keyId}`    |
| Delete a key         | `DELETE` `{auth_endpoint}/auth/{tenant}/apiKeys/{keyId}` |

Request bodies and response shapes are identical to the user-scoped endpoints. `tenant` is the tenant identifier, which can be retrieved from the URL.

