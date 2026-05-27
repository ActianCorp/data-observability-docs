---
description: >-
  This API allows private cloud administrators to configure tenant-specific
  settings, including Spark configurations and Dataproc cluster node settings.
hidden: true
noIndex: true
---

# Tenant Configuration

## Get Tenants

Retrieves a list of all configured tenants and their metadata.

<mark style="color:green;">`GET`</mark> `/backend/private/configuration/tenants`

#### **Request Parameters**

This endpoint does **not** accept any parameters.

{% tabs %}
{% tab title="curl" %}
`curl -X 'GET'`\
`'/private/configuration/tenants'`\
`-H 'accept: */*'`
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="200" %}
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
{% endtab %}

{% tab title="401" %}
`Unauthorized`
{% endtab %}

{% tab title="403" %}
`Forbiddden`
{% endtab %}

{% tab title="404" %}
`Not Found`
{% endtab %}
{% endtabs %}

## Get Specificc Tenant Details

Fetches the configuration details for a specific tenant identified by `tenantId`.

<mark style="color:green;">`GET`</mark> `/backend/private/configuration/tenants/{tenantId}`

#### **Path Parameter**

| **Name**   | **Type** | **Description**  |
| ---------- | -------- | ---------------- |
| `tenantId` | string   | Unique tenant ID |

{% tabs %}
{% tab title="curl" %}
curl -X 'GET'\
'/backend/private/configuration/tenants/\<tenantId>'\
-H 'accept: _/_'
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="200" %}
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
{% endtab %}

{% tab title="401" %}
`Unauthorized`
{% endtab %}

{% tab title="403" %}
`Forbiddden`
{% endtab %}

{% tab title="404" %}
`Not Found`
{% endtab %}
{% endtabs %}

## Update Tenant Configurations

Updates the configuration details for a specific tenant identified by `tenantId`.

<mark style="color:green;">`PUT`</mark> `/backend/private/configuration/tenants/{tenantId}`

#### **Path Parameter**

| **Name**   | **Type** | **Description**  |
| ---------- | -------- | ---------------- |
| `tenantId` | string   | Unique tenant ID |

{% tabs %}
{% tab title="curl" %}
curl -X 'GET'\
'/backend/private/configuration/tenants/\<tenantId>'\
-H 'accept: _/_'
{% endtab %}
{% endtabs %}

#### Request Body

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

#### Response

{% tabs %}
{% tab title="200" %}
```json
{
  "message": "string"
}
```
{% endtab %}

{% tab title="401" %}
`Unauthorized`
{% endtab %}

{% tab title="403" %}
`Forbiddden`
{% endtab %}

{% tab title="404" %}
`Not Found`
{% endtab %}
{% endtabs %}



