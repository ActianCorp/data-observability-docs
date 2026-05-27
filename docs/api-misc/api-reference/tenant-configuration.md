# Tenant Configuration

## Get Tenants

Retrieves a list of all configured tenants and their metadata.

`GET` `/backend/private/configuration/tenants`

#### **Request Parameters**

This endpoint does **not** accept any parameters.

```bash
`curl -X 'GET'`\
`'/private/configuration/tenants'`\
`-H 'accept: */*'`
```

**200**

```json
`[`\
`{`\
`"id": "string",`\
`"description": "string",`\
`"name": "string",`\
`"storage": {`\
`"type": "GCS",`\
`"payload": {`\
`"credentials": {},`\
`"bucket": "string",`\
`"security": {`\
`"storage_account": "string",`\
`"sas_key": "string"`\
`}`\
`}`\
`},`\
`"data_ttl": 0,`\
`"free_upload_limit": 0,`\
`"use_information_schema": true,`\
`"dataproc-config": {`\
`"autoscale_policy": "string",`\
`"spark_worker_disk_size_in_gb": 0,`\
`"spark_master_disk_size_in_gb": 0,`\
`"master_node_type": "string",`\
`"worker_node_type": "string",`\
`"download_job_spark_properties": {`\
`"additionalProp1": "string",`\
`"additionalProp2": "string",`\
`"additionalProp3": "string"`\
`}`\
`}`\
`}`\
`]`
```

**401**

`Unauthorized`


**403**

`Forbiddden`


**404**
`Not Found`


## Get Specificc Tenant Details

Fetches the configuration details for a specific tenant identified by `tenantId`.
`GET` `/backend/private/configuration/tenants/{tenantId}`

#### **Path Parameter**

| **Name**   | **Type** | **Description**  |
| ---------- | -------- | ---------------- |
| `tenantId` | string   | Unique tenant ID |

```bash
curl -X 'GET'\
'/backend/private/configuration/tenants/\<tenantId>'\
-H 'accept: _/_'
```


**200**

```json
`{`\
`"id": "string",`\
`"description": "string",`\
`"name": "ePi6R5ZFZuxRvsL98eYtdKuCQ",`\
`"storage": {`\
`"type": "GCS",`\
`"payload": {`\
`"credentials": {},`\
`"bucket": "nz7uk_oyk",`\
`"security": {`\
`"storage_account": "string",`\
`"sas_key": "string"`\
`}`\
`}`\
`},`\
`"data_ttl": 0,`\
`"free_upload_limit": 0,`\
`"use_information_schema": true,`\
`"dataproc-config": {`\
`"autoscale_policy": "string",`\
`"spark_worker_disk_size_in_gb": 0,`\
`"spark_master_disk_size_in_gb": 0,`\
`"master_node_type": "string",`\
`"worker_node_type": "string",`\
`"download_job_spark_properties": {`\
`"additionalProp1": "string",`\
`"additionalProp2": "string",`\
`"additionalProp3": "string"`\
`}`\
`}`\
`}`
```

**401**
`Unauthorized`


**403**
`Forbiddden`


**404**
`Not Found`


## Update Tenant Configurations

Updates the configuration details for a specific tenant identified by `tenantId`.

`PUT` `/backend/private/configuration/tenants/{tenantId}`

#### **Path Parameter**

| **Name**   | **Type** | **Description**  |
| ---------- | -------- | ---------------- |
| `tenantId` | string   | Unique tenant ID |

```bash
curl -X 'GET'\
'/backend/private/configuration/tenants/\<tenantId>'\
-H 'accept: _/_'
```

#### Request Body

```json
`{`\
`"id": "string",`\
`"description": "string",`\
`"name": "7VrwuuGwkBeaAZgEcZayaTobR",`\
`"storage": {`\
`"type": "GCS",`\
`"payload": {`\
`"credentials": {},`\
`"bucket": "9stuc4m",`\
`"security": {`\
`"storage_account": "string",`\
`"sas_key": "string"`\
`}`\
`}`\
`},`\
`"data_ttl": 0,`\
`"free_upload_limit": 0,`\
`"use_information_schema": true,`\
`"dataproc-config": {`\
`"autoscale_policy": "string",`\
`"spark_worker_disk_size_in_gb": 0,`\
`"spark_master_disk_size_in_gb": 0,`\
`"master_node_type": "string",`\
`"worker_node_type": "string",`\
`"download_job_spark_properties": {`\
`"additionalProp1": "string",`\
`"additionalProp2": "string",`\
`"additionalProp3": "string"`\
`}`\
`}`\
`}`
```

#### Response

**200**

```json
{
  "message": "string"
}
```


**401**
`Unauthorized`


**403**
`Forbiddden`

**404**
`Not Found`

