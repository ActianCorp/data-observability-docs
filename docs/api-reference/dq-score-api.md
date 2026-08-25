# DQ Score API

## Get DQ Score Options

`GET` `https://{actian_endpoint}/api/backend/{tenant}/configuration/assets/{assetId}/dq_score`

This endpoint retrieves the current Data Quality Score configuration for a specific asset.

### Path Parameters

| Name       | Type   | Description       |
| ---------- | ------ | ----------------- |
| `tenant`*  | string | Tenant identifier |
| `assetId`* | string | Asset identifier  |

### Response

**200** DQ Score configuration retrieved successfully

```json
{
  "dq_score_config": {
    "enabled": true,
    "weights": {
      "completeness": 0.25,
      "accuracy": 0.25,
      "consistency": 0.25,
      "timeliness": 0.25
    }
  }
}
```

## Update DQ Score Options

`PUT` `https://{actian_endpoint}/api/backend/{tenant}/configuration/assets/{assetId}/dq_score`

This endpoint updates the Data Quality Score configuration for a specific asset.

### Path Parameters

| Name       | Type   | Description       |
| ---------- | ------ | ----------------- |
| `tenant`*  | string | Tenant identifier |
| `assetId`* | string | Asset identifier  |

### Request Body

```json
{
  "enabled": true,
  "weights": {
    "completeness": 0.3,
    "accuracy": 0.3,
    "consistency": 0.2,
    "timeliness": 0.2
  }
}
```

### Response

**200** DQ Score configuration updated successfully

```json
{
  "dq_score_config": {
    "enabled": true,
    "weights": {
      "completeness": 0.3,
      "accuracy": 0.3,
      "consistency": 0.2,
      "timeliness": 0.2
    }
  }
}
```

## Delete DQ Score Options

`DELETE` `https://{actian_endpoint}/api/backend/{tenant}/configuration/assets/{assetId}/dq_score`

This endpoint deletes the DQ Score configuration for a specific asset, reverting to default settings.

### Path Parameters

| Name       | Type   | Description       |
| ---------- | ------ | ----------------- |
| `tenant`*  | string | Tenant identifier |
| `assetId`* | string | Asset identifier  |

### Response

**200** DQ Score configuration deleted successfully

```json
{
  "success": true,
  "message": "DQ Score configuration deleted successfully"
}
```
