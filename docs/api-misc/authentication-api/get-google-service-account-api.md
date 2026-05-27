# Get Google Service Account API


Tenant Id can be retrieved from the UI as listed [here](../api-reference/tenant-configuration.md).

## Get SA Account

Retrieves service account details for a specific tenant.
`GET` `/{tenant}/configuration/service_account`

### Request Parameters

| **Parameter** | **Type** | **Description**  |
| ------------- | -------- | ---------------- |
| `tenant`      | string   | Unique Tenant ID |

```json
curl -X 'GET'
'/<tenant>/configuration/service_account'
-H 'accept: */*'
```

### Responses

**200**
```json
{
   "tenant_service_account": {
    "name": "string",
    "email": "string"
   },
   "cloud_transfer_service_account": "string"
}
```

**401**
``` bash
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


