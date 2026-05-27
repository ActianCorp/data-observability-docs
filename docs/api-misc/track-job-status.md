Track Scan Job
================

When upload job is triggered via API, the response contains a section with the job id:

```json
{
   "message": "Upload task started. Please track the job status to check progress",
    "job_id": "a08aa2a2592a541e194db9d01e9d0e457"
}
```

!!! note
    Tenant Id can be retrieved from the UI as listed [here](../api-reference/tenant-configuration.md)

## Get jobs for a specific tenant and source

`GET` `https://{actian_endpoint}/api/backend/{tenant}/sources/{source}/jobs`

#### Path Parameters

| Name                                     | Type   | Description |
| ---------------------------------------- | ------ | ----------- |
| source | string | Source Id   |
| tenant | string | Tenant Id   |

#### Query Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| most\_recent | Boolean | true/false  |

#### Headers

| Name                                             | Type   | Description      |
| ------------------------------------------------ | ------ | ---------------- |
| Content-type                                     | string | application/json |
| Authentication<mark style="color:red;">\*</mark> | string | Bearer {token}   |

{% tabs %}
{% tab title="200 " %}
```json
[
  {
    "details": "string",
    "id": "string",
    "run_time": {
      "nano": 0,
      "negative": true,
      "seconds": 0,
      "units": [
        {
          "dateBased": true,
          "durationEstimated": true,
          "timeBased": true
        }
      ],
      "zero": true
    },
    "start_time": "2022-05-24T23:50:19.809Z",
    "status": "string"
  }
]
```
{% endtab %}
{% endtabs %}
