Track upload job
================

APIs to track status of upload

When upload job is triggered via API, the response contains a section with the job id:

```
{
   "message": "Upload task started. Please track the job status to check progress",
    "job_id": "a08aa2a2592a541e194db9d01e9d0e457"
}
```

Note, Tenant Id can be retrieved from the UI as listed [here](broken-reference)

## Get job status for a specific Job Id

`GET` `https://data-observability.actian.com/api/backend/<tenant>/jobs/<job_id>`

This endpoint gets you the status of the job from Upload data APIs

### Path Parameters

| Name    | Type   | Description                 |
| ------- | ------ | --------------------------- |
| job\_id | string | Job Id from Upload data API |
| tenant  | string | Name of Tenant              |

### Headers

| Name                                             | Type   | Description      |
| ------------------------------------------------ | ------ | ---------------- |
| Content-type                                     | string | application/json |
| Authentication*                                  | string | Bearer {token}   |

**200 Status of Job: IN_PROGRESS, FINISHED, FAILED**
```
{    
    "id": string,    
    "status": string,   
    "details": string
}
```

## Get jobs for a specific tenant and source

`GET` `https://data-observability.actian.com/api/backend/{tenant}/sources/{source}/jobs`

### Path Parameters

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| source* | string | Source Id   |
| tenant* | string | Tenant Id   |

### Query Parameters

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| most\_recent | Boolean | true/false  |

### Headers

| Name            | Type   | Description      |
| --------------- | ------ | ---------------- |
| Content-type    | string | application/json |
| Authentication* | string | Bearer {token}   |

**200**
```
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
