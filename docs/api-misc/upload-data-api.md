Trigger Scan
==============


The following APIs have been deprecated:

`/api/data/{tenant}/sources/{source}/batch_data`

`/api/data/v2/{tenant}/sources/{source}/batch_data`

`/api/data/{tenant}/batch_data`

`/api/data/v2/{tenant}/batch_data`

## Trigger data scan

`POST` `https://{actian_endpoint}/api/data/{tenant}/assets/{assetId}/batch_data`

Location specific request body parameters are defined below.

### Path Parameters

| Name                                         | Type   | Description                    |
| -------------------------------------------- | ------ | ------------------------------ |
| tenant                                       | string | Tenant name                    |
| assetId                                      | string | Asset name                     |


**200 Data upload started**
```
{
    "message": string,    
    "job_id": string
}
```
