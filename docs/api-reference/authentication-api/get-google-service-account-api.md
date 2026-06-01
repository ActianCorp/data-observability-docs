Get Google Service Account API
==============================

Tenant Id can be retrieved from the UI as listed [here](../../api-misc/api-reference/tenant-configuration.md#get-tenants).

## Get SA Account

Retrieves service account details for a specific tenant.
`GET` `/{tenant}/configuration/service_account`

### Request Parameters

| **Parameter** | **Type** | **Description**  |
| ------------- | -------- | ---------------- |
| `tenant`      | string   | Unique Tenant ID |

```
curl -X 'GET'
'/<tenant>/configuration/service_account'
-H 'accept: */*'
```

### Responses

**200**
```
{
   "tenant_service_account": {
    "name": "string",
    "email": "string"
   },
   "cloud_transfer_service_account": "string"
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


