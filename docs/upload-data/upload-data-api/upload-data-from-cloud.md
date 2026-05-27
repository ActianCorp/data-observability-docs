Upload data from Cloud
======================

API to upload data from Cloud storage.

If using GCS or GBQ, before executing the APIs to upload data, grant read access to the [Google Cloud Storage](broken-reference) bucket or [Google BigQuery table](broken-reference).

Tenant Id can be retrieved from the UI as listed [here](broken-reference)

Source Id can be retrieved from the UI or using the [APIs](../../source-apis/list-all-sources.md)

## Upload Data

`POST` `https://demo.api.telm.ai/v2/<tenant>/sources/<source_id>/batch_data`

Location specific request body parameters are defined below.

### Path Parameters

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| source\_id* | string | Id of source to upload data to |
| tenant*     | string | Name of tenant                 |

### Headers

| Name            | Type   | Description      |
| --------------- | ------ | ---------------- |
| Content-type    | string | application/json |
| Authentication* | string | Bearer \<access\_token>. Access token from Authentication API |

**200 Data upload started**
```
{
    "message": string,    
    "job_id": string
}
```

## Request Body for GCS

Use json representation described in [GCS Request data](gcs-request-data.md)

## Request Body for GBQ

Use json representation described in [GBQ Request data](gbq-request-data.md)

## Request Body for S3

Use json representation described in [S3 Request data](amazon-s3-request-data.md)

## Request Body for Azure

Use json representation described in [Azure Request data](azure-request-data.md)

## Request Body for Snowflake

Use json representation described in [Snowflake Request data](snowflake-request-data.md)
